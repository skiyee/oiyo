import OiyoPlugin from '@skiyee/oiyo/plugin'
import UniUnoCSS from 'uni-unocss'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UniUnoCSS(),
    OiyoPlugin(),
  ],
})
