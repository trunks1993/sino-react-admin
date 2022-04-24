import { extend } from 'umi-request';
import { Base64 } from 'js-base64';
import { whiteUrls, AUTH_KEY, getToken, CustomHeader, CLIENT_SECRET, CLIENT_ID, API_LOGIN } from './auth';
import { AppError, AUTH_ERROR, code2Message, HTTP_ERROR, HTTP_SUCCESS, RESPONSE_ERROR } from './appError';
import { notification } from 'antd';

/**
 * 异常处理程序
 */
const errorHandler = (error: Error) => {
  if (error.name === AUTH_ERROR) {
    // 清除token重新登录
    return;
  }

  // 剩下的错误全部弹提示 并返回[false, undefined]
  notification.error({ message: error.message });

  return Promise.resolve([false]);
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // 开发环境下动态切换线上和mock环境
  prefix: process.env.NODE_ENV === 'production' ? process.env.BASE_API : '/api',
  errorHandler, // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
  timeout: 10000,
});

// 拦截器先于中间件执行
request.interceptors.request.use((url, options) => {
  const draft = { url, options };

  const isWhite = whiteUrls.includes(url); // 登录接口需要ClientId, 以此判断是否为登录接口
  const token = getToken();

  // 登录接口需要客户端授权
  if (url === API_LOGIN) (options.headers as CustomHeader).Authorization = `Basic ${Base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`;

  if (!isWhite && token) {
    (options.headers as CustomHeader)[AUTH_KEY] = token;
  }

  return draft;
});

request.interceptors.response.use(async(response: Response): Promise<any> => {
  // 当res能成功解析到后台数据的时候 直接判断code是否为0，
  // 处理例外情况密码错误会返回400，但是res能解析到code data msg
  const res = await response.clone().json().catch(() => {
    // 504 等服务端无正确返回走这里
    // 但是500后端会正确返回解析res, 走下面
    throw new AppError(HTTP_ERROR, response.statusText);
  });


  const { code, data, msg } = res;

  if (data === undefined) throw new AppError(RESPONSE_ERROR, msg || '数据加载出错');

  if (code !== HTTP_SUCCESS) throw new AppError(code2Message[code], msg);

  return [code === HTTP_SUCCESS, data];

});

export default request;
