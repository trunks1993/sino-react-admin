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
  'GET /sino-system/menu/list': (req: Request, res: Response) => {
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
};
