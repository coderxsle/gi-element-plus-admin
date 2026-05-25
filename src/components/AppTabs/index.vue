<script setup lang="ts">
import { Close, Refresh } from '@element-plus/icons-vue'
import { GiTabs } from 'gi-component'
import { useTabsStore } from '@/stores/modules/tabs'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()

const tabsOptions = computed(() => tabsStore.tabs.map(tab => ({
  name: tab.path,
  label: tab.title,
  disabled: false,
})))

function handleTabClick(path: string) {
  router.push(path)
}

function handleClose(path: string, e: Event) {
  e.stopPropagation()
  const next = tabsStore.closeTab(path)
  if (path === route.path && next) {
    router.push(next.path)
  }
}
</script>

<template>
  <GiTabs
    :model-value="tabsStore.activeTab"
    :options="tabsOptions"
    type="card"
    size="small"
    @tab-change="handleTabClick"
  >
    <template #label="{ data }">
      <span class="app-tabs__label">
        {{ data.label }}
        <el-icon
          v-if="!tabsStore.tabs.find(t => t.path === data.name)?.affix"
          class="app-tabs__close"
          @click="handleClose(data.name, $event)"
        >
          <Close />
        </el-icon>
      </span>
    </template>
    <template #extra>
      <el-button text :icon="Refresh" @click="router.replace({ path: `/redirect${route.fullPath}` })" />
    </template>
  </GiTabs>
</template>

<style lang="scss">
.app-tabs__label {
  display: inline-flex;
  gap: 4px;
  align-items: center;
}

.app-tabs__close {
  margin-left: 4px;
  font-size: 12px;

  &:hover {
    color: var(--el-color-danger);
  }
}
</style>
