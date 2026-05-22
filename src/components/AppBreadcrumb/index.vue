<script setup lang="ts">
import { useBreadcrumb } from '@/hooks/useBreadcrumb'

const { breadcrumbs } = useBreadcrumb()
</script>

<template>
  <el-breadcrumb v-if="breadcrumbs.length" class="app-breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="item.path"
      :to="index < breadcrumbs.length - 1 ? item.path : undefined"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb {
  margin-bottom: 12px;
}
</style>
