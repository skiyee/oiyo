<script setup lang="ts">
import { navigateToInterceptor } from '~/router/interceptor'
import { tabbarStore } from '~/tabbar/store'

onLaunch((options) => {
  console.log('App.vue onLaunch', options)
})

onShow((options) => {
  console.log('App.vue onShow', options)
  // 处理直接进入页面路由的情况：如 h5 直接输入路由、微信小程序分享后进入等
  // https://github.com/unibest-tech/unibest/issues/192
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})

onHide(() => {
  console.log('App Hide')
})

// #ifdef H5
function syncTabbarWhenPageVisible() {
  if (document.visibilityState === 'visible') {
    tabbarStore.syncCurIdxByCurrentPageAsync()
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', syncTabbarWhenPageVisible)
  window.addEventListener('pageshow', syncTabbarWhenPageVisible)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', syncTabbarWhenPageVisible)
  window.removeEventListener('pageshow', syncTabbarWhenPageVisible)
})
// #endif
</script>

<template>
  <OiyoLayout>
    <OiyoPage />
  </OiyoLayout>
</template>
