<template>
  <view class="mt-xs p-xs rounded-lg border border-solid border-blue-500 bg-blue-50">
    <view class="flex flex-col">
      <span class="text-xs text-blue-500 font-bold">LAYOUT</span>
      <span class="text-base text-blue-700 font-bold">tabbar.vue</span>
      <span class="mt-0.5 text-xs text-blue-600">带底部导航语义的布局，用于主页这类主入口页面</span>
    </view>

    <view class="mt-xs">
      <slot />
    </view>
  </view>
</template>
