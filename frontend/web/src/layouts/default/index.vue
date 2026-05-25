<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue'
import AppSidebar from '@/components/AppSidebar/index.vue'
import AppTabs from '@/components/AppTabs/index.vue'
import PageTransition from '@/components/PageTransition/index.vue'
</script>

<template>
  <div class="layout">
    <AppSidebar />
    <div class="layout__main">
      <AppHeader />
      <AppTabs />
      <div class="layout__content">
        <PageTransition />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  background: var(--el-fill-color-light);
}
</style>
