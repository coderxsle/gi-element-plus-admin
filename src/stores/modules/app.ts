import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'
import { LayoutMode, StorageKey } from '@/enums'

export const useAppStore = defineStore('app', () => {
  /** 侧边栏折叠 */
  const collapsed = ref(false)
  /** 布局模式 */
  const layoutMode = ref<LayoutMode>(LayoutMode.SIDE)
  /** 暗黑模式 */
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
    storageKey: StorageKey.THEME,
  })
  const toggleDark = useToggle(isDark)

  function toggleCollapsed() {
    collapsed.value = !collapsed.value
  }

  function setLayoutMode(mode: LayoutMode) {
    layoutMode.value = mode
  }

  return {
    collapsed,
    layoutMode,
    isDark,
    toggleDark,
    toggleCollapsed,
    setLayoutMode,
  }
}, {
  persist: {
    key: StorageKey.LAYOUT,
    pick: ['collapsed', 'layoutMode'],
  },
})
