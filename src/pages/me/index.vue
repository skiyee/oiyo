<script lang="ts" setup>
definePageMeta({
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
  },
})

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const hasLogin = computed(() => userStore.hasLogin)

function handleLogin() {
  uni.navigateTo({ url: '/pages/login/index' })
}

function handleLogout() {
  userStore.logout()
}
</script>

<template>
  <view class="mt-10 px-4">
    <view class="flex flex-col items-center">
      <image
        :src="userInfo.avatar || '/static/images/default-avatar.png'"
        class="h-20 w-20 rounded-full"
        mode="scaleToFill"
      />
      <view class="mt-3 text-lg">
        {{ hasLogin ? (userInfo.nickname || userInfo.username || '已登录用户') : '未登录' }}
      </view>
    </view>

    <view class="mt-8">
      <button v-if="!hasLogin" class="bg-primary text-white" @click="handleLogin">
        去登录
      </button>
      <button v-else @click="handleLogout">
        退出登录
      </button>
    </view>
  </view>
</template>
