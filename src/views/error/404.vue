<script setup lang="ts">
import { appConfig } from '@/config'
</script>

<template>
  <div class="error-page">
    <h1>404</h1>
    <p>抱歉，您访问的页面不存在</p>
    <el-button type="primary" @click="$router.push(appConfig.homePath)">
      返回首页
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  height: 60vh;

  h1 {
    margin: 0;
    font-size: 72px;
    color: var(--el-color-primary);
  }
}
</style>
