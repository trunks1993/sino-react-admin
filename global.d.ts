import { compose } from 'redux';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

declare module '*.less';

declare module 'mkdirp';

declare module '*.svg';
