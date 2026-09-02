<script setup lang="ts">
definePageMeta({
  layout: false,
  style: {
    navigationBarTitleText: '登录 - skiyee-oiyo',
  },
})

const redirectUrl = ref('')

onLoad((query) => {
  if (query?.redirect) {
    redirectUrl.value = decodeURIComponent(query.redirect)
  }
})

function handleLogin() {
  // 写入登录态
  uni.setStorageSync('token', 'demo-token')
  uni.showToast({ title: '登录成功', icon: 'success' })

  // 登录后回跳原目标，没有则回首页
  const target = redirectUrl.value || '/pages/home/index'
  setTimeout(() => {
    uni.reLaunch({ url: target })
  }, 500)
}
</script>

<template>
  <view class="overflow-hidden p-xs rounded-lg border border-solid border-indigo-500 bg-indigo-50">
    <view class="flex flex-col">
      <span class="text-xs text-indigo-500 font-bold">PAGE</span>
      <span class="text-base text-indigo-700 font-bold">pages/login/index.vue</span>
      <span class="mt-0.5 text-xs text-indigo-700">未登录访问受保护页面会被拦截到这里，登录成功后自动回跳原目标</span>
    </view>

    <view class="flex flex-col items-center">
      <image class="size-24 my-3xl" src="/static/logo.png" />
      <text class="text-lg text-indigo-800 font-bold">
        欢迎使用 skiyee-oiyo
      </text>
      <text class="mt-xs text-xs text-indigo-600 leading-[1.7]">
        这是一个演示登录页，点击下方按钮即可写入登录态
      </text>
      <view v-if="redirectUrl" class="mt-xs px-xs py-xs rounded-md bg-indigo-100">
        <span class="text-xs text-indigo-700">登录后将返回：{{ redirectUrl }}</span>
      </view>
    </view>

    <button class="mt-3 w-full mx-0 py-xs rounded-md bg-indigo-600 text-white text-base" hover-class="bg-indigo-700" @click="handleLogin">
      模拟登录
    </button>
  </view>
</template>
