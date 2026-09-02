<script setup lang="ts">
function handleLogout() {
  // 清除登录态
  uni.removeStorageSync('token')
  uni.showToast({ title: '已退出登录', icon: 'success' })

  // 退出后回到登录页
  setTimeout(() => {
    uni.reLaunch({ url: '/pages/home/index' })
  }, 500)
}
</script>

<template>
  <view class="overflow-hidden p-xs rounded-lg border border-solid border-orange-500 bg-orange-50">
    <view class="flex flex-col">
      <span class="text-xs text-orange-500 font-bold">SUBPACKAGE</span>
      <span class="text-base text-orange-700 font-bold">packages/root/pages/page/index.vue</span>
      <span class="mt-0.5 text-xs text-orange-700">页面只负责自己的内容表达与交互逻辑</span>
    </view>

    <view class="flex justify-center">
      <image class="size-24 my-3xl" src="/static/logo.png" />
    </view>

    <button class="mt-3 w-full mx-0 py-xs rounded-md bg-orange-600 text-white text-base" hover-class="bg-orange-700" @click="handleLogout">
      模拟退出登录
    </button>
  </view>
</template>
