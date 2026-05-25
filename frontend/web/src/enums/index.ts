/** HTTP 状态码 */
export enum HttpCode {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

/** 布局模式 */
export enum LayoutMode {
  /** 左侧菜单 + 顶栏 */
  SIDE = 'side',
  /** 顶栏菜单 */
  TOP = 'top',
  /** 混合布局 */
  MIX = 'mix',
}

/** 本地存储键名 */
export enum StorageKey {
  TOKEN = 'gi_token',
  USER = 'gi_user',
  THEME = 'gi_theme',
  LAYOUT = 'gi_layout',
}
