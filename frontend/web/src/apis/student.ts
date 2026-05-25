import { request } from './request'
import type { PageParams, PageResult } from '@/types/api'

export interface StudentInfo {
  id: number
  name: string
  student_no?: string
  gender?: string
  age?: number
  phone?: string
  email?: string
  address?: string
  created_at?: string
  updated_at?: string
}

export function getStudentListApi(params: PageParams & { name?: string }) {
  return request<PageResult<StudentInfo>>({ url: '/student/list', method: 'get', params })
}

export function getStudentDetailApi(id: number) {
  return request<StudentInfo>({ url: `/student/${id}`, method: 'get' })
}

export function createStudentApi(data: Partial<StudentInfo>) {
  return request({ url: '/student', method: 'post', data })
}

export function updateStudentApi(id: number, data: Partial<StudentInfo>) {
  return request({ url: `/student/${id}`, method: 'put', data })
}

export function deleteStudentApi(id: number) {
  return request({ url: `/student/${id}`, method: 'delete' })
}