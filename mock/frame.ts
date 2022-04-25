import { Request, Response } from 'express';

export default {
  'POST /sino-auth/oauth/token': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(JSON.stringify({
        code: 200,
        data: {
          access_token: '1223',
          nick_name: '测试',
        },
        msg: 'success'
      }));
    }, 1000);
  },
  'GET /sino-system/menu/routes': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(JSON.stringify({
        code: 200,
        data: [{
          id: '123123',
          parentId: '-1',
          name: '系统管理',
          path: 'system',
          hasChildren: true,
          category: 1,
          source: 'SettingOutlined',
          children: [
            {
              id: '22222',
              parentId: '123123',
              name: '菜单管理',
              path: 'menu',
              hasChildren: false,
              source: 'MenuOutlined',
              category: 1,
            },
            {
              id: '22223',
              parentId: '123123',
              name: '角色管理',
              path: 'role',
              hasChildren: false,
              source: 'UserOutlined',
              category: 1,
            }
          ]
        }],
        msg: 'success'
      }));
    }, 1000);
  },
};
