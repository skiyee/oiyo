<script setup lang="ts">
// i-carbon-code
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
import { tabbarList, tabbarStore } from './store'
import TabbarItem from './TabBarItem.vue'

// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
// #endif

/**
 * 中间的鼓包tabbarItem的点击事件
 */
function handleClickBulge() {
  uni.showToast({
    title: '点击了中间的鼓包tabbarItem',
    icon: 'none',
  })
}

function handleClick(index: number) {
  // 当前高亮和真实页面都已经是目标 tab 时，不重复跳转
  if (index === tabbarStore.curIdx && tabbarStore.isCurrentRouteTabbarItem(index)) {
    return
  }
  const list = tabbarList.value
  if (!list[index]) {
    return
  }
  if (list[index].isBulge) {
    handleClickBulge()
    return
  }
  const url = list[index].pagePath
  const prevIdx = tabbarStore.curIdx
  tabbarStore.setCurIdx(index)
  const syncTabbarAfterNavigation = () => {
    tabbarStore.syncCurIdxByCurrentPageAsync()
  }
  const restoreTabbarWhenNavigationFailed = () => {
    tabbarStore.setCurIdx(prevIdx)
  }
  if (tabbarCacheEnable) {
    uni.switchTab({
      url,
      success: syncTabbarAfterNavigation,
      fail: restoreTabbarWhenNavigationFailed,
    })
  }
  else {
    uni.navigateTo({
      url,
      success: syncTabbarAfterNavigation,
      fail: restoreTabbarWhenNavigationFailed,
    })
  }
}
// #ifndef MP-WEIXIN || MP-ALIPAY
// 因为有了 custom:true， 微信里面不需要多余的hide操作
onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  needHideNativeTabbar
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      console.log('hideTabBar success: ', res)
    },
  })
})
// #endif

// #ifdef MP-ALIPAY
onMounted(() => {
  // 解决支付宝自定义tabbar 未隐藏导致有2个 tabBar 的问题; 注意支付宝很特别，需要在 onMounted 钩子调用
  customTabbarEnable // 另外，支付宝里面，只要是 customTabbar 都需要隐藏
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      console.log('hideTabBar success: ', res)
    },
  })
})
// #endif
const activeColor = 'var(--wot-color-theme, #1890ff)'
const inactiveColor = '#666'
function getColorByIndex(index: number) {
  return tabbarStore.curIdx === index ? activeColor : inactiveColor
}
</script>

<template>
  <view v-if="customTabbarEnable" class="h-50px pb-safe">
    <!-- 固定在底部的自定义 tabbar 容器（原 .border-and-fixed，改用 unocss 原子类） -->
    <view
      class="fixed bottom-0 left-0 right-0 z-1000 box-border border-t border-t-#eee border-t-solid bg-white"
      @touchmove.stop.prevent
    >
      <view class="h-50px flex items-center">
        <view
          v-for="(item, index) in tabbarList" :key="index"
          class="flex flex-1 flex-col items-center justify-center"
          :style="{ color: getColorByIndex(index) }"
          @click="handleClick(index)"
        >
          <view v-if="item.isBulge" class="relative">
            <!-- 中间一个鼓包tabbarItem的处理（原 .bulge，改用 unocss 原子类 + arbitrary value） -->
            <view class="absolute left-1/2 top--20px h-250rpx w-250rpx flex origin-top items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_1px_#fefefe] transform-[translateX(-50%)_scale(0.5)_translateY(-33%)]">
              <TabbarItem :item="item" :index="index" class="text-center" is-bulge />
            </view>
          </view>
          <TabbarItem v-else :item="item" :index="index" class="relative px-3 text-center" />
        </view>
      </view>

      <view class="pb-safe" />
    </view>
  </view>
</template>
