/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:20:50
 * @LastEditTime: 2022-04-23 21:36:28
 */
import { combineReducers } from 'redux';

import { reducer as frameState } from './frame';
import { reducer as systemMenuState } from './system/menu';

const rootReducer = combineReducers({
  frameState,
  systemMenuState,
});

export default rootReducer;
