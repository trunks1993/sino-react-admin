/*
 * @Author: wangzhijian
 * @Date: 2022-04-17 22:07:35
 * @LastEditTime: 2022-04-18 02:29:22
 */
import { Response, Request } from 'express';
export default {
  '/api/a1': { a: 1234 },
  '/api/users/:userId': { a: 1 },
  'POST /base/login': { a: 1 },
  '/api/b': (req: Request, res: Response) => {
    res.end(JSON.stringify({ b: 1 }));
  },
}
