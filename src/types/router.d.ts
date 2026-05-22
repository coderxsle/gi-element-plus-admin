import type { RouteRecordRaw } from 'vue-router'

/** 扩展路由 meta */
export interface RouteMeta {
  /** 菜单标题 */
  title?: string
  /** 图标 */
  icon?: string
  /** 是否隐藏菜单 */
  hidden?: boolean
  /** 是否缓存页面 */
  keepAlive?: boolean
  /** 权限标识 */
  permission?: string | string[]
  /** 是否固定在标签页 */
  affix?: boolean
  /** 外链 */
  link?: string
}

export type AppRouteRecordRaw = RouteRecordRaw & {
  meta?: RouteMeta
  children?: AppRouteRecordRaw[]
}
