<template>
  <view class="mt-[24rpx] rounded-[24rpx] border-[2rpx] border-dashed border-[#8cb6ff] bg-[#f8fbff] p-[24rpx]">
    <view class="rounded-[20rpx] bg-[#eaf3ff] p-[20rpx]">
      <text class="block text-[22rpx] text-[#2474ff] font-700 tracking-[4rpx]">
        LAYOUT
      </text>
      <text class="mt-[8rpx] block text-[34rpx] text-[#12315f] font-700">
        default.vue
      </text>
      <text class="mt-[10rpx] block text-[24rpx] text-[#4c6288] leading-[1.6]">
        默认布局，负责包裹没有自定义布局的页面。
      </text>
    </view>
    <view class="mt-[20rpx]">
      <slot />
    </view>
  </view>
</template>
