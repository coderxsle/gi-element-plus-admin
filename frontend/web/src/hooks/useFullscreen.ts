import { useFullscreen as useVueFullscreen } from '@vueuse/core'

/** 全屏 Hook（基于 VueUse） */
export function useFullscreen(target?: Ref<HTMLElement | null | undefined>) {
  const el = target ?? ref<HTMLElement | null>(document.documentElement)
  const { isFullscreen, enter, exit, toggle } = useVueFullscreen(el)

  return {
    isFullscreen,
    enter,
    exit,
    toggle,
  }
}
