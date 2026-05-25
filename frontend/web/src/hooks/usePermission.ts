import { useUserStore } from '@/stores/modules/user'

/** 权限判断 Hook */
export function usePermission() {
  const userStore = useUserStore()

  function hasPermission(permission?: string | string[]) {
    return userStore.hasPermission(permission)
  }

  return { hasPermission, permissions: computed(() => userStore.permissions) }
}
