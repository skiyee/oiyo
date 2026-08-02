<script lang="ts" setup>
definePageMeta({
  type: 'home',
  layout: 'tabbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
})

onLoad(() => {
  console.log('home/index 首页 onLoad')
})
</script>

<template>
  <view class="px-4 overflow-hidden">
    <view class="mt-4">
      <view class="text-base font-bold text-primary">
        <span class="text-[#D97C20]">oiyo</span>
        <span> & </span>
        <span class="text-[#21933f]">unibest</span>
      </view>
    </view>

    <view class="mt-20 flex justify-center">
      <image
        src="/static/logo.png"
        alt="oiyo-unibest"
        mode="aspectFill"
        class="h-32 rounded-3xl shadow-xl"
      />
    </view>

    <view class="mt-5 flex items-center justify-center">
      <view class="text-lg text-neutral">
        最好用的 uniapp 开发模板
      </view>
    </view>

    <view class="my-6 flex items-center justify-center">
      <view class="h-px w-20 bg-[#0a1c35]" />
    </view>

    <view class="text-base leading-relaxed text-neutral-600 text-center">
      oiyo-unibest 是由 oiyo 框架赋能 unibest 而成的模板：拥有 oiyo 的 根能力(App.vue)、约定式路由、布局、请求、自动导入等，同时带来 unibest 的请求封装、自定义 tabbar、多语言能力。
    </view>
  </view>
</template>
