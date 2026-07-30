import type { IHttpError, IResponse } from './types'

import { ResultEnum } from './enum'

/** 计算请求基准地址：H5 且开启代理时使用代理前缀，否则用环境地址 */
export function resolveBaseURL() {
  // #ifdef H5
  if (JSON.parse(import.meta.env.VITE_APP_PROXY_ENABLE)) {
    // 自动拼接代理前缀
    return import.meta.env.VITE_APP_PROXY_PREFIX
  }
  // #endif
  return getEnvBaseUrl()
}

export function getResponseMessage(responseData: Partial<IResponse<any>> | undefined, fallback = '请求错误'): string {
  return responseData?.msg || responseData?.message || fallback
}

export function isSuccessResultCode(code: number): boolean {
  return [ResultEnum.Success0, ResultEnum.Success200].includes(code)
}

export function createHttpError<T>(params: IHttpError<T>): IHttpError<T> {
  return params
}
/**
 * 根据状态码，生成对应的错误信息
 * @param {number|string} status 状态码
 * @returns {string} 错误信息
 */
export function ShowMessage(status: number | string): string {
  let message: string
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}
