export const useAppStore = defineStore('app', () => {
  const name = ref('oiyo')
  const author = ref('skiyee')
  const website = ref('https://oiyo.js.org/')

  return { name, author, website }
})
