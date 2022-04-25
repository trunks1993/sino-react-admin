/* eslint-disable @typescript-eslint/ban-ts-comment */
import { extractTree } from '../index';
import { Menu } from '@/models/frame';

describe('extractTree函数测试', () => {
  it('测试树形菜单能否正确拍平', () => {
    const tree = [
      {
        id: '123',
        parentId: '-1',
        path: 'system',
        name: '系统设置',
        children: [
          {
            id: '456',
            parentId: '123',
            path: 'menu',
            name: '菜单设置',
          },
        ]
      }
    ];
    const flattenTree = [
      {
        id: '123',
        parentId: '-1',
        path: 'system',
        name: '系统设置',
      },
      {
        id: '456',
        parentId: '123',
        path: 'menu',
        name: '菜单设置',
      },
    ];
    const { flatten } = extractTree(tree, 'children', []);
    expect(flatten).toEqual(flattenTree);
  });

  it('测试树形菜单能否正确映射字段', () => {
    const tree = [
      {
        id: '123',
        parentId: '-1',
        path: 'system',
        name: '系统设置',
        children: [
          {
            id: '456',
            parentId: '123',
            path: 'menu',
            name: '菜单设置',
          },
        ]
      }
    ];
    const draftTree = [
      {
        label: '系统设置',
        key: 'system',
        children: [
          {
            label: '菜单设置',
            key: 'menu',
          }
        ]
      },
    ];

    const addAttr = (item: any) => ({ label: item.name, key: item.path });

    const { draft } = extractTree<Menu>(tree, 'children', ['label', 'key'], addAttr);
    expect(draft).toEqual(draftTree);
  });
});
