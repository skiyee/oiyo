<script setup lang="ts">
const { title, count, increment, isDark, appStore } = defineRootContext<RootContext>(() => {
  const title = ref('Hello Oiyo')
  const count = ref(2)

  function increment() {
    count.value += 3
  }

  const isDark = useSystemDark()

  const appStore = useAppStore()

  return { title, count, increment, isDark, appStore }
})

async function mockSleep() {
  // eslint-disable-next-line no-console
  console.log('模拟阻止 1s 开始', Date.now())
  await sleep(1000)
  // eslint-disable-next-line no-console
  console.log('模拟阻止 1s 结束', Date.now())
}

onLaunch(() => {
  mockSleep()
  // eslint-disable-next-line no-console
  console.log(
    'App Launch',
    `title: ${title.value} / `,
    `名称: ${import.meta.env.VITE_OIYO_NAME} / `,
    `作者: ${import.meta.env.VITE_OIYO_AUTHOR} / `,
    `网站: ${import.meta.env.VITE_OIYO_WEBSITE}`,
    `网站: ${import.meta.env.VITE_API_URL}`,
  )
})
</script>

<template>
  <view class="box-border p-xs">
    <NavBar />

    <view class="my-xs p-xs rounded-lg border border-solid border-violet-500 bg-violet-50">
      <view class="flex flex-col">
        <span class="text-xs text-violet-500 font-bold">APP - 当前系统主题为 {{ isDark ? 'dark' : 'light' }}</span>
        <span class="text-base text-violet-700 font-bold">App.vue</span>
        <span class="mt-0.5 text-xs text-violet-600">根部放应用级状态、生命周期和包裹全部页面的视图骨架</span>
      </view>

      <OiyoLayout>
        <OiyoPage />
      </OiyoLayout>

      <view class="mt-xs p-xs rounded-lg bg-violet-200 flex items-center justify-between">
        <span class="text-sm text-violet-800">{{ title }} / count: {{ count }}</span>
        <button class="inline-block mx-0 bg-violet-600 text-white" hover-class="bg-violet-900" size="mini" @click="increment">
          +6
        </button>
      </view>
    </view>

    <view class="my-[24rpx] rounded-[24rpx] border-[2rpx] border-solid border-[#c8d7ff] bg-[rgba(255,255,255,0.9)] p-[24rpx] shadow-[0_16rpx_36rpx_rgba(61,104,255,0.08)]">
      <text class="mt-[8rpx] block text-[30rpx] text-[#16213d] font-600">
        {{ appStore.name }}
      </text>
      <text class="mt-[12rpx] block text-[26rpx] text-[#50607f] leading-[1.7]">
        作者: {{ appStore.author }} 网站: {{ appStore.website }}
      </text>
    </view>

    <TabBar />
  </view>
</template>

<style>
page {
  background-color: #F1F5F9;
}
</style>
