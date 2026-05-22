/**
 * 解析 import.meta.glob 返回的模块
 * Vite 在不同系统下 key 格式不一致，需模糊匹配
 */
export function resolveGlobModule(
  modules: Record<string, unknown>,
  matcher: (normalizedPath: string) => boolean,
) {
  const key = Object.keys(modules).find((k) => {
    const normalized = k.replace(/\\/g, '/')
    return matcher(normalized)
  })
  if (!key)
    console.warn('[resolveGlobModule] not found for:', matcher.toString())
  return key ? modules[key] : undefined
}
