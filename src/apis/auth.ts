import { request } from './request'
import type { LoginParams, LoginResult } from '@/types/user'

/** 登录 */
export function loginApi(data: LoginParams) {
  return request<LoginResult>({ url: '/auth/login', method: 'post', data })
}

/** 获取用户信息 */
export function getUserInfoApi() {
  return request<LoginResult['user']>({ url: '/auth/userinfo', method: 'get' })
}

/** 退出登录 */
export function logoutApi() {
  return request({ url: '/auth/logout', method: 'post' })
}
