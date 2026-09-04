export default defineRouteMiddleware((to, from) => {
  console.log(`[route] ${from.fullPath || '/'} -> ${to.fullPath}`)
})
