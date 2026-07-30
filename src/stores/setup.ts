import { piniaPersist } from './plugins/persist' // 本地持久化插件（基于 UniStorage）

const storer = createPinia()

storer.use(piniaPersist)

// 立即激活 Pinia 实例, 这样即使在 app.use(store)之前调用 store 也能正常工作 （解决APP端白屏问题）
setActivePinia(storer)

export { storer }
