import { QueryParams } from '@/models/system/menu';
import request from '@/utils/request';

export const fetchList = (params: QueryParams) => request('/sino-system/menu/list', {
  method: 'GET',
  params
});
