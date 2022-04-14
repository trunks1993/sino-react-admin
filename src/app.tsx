/*
 * @Author: wangzhijian
 * @Date: 2022-04-10 03:51:12
 * @LastEditTime: 2022-04-12 01:53:33
 */
import React, { useEffect } from 'react';
import Test from '@/components/Test';
import axios from 'axios';

export default () => {
  
  useEffect(() => {
    axios({
      method: 'POST',
      url: '/some/path'
    })
  }, [])

  return <Test />
};
