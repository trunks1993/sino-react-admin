import { keys, pick, assign } from 'lodash-es';

export function extractTree<T>(treeList: T[], childrenKey: string, extractAttrs: string[], callback?: (args: any) => any) {
  let attrList: string[] = [];
  if (!extractAttrs?.length){
    attrList = keys(treeList[0]);
    attrList.splice(attrList.indexOf(childrenKey), 1);
  } else {
    attrList = extractAttrs;
  }

  const flatten: Partial<T>[] = [];

  const formatItem = (treeItems: T[]): any => {

    if (!treeItems?.length) {
      return;
    }

    const newChildren: any = [];

    for (const item of treeItems) {
      let extraObject = {};

      if (callback) {
        extraObject = callback(item);
      }

      const draft = assign({}, extraObject, item);

      const filterItemNoChildren = pick(draft, attrList);

      flatten.push(filterItemNoChildren);

      const filterItem = pick(draft, [...attrList, childrenKey]);

      newChildren.push(filterItem);

      (filterItem as any)[childrenKey] = formatItem((item as any)[childrenKey]);
    }

    return newChildren;
  };

  const draft = formatItem(treeList);

  return { draft, flatten };
}
