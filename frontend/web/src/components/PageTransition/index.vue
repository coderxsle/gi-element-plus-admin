<script setup lang="ts">
import { useTabsStore } from '@/stores/modules/tabs'

const tabsStore = useTabsStore()

/** 需要缓存的组件名列表 */
const cachedViews = computed(() => {
  return tabsStore.tabs
    .filter(t => t.keepAlive && t.name)
    .map(t => String(t.name))
})
</script>

<template>
  <router-view v-slot="{ Component, route: currentRoute }">
    <transition name="fade-slide" mode="out-in">
      <keep-alive :include="cachedViews">
        <component
          :is="Component"
          v-if="Component"
          :key="currentRoute.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>
