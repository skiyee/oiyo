/**
 * 唯一的请求层：基于 oiyo createHttp。
 *
 * 所有项目特有逻辑都收敛在 createHttp 的生命周期钩子里，不再二次封装：
 * - onRequest：注入鉴权 token
 * - onResponse / onResponseError：业务错误码判定、解包业务 data、错误 toast、401 无感刷新
 * - onRequestError：网络错误 toast + 统一 HttpError
 *
 * 业务约定：接口成功时钩子会把响应精炼为内层业务 `data`，因此调用方
 * `client.request<T>()` 直接拿到 `T`（即 `IResponse<T>` 里的 `data`）。
 *
 * createHttp / createHttpAborter 由 oiyo 自动导入，无需显式 import。
 * @see https://oiyo.js.org/docs/manual/data/http
 */

import type { HttpResponse } from '@skiyee/oiyo'

import type { IDoubleTokenRes } from '../types/user'
import type { IResponse } from './types'

import { clearTokenInfo, getRefreshToken, getValidToken, setTokenInfo } from './auth'
import { HttpErrorType, ResultEnum } from './enum'
import { createHttpError, getResponseMessage, isSuccessResultCode, resolveBaseURL, ShowMessage } from './utils'

/**
 * 公共请求实例：项目内一切请求/上传/下载都用它，业务逻辑已内置在钩子中。
 * 需要派生鉴权/业务专用实例时用 `client.create({ ... })`；中断用 `createHttpAborter()`。
 *
 * @example
 * const data = await client.request<IUserInfoRes>('/user/info')
 * const res = await client.request<IToken>('/auth/login', { method: 'POST', body: form })
 */
export const client = createHttp({
  baseURL: resolveBaseURL(),
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  // 请求前拦截：注入鉴权头
  onBeforeRequest({ options }) {
    const token = getValidToken()
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      }
    }
  },
  // 请求错误拦截：网络错误 · 统一构造 HttpError 并（去重）提示
  onRequestError({ options, error }) {
    const httpError = createHttpError({
      type: HttpErrorType.Network,
      message: '网络错误，换个网络试试',
      raw: error,
    })

    if (!options.hideErrorToast) {
      uni.showToast({
        icon: 'none',
        title: httpError.message,
      })
    }

    throw httpError
  },
  // 业务错误码判定、解包业务 data、错误 toast、401 无感刷新
  async onResponseSuccess({ url, options, response }) {
    const responseStatusCode = response.statusCode
    const responseData = response.data

    const code = responseData.code

    // 检查是否是401错误（业务码401）
    if (code === ResultEnum.Unauthorized) {
      response.data = await handleUnauthorized(url, options, response)
      return
    }

    if (!isSuccessResultCode(code as number)) {
      const httpError = createHttpError({
        type: HttpErrorType.Business,
        code,
        statusCode: responseStatusCode,
        message: getResponseMessage(responseData),
        data: responseData?.data,
        raw: responseData,
      })

      if (!options.hideErrorToast) {
        uni.showToast({
          icon: 'none',
          title: httpError.message,
        })
      }

      throw httpError
    }

    // 成功：解包为内层业务 data
    response.data = responseData?.data
  },
  async onResponseError({ url, options, response }) {
    const responseStatusCode = response.statusCode

    // 检查是否是401错误（响应码401）
    if (responseStatusCode === ResultEnum.Unauthorized) {
      response.data = await handleUnauthorized(url, options, response)
      return
    }

    const responseData = response.data

    const code = responseData.code
    const httpError = createHttpError({
      type: HttpErrorType.Http,
      code,
      statusCode: responseStatusCode,
      message: getResponseMessage(responseData, ShowMessage(responseStatusCode)),
      data: responseData?.data,
      raw: response,
    })

    if (!options.hideErrorToast) {
      uni.showToast({
        icon: 'none',
        title: httpError.message,
      })
    }

    throw httpError
  },
})

// 无感刷新 token 状态管理
let refreshing = false // 防止重复刷新 token 标识
let taskQueue: Array<() => void> = [] // 刷新 token 请求队列（刷新成功后重放）

/**
 * 401 处理：
 * - 单 token：直接登出跳登录页，抛鉴权错误
 * - 双 token：无感刷新 + 队列重放，返回重放后的业务 data
 */
async function handleUnauthorized(
  resource: string,
  options: HttpOptions,
  response: HttpResponse,
): Promise<any> {
  const responseStatusCode = response.statusCode
  const responseData = response.data as IResponse<any>

  const code = responseData?.code

  if (!isDoubleTokenMode) {
    // 未启用双 token 策略，清理鉴权信息，跳转到登录页
    clearTokenInfo()

    toLoginPage()

    throw createHttpError({
      type: HttpErrorType.Auth,
      code,
      statusCode: responseStatusCode,
      message: getResponseMessage(responseData, '登录已过期，请重新登录'),
      data: responseData?.data,
      raw: response,
    })
  }

  /* -------- 无感刷新 token ----------- */
  const refreshTokenValue = getRefreshToken()
  // 没有 refreshToken 无从刷新，直接抛鉴权错误
  if (!refreshTokenValue) {
    throw createHttpError({
      type: HttpErrorType.Auth,
      code,
      statusCode: responseStatusCode,
      message: getResponseMessage(responseData, '登录已过期，请重新登录'),
      data: responseData?.data,
      raw: response,
    })
  }

  // 把原请求放进队列，待刷新成功后重放
  const queued = new Promise<any>((resolve, reject) => {
    taskQueue.push(() => {
      replayRequest(resource, options).then(resolve).catch(reject)
    })
  })

  // 未在刷新中，发起刷新 token 请求
  if (!refreshing) {
    refreshing = true

    try {
      await refreshTokenRequest(refreshTokenValue)

      refreshing = false

      nextTick(() => {
        uni.hideToast()
        uni.showToast({ title: 'token 刷新成功', icon: 'none' })
      })

      // 刷新成功，重放队列里的所有请求
      taskQueue.forEach(task => task())
    }
    catch (refreshErr) {
      refreshing = false

      console.error('刷新 token 失败:', refreshErr)

      nextTick(() => {
        uni.hideToast()
        uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' })
      })

      clearTokenInfo()

      setTimeout(() => {
        toLoginPage()
      }, 2000)
    }
    finally {
      // 不管刷新成功与否，都清空任务队列
      taskQueue = []
    }
  }

  return queued
}

/**
 * 刷新 token 请求。
 *
 * 直接用 `client` 自身发起（而非 `userApi.refreshToken`），避免循环依赖；刷新成功后写回鉴权状态。
 */
async function refreshTokenRequest(refreshTokenValue: string): Promise<IDoubleTokenRes> {
  const res = await client.request<IDoubleTokenRes>('/auth/refreshToken', {
    method: 'POST',
    body: { refreshToken: refreshTokenValue },
  })

  setTokenInfo(res)

  return res
}

/** 重放原请求 */
function replayRequest(resource: string, options: HttpOptions): Promise<any> {
  if (options._action === 'upload') {
    return client.upload(resource, { ...options } as HttpUploadOptions<'json'>)
  }
  else if (options._action === 'download') {
    return client.download(resource, { ...options } as HttpDownloadOptions<'json'>)
  }
  return client.request(resource, { ...options } as HttpRequestOptions<'json'>)
}
