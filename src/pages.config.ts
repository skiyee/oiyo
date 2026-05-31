import { definePagesConfig } from '@skiyee/oiyo/config'

// https://oiyo.js.org/docs/api/config/define-pages-config
export default definePagesConfig({
  globalStyle: {
    // 页面背景配置
    backgroundColor: '#F8FAFC',
    backgroundColorTop: '#F8FAFC',
    backgroundColorBottom: '#F8FAFC',
    backgroundTextStyle: 'dark',

    // 导航栏配置
    navigationStyle: 'default',
    navigationBarTitleText: 'skiyee-oiyo',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#F8FAFC',
  },
})
