import type { RouteLocationMatched } from 'vue-router'

/** 面包屑 Hook */
export function useBreadcrumb() {
  const route = useRoute()

  const breadcrumbs = computed(() => {
    return route.matched
      .filter(item => item.meta?.title && !item.meta?.hidden)
      .map((item: RouteLocationMatched) => ({
        title: item.meta?.title as string,
        path: item.path,
      }))
  })

  return { breadcrumbs }
}
