import { defineOiyoConfig } from '@skiyee/oiyo/config'

export default defineOiyoConfig({
  // 自动扫描机制：https://oiyo.js.org/docs/api/config/define-oiyo-config#oiyoconfigscan
  scan: { // 设置的路径相对 <srcDir> 目录
    apis: [
      'pinia',
      // 'composables/*.ts', 无需设置这一行 oiyo 内部已内置
      'apis/*.ts',
      'stores/*.ts',
      'utils/*.ts', // 这将会扫描 <srcDir>/utils 下的第一层 ts 文件
    ],
    components: [
      // 'components/**/*.vue', 无需设置这一行 oiyo 内部已内置
    ],
  },
  ide: {
    open: true,
  },
})
