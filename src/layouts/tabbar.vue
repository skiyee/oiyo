<script setup lang="ts">
import { tabbarStore } from '~/tabbar/store'
import CustomTabbar from '~/tabbar/TabBar.vue'

function syncTabbar() {
  tabbarStore.syncCurIdxByCurrentPageAsync()
}

// 布局首次渲染、TabBar 页面重新显示时，根据真实页面修正高亮项。
onMounted(syncTabbar)
onShow(syncTabbar)

// #ifdef H5
function syncTabbarWhenPageVisible() {
  if (document.visibilityState === 'visible') {
    syncTabbar()
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
  <view>
    <slot />
    <CustomTabbar />
  </view>
</template>
