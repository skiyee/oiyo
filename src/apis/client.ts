/* eslint-disable no-console */

export const PetClient = http.create({
  baseURL: 'https://petstore3.swagger.io/api/v3',
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
