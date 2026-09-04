import App from './App.vue'
import i18n from './locale/index'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(storer)

  app.use(i18n)

  return {
    app,
  }
}
