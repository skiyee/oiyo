const WHITE_LIST = [
  '/pages/home/index',
  '/pages/my/index',
  '/pages/login/index',
]

export default defineRouteMiddleware((to) => {
  if (WHITE_LIST.includes(to.path)) {
    return
  }

  if (!uni.getStorageSync('token')) {
    return goTo('/pages/login/index', {
      query: { redirect: to.fullPath },
    })
  }
})
