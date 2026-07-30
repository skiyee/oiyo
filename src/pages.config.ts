import { definePagesConfig, type TabBar } from '@skiyee/oiyo/config'

import { tabBar } from './tabbar/config'

// https://oiyo.js.org/docs/api/config/define-pages-config
export default definePagesConfig({
  globalStyle: {
    // 页面背景配置
    backgroundColor: '#FFFFFF',

    // 导航栏配置
    navigationStyle: 'default',
    navigationBarTitleText: 'oiyo-unibest',
    navigationBarBackgroundColor: '#F8FAFC',
    navigationBarTextStyle: 'black',
  },
  // tabBar 视觉配置（沿用 unibest src/tabbar/config.ts 的配置）。
  // 采用自定义 tabbar：custom: true 隐藏原生渲染，实际 UI 由 src/tabbar/tabbar.vue（tabbar 布局）绘制。
  tabBar: tabBar as TabBar,
})
