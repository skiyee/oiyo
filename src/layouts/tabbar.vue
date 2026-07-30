<script setup lang="ts">
import CustomTabbar from '~/tabbar/TabBar.vue'
</script>

<template>
  <view>
    <slot />
    <CustomTabbar />
  </view>
</template>
