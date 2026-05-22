import XEUtils from 'xe-utils'

/** 本地存储封装（优先使用 xe-utils） */
export const storage = {
  get<T>(key: string, defaultValue?: T): T | undefined {
    const raw = localStorage.getItem(key)
    if (XEUtils.isEmpty(raw))
      return defaultValue
    try {
      return JSON.parse(raw!) as T
    }
    catch {
      return raw as unknown as T
    }
  },
  set(key: string, value: unknown): void {
    localStorage.setItem(key, XEUtils.isObject(value) || XEUtils.isArray(value) ? JSON.stringify(value) : String(value))
  },
  remove(key: string): void {
    localStorage.removeItem(key)
  },
  clear(): void {
    localStorage.clear()
  },
}
