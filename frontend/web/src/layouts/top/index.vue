<script setup lang="ts">
/**
 * 顶栏布局模式
 * 菜单置于顶部，适用于菜单较少的场景
 */
import AppHeader from '@/components/AppHeader/index.vue'
import AppTabs from '@/components/AppTabs/index.vue'
import PageTransition from '@/components/PageTransition/index.vue'
</script>

<template>
  <div class="layout layout--top">
    <AppHeader mode="top" />
    <AppTabs />
    <div class="layout__content">
      <PageTransition />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout--top {
  flex-direction: column;
  background: var(--el-fill-color-light);
}
</style>
