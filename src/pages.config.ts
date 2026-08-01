import { definePagesConfig } from '@skiyee/oiyo/config'

/**
 * 页面配置
 * @see https://oiyo.js.org/docs/api/config/define-pages-config
 */
export default definePagesConfig({
  globalStyle: {
    // 导航栏配置（颜色变量来自 theme.json）
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    navigationBarTitleText: 'Oiyo Starter',

    // 页面背景配置
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',

    // 下拉刷新配置
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,

    // 动画配置
    animationType: 'pop-in',
    animationDuration: 300,
  },
  tabBar: {
    custom: true,
    customize: true,
    height: '0',
    color: '@tabColor',
    selectedColor: '@tabSelectedColor',
    backgroundColor: '@tabBgColor',
    borderStyle: '@tabBorderStyle',
  },
})
