import type { IAuthLoginRes, ICaptcha, IDoubleTokenRes, ILoginForm, IUpdateInfo, IUpdatePassword, IUserInfoRes } from './types/user'

import { client } from './http/client'

export const userApi = {
  /**
   * 获取验证码
   * @returns ICaptcha 验证码
   */
  getCode() {
    return client.request<ICaptcha>('/user/getCode')
  },

  /**
   * 用户登录
   * @param loginForm 登录表单
   */
  login(loginForm: ILoginForm) {
    return client.request<IAuthLoginRes>('/auth/login', { method: 'POST', body: loginForm })
  },

  /**
   * 刷新token
   * @param refreshToken 刷新token
   */
  refreshToken(refreshToken: string) {
    return client.request<IDoubleTokenRes>('/auth/refreshToken', { method: 'POST', body: { refreshToken } })
  },

  /**
   * 获取用户信息
   */
  getUserInfo() {
    return client.request<IUserInfoRes>('/user/info')
  },

  /**
   * 退出登录
   */
  logout() {
    return client.request<void>('/auth/logout')
  },

  /**
   * 修改用户信息
   */
  updateInfo(data: IUpdateInfo) {
    return client.request('/user/updateInfo', { method: 'POST', body: data })
  },

  /**
   * 修改用户密码
   */
  updateUserPassword(data: IUpdatePassword) {
    return client.request('/user/updatePassword', { method: 'POST', body: data })
  },

  /**
   * 获取微信登录凭证
   * @returns Promise 包含微信登录凭证(code)
   */
  getWxCode() {
    return new Promise<UniApp.LoginRes>((resolve, reject) => {
      uni.login({
        provider: 'weixin',
        success: res => resolve(res),
        fail: err => reject(new Error(err)),
      })
    })
  },

  /**
   * 微信登录
   * @param data 微信登录参数，包含code
   * @returns Promise 包含登录结果
   */
  wxLogin(data: { code: string }) {
    return client.request<IAuthLoginRes>('/auth/wxLogin', { method: 'POST', body: data })
  },
}
