/*
 * @Author: wangzhijian
 * @Date: 2022-04-19 00:04:20
 * @LastEditTime: 2022-04-19 01:10:36
 */
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'GET_POSTS', payload: {usename: 'admin', password: '123'} });
  })
  
  return <div>login</div> ;
}
