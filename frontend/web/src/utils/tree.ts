import XEUtils from 'xe-utils'

export interface TreeNode {
  id: string | number
  parentId?: string | number | null
  children?: TreeNode[]
  [key: string]: unknown
}

/** 列表转树（优先 xe-utils） */
export function listToTree<T extends TreeNode>(
  list: T[],
  options?: { key?: string, parentKey?: string, children?: string },
): T[] {
  const key = options?.key ?? 'id'
  const parentKey = options?.parentKey ?? 'parentId'
  const children = options?.children ?? 'children'
  return XEUtils.toArrayTree(list, { key, parentKey, children }) as T[]
}

/** 树转列表 */
export function treeToList<T extends TreeNode>(tree: T[], children = 'children'): T[] {
  return XEUtils.toTreeArray(tree, { children }) as T[]
}

/** 在树中查找节点 */
export function findTreeNode<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean,
  children = 'children',
): T | null {
  const result = XEUtils.findTree(tree, item => predicate(item as T), { children })
  return (result ? (result as unknown as T) : null)
}
