import { defineOiyoConfig } from '@skiyee/oiyo/config'

/**
 * oiyo 框架配置
 * @see https://oiyo.js.org/docs/api/config/define-oiyo-config
 */
export default defineOiyoConfig({
  scan: {
    apis: [
      'apis/*.ts',
      'utils/*.ts',
      'stores/*.ts',
      { from: 'types/*.ts', types: true },

      'pinia', // Pinia 公开 API 自动导入（defineStore / storeToRefs / createPinia 等）
    ],
  },
  ide: {
    // 编译成微信小程序时，是否自动打开开发者工具
    open: true,
  },
})
