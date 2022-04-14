/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 16:07:07
 * @LastEditTime: 2022-04-11 11:55:35
 */
import { Response, Request } from 'express';

export default {
  'POST /baseApi/sys/test64': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: '0',
        result: {
          token: 1,
          realname: '测试名字',
          headIcon:
            '/data/brand/202004/fae975dc4be64c9d8e9bf1467fc65d8a_2_1.png',
        },
        success: true,
      });
    }, 2000);
  },
  'POST /baseApi/sys/yyyyyyy': (req: Request, res: Response) => {
    setTimeout(() => {
      res.send({
        code: '0',
        result: {
          token: 1,
          realname: '测试名字',
          headIcon:
            '/data/brand/202004/fae975dc4be64c9d8e9bf1467fc65d8a_2_1.png',
        },
        success: true,
      });
    }, 2000);
  },
};
