<template>
  <view class="mt-xs p-xs rounded-lg border border-solid border-emerald-500 bg-emerald-50">
    <view class="flex flex-col">
      <span class="text-xs text-emerald-500 font-bold">LAYOUT</span>
      <span class="text-base text-emerald-700 font-bold">default.vue</span>
      <span class="mt-0.5 text-xs text-emerald-600">默认布局，负责包裹默认没有调用布局的页面</span>
    </view>

    <view class="mt-xs">
      <slot />
    </view>
  </view>
</template>
