import type { PiniaPluginContext } from 'pinia'

export interface PluginOptions {
  /**
   * 存储实例 - 优先级小于 Store 内设定
   * @default UniStorage
   */
  storage?: StorageLike;
}

/**
 * 存储持久化配置
 */
export interface PersistOptions {
  /**
   * 是否启用持久化
   * @default true
   */
  enabled?: boolean;
  /**
   * 存储键名
   * @default store.$id
   */
  key?: string;
  /**
   * 持久化的状态路径数组，不指定则持久化整个 state
   */
  paths?: string[];
  /**
   * 存储实例
   * @default UniStorage
   */
  storage?: StorageLike;
}

/**
 * Storage API 的同步存储
 * @default UniStorage
 */
export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

type Store = PiniaPluginContext['store']
type PartialState = Partial<Store['$state']>

declare module 'pinia' {
  // eslint-disable-next-line unused-imports/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    persist?: PersistOptions | Array<PersistOptions & {
      /** 多存储时键名，需要手动指定  */
      key: string;
    }>;
  }
}

export const createPiniaPersist = (pluginOptions: PluginOptions) => ({ options, store }: PiniaPluginContext): void => {
  if (!options.persist) {
    return
  }

  const persists = Array.isArray(options.persist) ? options.persist : [options.persist]

  const globalStore = pluginOptions.storage || {
    getItem: uni.getStorageSync,
    setItem: uni.setStorageSync,
  }

  const resolvePersist = (options: PersistOptions): Required<PersistOptions> | null => {
    const { enabled = true, key = store.$id, storage = globalStore, paths = [] } = options
    if (!enabled) {
      return null
    }

    return {
      enabled,
      key,
      storage,
      paths,
    }
  }

  const resolvedPersists = persists
    .map(resolvePersist)
    .filter((p): p is Required<PersistOptions> => p !== null && p.enabled)

  resolvedPersists.forEach((persist) => {
    const storageResult = persist.storage.getItem(persist.key)
    if (storageResult) {
      store.$patch(JSON.parse(storageResult))
      updateStorage(persist, store)
    }
  })

  store.$subscribe(() => {
    resolvedPersists.forEach(persist => updateStorage(persist, store))
  }, { detached: true })
}

function updateStorage(persist: Required<PersistOptions>, store: Store) {
  if (persist.paths.length) {
    const partialState = persist.paths.reduce((finalObj, key) => {
      if (key in store.$state) {
        finalObj[key] = store.$state[key]
      }

      return finalObj
    }, {} as PartialState)

    persist.storage.setItem(persist.key, JSON.stringify(partialState))
  }
  else {
    persist.storage.setItem(persist.key, JSON.stringify(store.$state))
  }
}

export const piniaPersist = createPiniaPersist({})
