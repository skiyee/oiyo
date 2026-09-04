export default defineRouteMiddleware((to, from) => {
  console.log('Oiyo logger middleware:', { to, from })

  if (to.path && from.path) {
    console.log(`Navigation: ${from.path} -> ${to.path}`)
  }
})
