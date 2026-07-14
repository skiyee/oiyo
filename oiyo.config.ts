import { defineOiyoConfig } from '@skiyee/oiyo/config'

export default defineOiyoConfig({
  /**
   * 自动扫描机制
   * @see https://oiyo.js.org/docs/api/config/define-oiyo-config#oiyoconfigscan
   */
  scan: {
    apis: [
      'pinia',
      // 'composables/*.ts', 无需设置这一行 oiyo 内部已内置
      'apis/*.ts',
      'stores/*.ts',
      'utils/*.ts', // 这将会扫描 <srcDir>/utils 下的第一层 ts 文件
      { from: 'types/*.ts', types: true }, // 这将会扫描 <srcDir>/types 的值以及类型
    ],
    components: [
      // 'components/**/*.vue', 无需设置这一行 oiyo 内部已内置
    ],
  },
  /**
   * 小程序 IDE 配置
   * @see https://oiyo.js.org/docs/api/config/define-oiyo-config#ide
   */
  ide: {
    open: true,
  },
})
