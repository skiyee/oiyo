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
  <view class="bg-white px-4 overflow-hidden">
    <!-- Logo -->
    <view class="mt-20 flex justify-center">
      <image
        src="/static/logo.png"
        alt="oiyo-unibest"
        mode="aspectFill"
        class="h-32 rounded-3xl shadow-xl"
      />
    </view>

    <!-- 主标题 -->
    <view class="mt-8 text-center">
      <view class="text-4xl font-bold text-primary">
        oiyo-unibest
      </view>
    </view>

    <!-- 副标题 + 分隔线 -->
    <view class="mt-2 flex items-center justify-center">
      <view class="text-xl text-gray-500">
        最好用的 uniapp 开发模板
      </view>
    </view>

    <!-- 分隔线 -->
    <view class="my-6 flex items-center justify-center">
      <view class="h-px w-20 bg-primary/20" />
    </view>

    <!-- 描述文字 -->
    <view class="text-base leading-relaxed text-gray-600 text-center">
      oiyo-unibest 是由 oiyo 框架赋能 unibest 而成的模板：拥有 oiyo 的约定式路由、布局、请求、自动导入等，同时带来 unibest 的请求封装、自定义 tabbar、多语言能力。
    </view>

    <!-- 底部信息 -->
    <view class="mt-16 text-center">
      <view class="text-xs text-gray-400">
        © 2026 oiyo-unibest 模板
      </view>
    </view>
  </view>
</template>
