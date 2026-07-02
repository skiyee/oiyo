<script setup lang="ts">
definePageMeta({
  type: 'home',
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页 - skiyee-oiyo',
  },
  tab: {
    index: 0,
    text: '首页',
  },
})

const { title, increment } = useRootContext<{ title: Ref<string>; increment: () => void }>()

onLoad(() => {
  // eslint-disable-next-line no-console
  console.log('Home Page Load')
})

function jumpMy() {
  uni.switchTab({ url: '/pages/my/index' })
}

function jumpPackage() {
  uni.navigateTo({ url: '/packages/root/pages/page/index' })
}

async function mockRequest() {
  // 由于上游模拟的地址无法调通，需要换成真实 API 进行测试，这里始终会显示 500
  const user = await createUser({
    id: 10,
    username: 'theUser',
    firstName: 'John',
    lastName: 'James',
    email: 'john@email.com',
    password: '12345',
    phone: '12345',
    userStatus: 1,
  })

  // eslint-disable-next-line no-console
  console.log(user)
}
</script>

<template>
  <view class="overflow-hidden p-xs rounded-lg border border-solid border-orange-500 bg-orange-50">
    <view class="flex flex-col">
      <span class="text-xs text-orange-500 font-bold">PAGE</span>
      <span class="text-base text-orange-700 font-bold">pages/home/index.vue</span>
      <span class="mt-0.5 text-xs text-orange-700">页面中获取根部状态 title: {{ title }}</span>
    </view>

    <view class="flex justify-center">
      <image class="size-24 my-3xl" src="/static/logo.png" />
    </view>
    <view class="flex gap-3 w-full">
      <view class="w-full py-xs rounded-md bg-orange-200 text-orange-800 text-center" @click="jumpMy">
        跳转到我的页
      </view>
      <view class="w-full py-xs rounded-md bg-orange-200 text-orange-800 text-center" @click="jumpPackage">
        跳转到分包页
      </view>
    </view>
    <view class="mt-3 w-full py-xs rounded-md bg-orange-200 text-orange-800 text-center" @click="increment">
      页面级触发根部方法 +6
    </view>
    <view class="mt-3 w-full py-xs rounded-md bg-orange-200 text-orange-800 text-center" @click="mockRequest">
      触发模拟网络请求
    </view>
  </view>
</template>
