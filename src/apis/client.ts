/* eslint-disable no-console */

declare module '@skiyee/oiyo/runtime' {
  interface HttpBaseOptions {
    // 拓展参数
    requiresAuth?: boolean;
  }
}

export const PetClient = http.create({
  baseURL: import.meta.env.VITE_API_URL,

  onBeforeRequest: (c) => {
    console.log('onRequest hook: ', c.options)
  },
  onRequestError: (c) => {
    console.log('onRequestError hook: ', c)
  },
  onResponseSuccess: (c) => {
    console.log('onResponse hook: ', c)
  },
  onResponseError: (c) => {
    console.log('onResponseError hook: ', c)
  },
})
