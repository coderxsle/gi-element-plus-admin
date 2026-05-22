import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { getRoutesApi } from '@/apis/menu'
import { resolveGlobModule } from '@/utils/modules'

const layoutModules = import.meta.glob('@/layouts/**/index.vue')
const viewModules = import.meta.glob('@/views/**/*.vue')

function resolveComponent(component: string) {
  if (!component)
    return undefined
  if (component === 'Layout' || component.startsWith('Layout')) {
    const layoutName = component === 'Layout' ? 'default' : component.replace('Layout', '').toLowerCase()
    return resolveGlobModule(layoutModules, path => path.includes(`/layouts/${layoutName}/index.vue`))
  }
  return resolveGlobModule(viewModules, path => path.endsWith(`/views/${component}.vue`))
    ?? resolveGlobModule(viewModules, path => path.endsWith(`/views/${component}/index.vue`))
}

function transformRoutes(routes: any[]): RouteRecordRaw[] {
  return routes.map((route) => {
    const { component, children, ...rest } = route
    const item = { ...rest } as RouteRecordRaw
    if (component && typeof component === 'string') {
      const resolved = resolveComponent(component) as RouteRecordRaw['component']
      if (!resolved)
        console.error(`[permission] 未找到路由组件: ${component}`)
      item.component = resolved
    }
    if (children?.length)
      item.children = transformRoutes(children)
    return item
  })
}

export const usePermissionStore = defineStore('permission', () => {
  const staticRoutes: RouteRecordRaw[] = [
    {
      path: '/',
      component: () => import('@/layouts/default/index.vue'),
      meta: { title: '首页', icon: 'home' },
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: { title: '工作台', icon: 'house' },
        },
      ],
    },
  ]

  const routes = ref<RouteRecordRaw[]>([...staticRoutes])
  const isRoutesLoaded = ref(false)

  async function generateRoutes() {
    try {
      const data = await getRoutesApi()
      console.log('[permission] API routes data:', data)
      const dynamicRoutes = transformRoutes(data)
      console.log('[permission] transformed routes:', dynamicRoutes)
      const allRoutes = [...staticRoutes, ...dynamicRoutes]
      console.log('[permission] all routes:', allRoutes)
      routes.value = allRoutes
      isRoutesLoaded.value = true
      return allRoutes
    }
    catch (e) {
      console.error('[permission] generateRoutes error:', e)
      isRoutesLoaded.value = true
      return routes.value
    }
  }

  function reset() {
    routes.value = [...staticRoutes]
    isRoutesLoaded.value = false
  }

  return { routes, isRoutesLoaded, generateRoutes, reset }
})
