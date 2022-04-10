/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 03:51:12
 * @LastEditTime: 2022-04-10 18:21:00
 */
import React, { useEffect } from 'react';
import Test from '@/components/Test';
import request from '@/utils/request';

export default () => {
  
  useEffect(() => {
    request(`/baseApi/sys/getUser`, {
      method: 'get',
    }).then(res => {
      console.log(res);
    });
  })

  return <Test />
};
