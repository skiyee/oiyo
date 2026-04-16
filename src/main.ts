import { createSSRApp } from '@skiyee/oiyo/runtime'

import App from './App.vue'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
