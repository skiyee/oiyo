/* eslint-disable no-console */

export const PetClient = http.create({
  baseURL: import.meta.env.VITE_API_URL,
  onRequest: (c) => {
    console.log('onRequest hook: ', c)
  },
  onRequestError: (c) => {
    console.log('onRequestError hook: ', c)
  },
  onResponse: (c) => {
    console.log('onResponse hook: ', c)
  },
  onResponseError: (c) => {
    console.log('onResponseError hook: ', c)
  },
})
