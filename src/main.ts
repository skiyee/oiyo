import App from './App.vue'
import i18n from './locale/index'
import { routeInterceptor } from './router/interceptor'

import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)

  app.use(storer)

  app.use(i18n)

  // 路由拦截（tabbar 高亮同步等）
  app.use(routeInterceptor)

  return {
    app,
  }
}
