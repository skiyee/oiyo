/**
 * 实时获取是否为系统暗色主题
 */
export function useSystemDark() {
  const { hostTheme } = uni.getSystemInfoSync()
  const isDark = ref(hostTheme === 'dark')

  const callback = ({ theme }: UniApp.OnThemeChangeCallbackResult) => {
    isDark.value = theme === 'dark'
  }

  uni.onThemeChange(callback)

  onScopeDispose(() => uni.offThemeChange(callback))

  return readonly(isDark)
}
