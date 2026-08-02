/**
 * 鉴权 token 工具
 */

import type { IAuthLoginRes } from '~/apis/types/user'

import { isDoubleTokenRes, isSingleTokenRes } from '~/apis/types/user'

/** 本地存储键名 */
const TOKEN_STORAGE_KEY = 'token'
const ACCESS_EXPIRE_KEY = 'accessTokenExpireTime'
const REFRESH_EXPIRE_KEY = 'refreshTokenExpireTime'

/** 初始 token 状态（按单/双 token 模式区分结构） */
const tokenInfoState: IAuthLoginRes = isDoubleTokenMode
  ? {
      accessToken: '',
      accessExpiresIn: 0,
      refreshToken: '',
      refreshExpiresIn: 0,
    }
  : {
      token: '',
      expiresIn: 0,
    }

/** 从本地存储恢复 token */
function readPersistedTokenInfo(): IAuthLoginRes {
  try {
    const raw = uni.getStorageSync(TOKEN_STORAGE_KEY)
    if (raw) {
      return typeof raw === 'string' ? JSON.parse(raw) : raw
    }
  }
  catch (error) {
    console.error('恢复本地 token 失败:', error)
  }
  return { ...tokenInfoState }
}

/** token 信息 */
let tokenInfo: IAuthLoginRes = readPersistedTokenInfo()

/** 写入 token 信息并持久化 + 计算过期时间戳 */
export function setTokenInfo(val: IAuthLoginRes) {
  tokenInfo = val
  uni.setStorageSync(TOKEN_STORAGE_KEY, JSON.stringify(val))

  const now = Date.now()
  if (isSingleTokenRes(val)) {
    // 单 token 模式
    uni.setStorageSync(ACCESS_EXPIRE_KEY, now + val.expiresIn * 1000)
  }
  else if (isDoubleTokenRes(val)) {
    // 双 token 模式
    uni.setStorageSync(ACCESS_EXPIRE_KEY, now + val.accessExpiresIn * 1000)
    uni.setStorageSync(REFRESH_EXPIRE_KEY, now + val.refreshExpiresIn * 1000)
  }
}

/** 清空 token 信息与相关本地存储 */
export function clearTokenInfo() {
  tokenInfo = { ...tokenInfoState }
  uni.removeStorageSync(TOKEN_STORAGE_KEY)
  uni.removeStorageSync(ACCESS_EXPIRE_KEY)
  uni.removeStorageSync(REFRESH_EXPIRE_KEY)
}

/** accessToken 是否过期（每次读取实时判断，无缓存） */
export function isTokenExpired(): boolean {
  const expireTime = uni.getStorageSync(ACCESS_EXPIRE_KEY)
  if (!expireTime) {
    return true
  }
  return Date.now() >= expireTime
}

/** refreshToken 是否过期 */
export function isRefreshTokenExpired(): boolean {
  if (!isDoubleTokenMode) {
    return true
  }
  const refreshExpireTime = uni.getStorageSync(REFRESH_EXPIRE_KEY)
  if (!refreshExpireTime) {
    return true
  }
  return Date.now() >= refreshExpireTime
}

/**
 * 有效的 accessToken（过期返回空串）。
 * 只做状态判断，不触发异步刷新——刷新由 client 的 401 拦截负责。
 */
export function getValidToken(): string {
  if (isTokenExpired()) {
    return ''
  }
  if (!isDoubleTokenMode) {
    return isSingleTokenRes(tokenInfo) ? tokenInfo.token : ''
  }
  return isDoubleTokenRes(tokenInfo) ? tokenInfo.accessToken : ''
}

/** 当前 refreshToken（双 token 模式），无则空串 */
export function getRefreshToken(): string {
  return isDoubleTokenRes(tokenInfo) ? tokenInfo.refreshToken : ''
}

/** 是否存在登录信息（不考虑是否过期） */
export function hasLoginInfo(): boolean {
  if (isDoubleTokenMode) {
    return isDoubleTokenRes(tokenInfo) && !!tokenInfo.accessToken
  }
  return isSingleTokenRes(tokenInfo) && !!tokenInfo.token
}

/** 是否已登录且 token 有效 */
export function isLoggedIn(): boolean {
  return hasLoginInfo() && !isTokenExpired()
}
