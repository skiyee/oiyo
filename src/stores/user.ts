import type { IAuthLoginRes, ILoginForm, IUserInfoRes } from '~/apis/types/user'

import { clearTokenInfo, isLoggedIn, setTokenInfo } from '~/apis/http/auth'

// 初始化用户信息状态
const userInfoState: IUserInfoRes = {
  userId: -1,
  username: '',
  nickname: '',
  avatar: '/static/images/default-avatar.png',
}

export const useUserStore = defineStore('user', () => {
  // 定义用户信息
  const userInfo = ref<IUserInfoRes>({ ...userInfoState })

  // 设置用户信息
  const setUserInfo = (val: IUserInfoRes) => {
    console.log('设置用户信息', val)
    // 若头像为空 则使用默认头像
    if (!val.avatar) {
      val.avatar = userInfoState.avatar
    }
    userInfo.value = val
  }

  const setUserAvatar = (avatar: string) => {
    userInfo.value.avatar = avatar
    console.log('设置用户头像', avatar)
    console.log('userInfo', userInfo.value)
  }

  // 删除用户信息
  const clearUserInfo = () => {
    userInfo.value = { ...userInfoState }
  }

  /**
   * 获取用户信息
   */
  const fetchUserInfo = async () => {
    const res = await userApi.getUserInfo()
    setUserInfo(res)
    return res
  }

  /**
   * 是否已登录且 token 有效
   */
  const hasLogin = ref(isLoggedIn())

  /**
   * 登录成功后处理逻辑：写入 token + 拉取用户信息
   * @param tokenInfo 登录返回的token信息
   */
  async function _postLogin(tokenInfo: IAuthLoginRes) {
    setTokenInfo(tokenInfo)
    await fetchUserInfo()
    hasLogin.value = isLoggedIn()
  }

  const login = async (loginForm: ILoginForm) => {
    try {
      const res = await userApi.login(loginForm)
      console.log('普通登录-res: ', res)
      await _postLogin(res)
      uni.showToast({
        title: '登录成功',
        icon: 'success',
      })
      return res
    }
    catch (error) {
      console.error('登录失败:', error)
      uni.showToast({
        title: '登录失败，请重试',
        icon: 'error',
      })
      throw error
    }
  }

  const wxLogin = async () => {
    try {
      // 获取微信小程序登录的code
      const code = await userApi.getWxCode()
      console.log('微信登录-code: ', code)
      const res = await userApi.wxLogin(code)
      console.log('微信登录-res: ', res)
      await _postLogin(res)
      uni.showToast({
        title: '登录成功',
        icon: 'success',
      })
      return res
    }
    catch (error) {
      console.error('微信登录失败:', error)
      uni.showToast({
        title: '微信登录失败，请重试',
        icon: 'error',
      })
      throw error
    }
  }

  /** 退出登录 并 删除用户信息 */
  const logout = async () => {
    try {
      // TODO 实现自己的退出登录逻辑
      await userApi.logout()
    }
    catch (error) {
      console.error('退出登录失败:', error)
    }
    finally {
      // 无论成功失败，都需要清除本地 token 与用户信息
      console.log('退出登录-清除用户信息')

      clearTokenInfo()
      clearUserInfo()
      hasLogin.value = false
    }
  }

  return {
    // 用户信息
    userInfo,
    setUserInfo,
    setUserAvatar,
    clearUserInfo,
    fetchUserInfo,

    // 登录/登出编排
    login,
    wxLogin,
    logout,

    // 认证状态判断（透传自鉴权层）
    hasLogin,
  }
},
{
  // 仅持久化用户信息：hasLogin 避免持久化的登录态与真实 token 过期状态不一致
  persist: { enabled: true, paths: ['userInfo'] },
},
)
