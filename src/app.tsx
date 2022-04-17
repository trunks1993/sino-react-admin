/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 03:51:12
 * @LastEditTime: 2022-04-17 22:27:14
 */
import React, { useEffect } from 'react';
import Test from '@/components/Test';
import axios from 'axios';

export default () => {
  
  useEffect(() => {
    axios({
      method: 'POST',
      url: '/api/base/login'
    })
  }, [])

  return <Test />
};
