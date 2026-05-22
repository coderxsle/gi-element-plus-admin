/** 统一 API 响应结构 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 分页请求参数 */
export interface PageParams {
  page: number
  pageSize: number
  [key: string]: unknown
}

/** 分页响应数据 */
export interface PageResult<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}
