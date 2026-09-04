<script setup lang="ts">
onLaunch((options) => {
  console.log('App.vue onLaunch', options)
})

onHide(() => {
  console.log('App Hide')
})
</script>

<template>
  <div class="overflow-hidden">
    <OiyoLayout>
      <OiyoPage />
    </OiyoLayout>
  </div>
</template>

<style>
page {
  background-color: #010a17;
}
</style>
