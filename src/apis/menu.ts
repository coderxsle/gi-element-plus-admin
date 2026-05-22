import { request } from './request'
import type { AppRouteRecordRaw } from '@/types/router'

/** 获取动态路由菜单 */
export function getRoutesApi() {
  return request<AppRouteRecordRaw[]>({ url: '/menu/routes', method: 'get' })
}
