<script setup lang="ts">
const { title, count, increment } = defineRootContext(() => {
  const title = ref('Hello Oiyo')
  const count = ref(2)

  function increment() {
    count.value += 3
  }

  return { title, count, increment }
})

onLaunch(() => {
  console.log('App Launch, title:', title.value)
})
</script>

<template>
  <view class="min-h-screen box-border bg-[linear-gradient(180deg,#eef4ff_0%,#f7f9fc_100%)] p-[28rpx]">
    <view class="mt-[20rpx] rounded-[24rpx] border-[2rpx] border-solid border-[#c8d7ff] bg-[rgba(255,255,255,0.9)] p-[24rpx] shadow-[0_16rpx_36rpx_rgba(61,104,255,0.08)]">
      <text class="text-[24rpx] text-[#3d68ff] font-700 tracking-[4rpx]">
        APP
      </text>
      <text class="mt-[8rpx] block text-[30rpx] text-[#16213d] font-600">
        App.vue
      </text>
      <text class="mt-[12rpx] block text-[26rpx] text-[#50607f] leading-[1.7]">
        这里放应用级状态、生命周期和包裹全部页面的视图骨架。
      </text>
    </view>

    <view class="mt-[20rpx] flex items-center justify-between gap-[20rpx] rounded-[24rpx] border-[2rpx] border-solid border-[#c8d7ff] bg-[rgba(255,255,255,0.9)] p-[24rpx] shadow-[0_16rpx_36rpx_rgba(61,104,255,0.08)]">
      <text class="text-[28rpx] text-[#22304f]">
        {{ title }} / count: {{ count }}
      </text>
      <button class="inline-block mx-0" size="mini" @click="increment">
        +3
      </button>
    </view>

    <OiyoLayout>
      <view class="mt-[24rpx] rounded-[24rpx] border-[2rpx] border-solid border-[#c8d7ff] bg-[rgba(255,255,255,0.9)] p-[20rpx] shadow-[0_16rpx_36rpx_rgba(61,104,255,0.08)]">
        <view class="rounded-[18rpx] bg-[#edf2ff] px-[20rpx] py-[18rpx] text-[24rpx] text-[#5870b3]">
          <text>下面区域由当前 layout 承载 page 内容</text>
        </view>
        <OiyoPage />
      </view>
    </OiyoLayout>
  </view>
</template>
