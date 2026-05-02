<script setup lang="ts">
definePageMeta({
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页 - Oiyo',
  },
})

onLoad(() => {
  console.log('Page Load')
})

const title = ref('Hello')

function jump() {
  uni.navigateTo({ url: '/pages/my/index' })
}
</script>

<template>
  <view class="overflow-hidden rounded-[24rpx] border-[2rpx] border-solid border-[#f3c77d] bg-[#fffaf1]">
    <view class="bg-[#fff1d6] p-[24rpx]">
      <text class="block text-[22rpx] text-[#d17a00] font-700 tracking-[4rpx]">
        PAGE
      </text>
      <text class="mt-[8rpx] block text-[34rpx] text-[#7a4300] font-700">
        pages/home/index.vue
      </text>
      <text class="mt-[10rpx] block text-[24rpx] text-[#94653a] leading-[1.6]">
        页面只负责自己的内容表达与交互逻辑。
      </text>
    </view>

    <view class="flex flex-col items-center justify-center p-[28rpx_24rpx_36rpx]">
      <image class="mb-[36rpx] h-[180rpx] w-[180rpx]" src="/static/logo.png" />
      <view class="flex justify-center">
        <text class="text-[36rpx] text-[#7a4300]">
          {{ title }} Home Page
        </text>
      </view>
      <view class="my-[28rpx] rounded-[18rpx] bg-[#ffffff] px-[22rpx] py-[18rpx] text-[24rpx] text-[#8d6736] leading-[1.7]">
        <text>当前页面声明了 `layout: 'tabbar'`，所以会渲染在 tabbar 布局内部。</text>
      </view>
      <button type="primary" @click="jump">
        跳转到我的页
      </button>
    </view>
  </view>
</template>
