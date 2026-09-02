<script setup lang="ts">
definePageMeta({
  middleware: 'logger',
  style: {
    navigationBarTitleText: '我的 - skiyee-oiyo',
  },
  tab: {
    index: 1,
    text: '我的',
  },
})
</script>

<template>
  <view class="overflow-hidden p-xs rounded-lg border border-solid border-orange-500 bg-orange-50">
    <view class="flex flex-col">
      <span class="text-xs text-orange-500 font-bold">PAGE</span>
      <span class="text-base text-orange-700 font-bold">pages/my/index.vue</span>
      <span class="mt-0.5 text-xs text-orange-700">页面只负责自己的内容表达与交互逻辑</span>
    </view>

    <view class="flex justify-center">
      <image class="size-24 my-3xl" src="/static/logo.png" />
    </view>
  </view>
</template>
