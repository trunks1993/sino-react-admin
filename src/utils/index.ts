import { keys, pick, assign } from 'lodash-es';

export function extractTree<T, K = Record<string, any>>(treeList: T[], childrenKey: keyof T, extractAttrs: Array<keyof T | keyof K>, callback?: (args: T) => K) {
  let attrList: Array<keyof T | keyof K> = [];
  if (!extractAttrs?.length){
    attrList = keys(treeList[0]) as Array<keyof T>;
    attrList.splice(attrList.indexOf(childrenKey), 1);
  } else {
    attrList = extractAttrs;
  }

  const flatten: Partial<T & K>[] = [];

  const formatItem = (treeItems: T[]): Partial<T & K>[] | any => {

    if (!treeItems?.length) {
      return;
    }

    const newChildren: T[] = [];

    for (const item of treeItems) {
      let extraObject = {};

      if (callback) {
        extraObject = callback(item);
      }

      const draft = assign({}, extraObject, item);

      const filterItemNoChildren = pick(draft, attrList) as Partial<T & K>;

      flatten.push(filterItemNoChildren);

      const filterItem = pick(draft, [...attrList, childrenKey]) as T;

      newChildren.push(filterItem);

      filterItem[childrenKey] = formatItem((item as any)[childrenKey]);
    }

    return newChildren;
  };

  const draft = formatItem(treeList);

  return { draft, flatten };
}
