import { Request, Response } from 'express';

export default {
  'GET /sino-system/role/list': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        JSON.stringify({
          code: 200,
          success: true,
          data: [
            {
              id: '1123598816738675201',
              tenantId: 'sinocare.com',
              parentId: '-1',
              roleName: '超级管理员',
              sort: 1,
              roleAlias: 'administrator',
              isDeleted: 0,
              parentName: '顶级',
              hasChildren: false,
            },
            {
              id: '1123598816738675202',
              tenantId: 'sinocare.com',
              parentId: '-1',
              roleName: '用户',
              sort: 2,
              roleAlias: 'user',
              isDeleted: 0,
              parentName: '顶级',
              hasChildren: false,
            },
          ],
          msg: '操作成功',
          ts: 1651217135304,
        }),
      );
    }, 1000);
  },
  'POST /sino-system/role/submit': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        JSON.stringify({
          code: 200,
          data: {},
          msg: 'success',
        }),
      );
    }, 1000);
  },
  'POST /sino-system/role/remove': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        JSON.stringify({
          code: 200,
          data: {},
          msg: 'success',
        }),
      );
    }, 1000);
  },

  'POST /sino-system/role/grant': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        JSON.stringify({
          code: 200,
          data: {},
          msg: 'success',
        }),
      );
    }, 1000);
  },
  'GET /sino-system/menu/role-tree-keys': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        JSON.stringify({
          code: 200,
          data: {
            apiScope: [],
            dataScope: [],
            menu: [
              '22222',
              '123123',
            ],
          },
          msg: 'success',
        }),
      );
    }, 1000);
  },
};
