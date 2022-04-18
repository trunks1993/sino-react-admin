/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 03:51:12
 * @LastEditTime: 2022-04-18 10:23:11
 */
import React, { useEffect } from 'react';
import Test from '@/components/Test';
import request from '@/utils/request';

export default () => {
  
  useEffect(() => {
    request('/base/login', { method: 'POST' })
  }, [])

  return <Test />
};
