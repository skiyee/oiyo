<template>
  <view class="mt-[24rpx] rounded-[24rpx] border-[2rpx] border-dashed border-[#7fd4bf] bg-[#f3fffb] p-[24rpx]">
    <view class="rounded-[20rpx] bg-[#ddfbf2] p-[20rpx]">
      <text class="block text-[22rpx] text-[#0d8f6d] font-700 tracking-[4rpx]">
        LAYOUT
      </text>
      <text class="mt-[8rpx] block text-[34rpx] text-[#105246] font-700">
        tabbar.vue
      </text>
      <text class="mt-[10rpx] block text-[24rpx] text-[#43786c] leading-[1.6]">
        带底部导航语义的布局，用于主页这类主入口页面。
      </text>
    </view>

    <view class="mt-[20rpx]">
      <slot />
    </view>
  </view>
</template>
