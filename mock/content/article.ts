import { Request, Response } from 'express';

export default {
  'GET /sino-system/article/list': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send(
        JSON.stringify({
          code: 200,
          success: true,
          data: [
            {
              id: '123',
            },
          ],
          msg: '操作成功',
          ts: 1651217135304,
        }),
      );
    }, 1000);
  },
  'POST /sino-system/article/submit': (req: Request, res: Response) => {
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
  'POST /sino-system/article/remove': (req: Request, res: Response) => {
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
};
