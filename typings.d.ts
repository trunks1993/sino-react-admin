/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 04:33:18
 * @LastEditTime: 2022-04-19 00:02:39
 */
declare module '*.less' {
  const style: any;
  export default style;
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
