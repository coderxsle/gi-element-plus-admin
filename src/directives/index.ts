import type { App, Directive } from 'vue'
import { useUserStore } from '@/stores/modules/user'

/** 权限指令 v-permission */
const permission: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const userStore = useUserStore()
    if (!userStore.hasPermission(binding.value))
      el.parentNode?.removeChild(el)
  },
}

const directives: Record<string, Directive> = {
  permission,
}

export default {
  install(app: App) {
    Object.entries(directives).forEach(([name, directive]) => {
      app.directive(name, directive)
    })
  },
}
