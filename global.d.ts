/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 04:33:18
 * @LastEditTime: 2022-04-20 11:49:24
 */
import { compose } from 'redux';

declare module '*.less' {
  const style: any;
  export default style;
}

declare module 'mkdirp';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
