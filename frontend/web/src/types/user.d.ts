/** 用户信息 */
export interface UserInfo {
  id: string | number
  username: string
  nickname: string
  avatar?: string
  email?: string
  phone?: string
  role?: string
  roles: string[]
  permissions: string[]
}

/** 登录参数 */
export interface LoginParams {
  username: string
  password: string
}

/** 登录响应 */
export interface LoginResult {
  token: string
  user: UserInfo
}
