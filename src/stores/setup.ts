import { piniaPersist } from './plugins/persist'

const storer = createPinia()

storer.use(piniaPersist)

setActivePinia(storer)

export { storer }
