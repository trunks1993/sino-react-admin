/*
 * @Author: wangzhijian
 * @Date: 2022-04-17 22:07:35
 * @LastEditTime: 2022-04-18 15:23:53
 */
import { Response, Request } from 'express';
export default {
  '/api/a11': { a: 1234 },
  '/api/users/:userId': { a: 1 },
  'POST /base/login': { a: 1 },
  '/api/b': (req: Request, res: Response) => {
    res.end(JSON.stringify({ b: 1 }));
  },
}
