/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 06:05:36
 * @LastEditTime: 2022-04-10 19:01:49
 */
export default {
  'POST /baseApi/syss/loginss': (req, res) => {
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
  'POST /baseApi/sys/getUser2': (req, res) => {
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
  'POST /baseApi/sys/getUse1r': (req, res) => {
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