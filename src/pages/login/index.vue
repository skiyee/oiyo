<script lang="ts" setup>
import type { ILoginForm } from '~/apis/types/user'

definePageMeta({
  // 登录页不使用 tabbar 布局，使用默认布局
  style: {
    navigationBarTitleText: '登录',
  },
})

const userStore = useUserStore()

const loginForm = reactive<ILoginForm>({
  username: '',
  password: '',
})

const loading = ref(false)
const redirect = ref(HOME_PAGE)

onLoad((query) => {
  if (typeof query?.redirect !== 'string') {
    return
  }

  const target = ensureDecodeURIComponent(query.redirect)
  if (target.startsWith('/') && target !== '/pages/login/index') {
    redirect.value = target
  }
})

async function handleSubmit() {
  if (!loginForm.username || !loginForm.password) {
    uni.showToast({ title: '请输入账号和密码', icon: 'none' })
    return
  }
  loading.value = true
  try {
    await userStore.login({ ...loginForm })
    uni.reLaunch({ url: redirect.value })
  }
  catch {
    // 错误提示已在 store/http 层处理
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <view class="px-6 pt-safe">
    <view class="mt-16 text-center text-2xl">
      登录
    </view>

    <view class="mt-10">
      <input
        v-model="loginForm.username"
        class="mb-4 border-b border-gray-200 py-2"
        placeholder="请输入账号"
      >
      <input
        v-model="loginForm.password"
        class="mb-6 border-b border-gray-200 py-2"
        password
        placeholder="请输入密码"
      >
      <button
        class="bg-primary text-white"
        :loading="loading"
        @click="handleSubmit"
      >
        登录
      </button>
    </view>
  </view>
</template>
