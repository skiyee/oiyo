export default defineRouteMiddleware((to, from) => {
  // eslint-disable-next-line no-console
  console.log(`[middleware:logger] ${from.fullPath} -> ${to.fullPath}`)
})
