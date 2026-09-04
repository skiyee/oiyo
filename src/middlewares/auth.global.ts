import { isLoggedIn } from '~/apis/http/auth'

const LOGIN_PAGE = '/pages/login/index'
const WHITE_LIST = [
  LOGIN_PAGE,
  '/pages/home/index',
  '/pages/about/index',
]

export default defineRouteMiddleware((to) => {
  if (WHITE_LIST.includes(to.path) || isLoggedIn()) {
    return
  }

  return goTo({
    path: LOGIN_PAGE,
    query: {
      redirect: to.fullPath,
    },
  })
})
