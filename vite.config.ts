import OiyoPlugin from '@skiyee/oiyo/plugin'
import UnoPlugin from 'uni-unocss'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoPlugin(),
    OiyoPlugin(),
  ],
})
