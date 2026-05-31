import App from './App.vue'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(storer)

  return { app }
}
