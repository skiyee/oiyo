<script setup>
definePageMeta({
  style: {
    navigationBarTitleText: '我的 - Oiyo',
  },
})
</script>

<template>
  <view class="overflow-hidden rounded-[24rpx] border-[2rpx] border-solid border-[#d5b2ff] bg-[#fcf8ff]">
    <view class="bg-[#f3e8ff] p-[24rpx]">
      <text class="block text-[22rpx] text-[#7f3dff] font-700 tracking-[4rpx]">
        PAGE
      </text>
      <text class="mt-[8rpx] block text-[34rpx] text-[#4b1c9f] font-700">
        pages/my/index.vue
      </text>
      <text class="mt-[10rpx] block text-[24rpx] text-[#6b5299] leading-[1.6]">
        这个页面没有单独指定 layout，因此会落到默认布局。
      </text>
    </view>

    <view class="p-[28rpx_24rpx_36rpx]">
      <text class="block text-[40rpx] text-[#4b1c9f] font-700">
        My Page
      </text>
      <text class="mt-[16rpx] block text-[26rpx] text-[#6b5299] leading-[1.8]">
        你现在看到的是 page 内容区；它被 default layout 包裹，而 default layout 又被 App 包裹。
      </text>
    </view>
  </view>
</template>
