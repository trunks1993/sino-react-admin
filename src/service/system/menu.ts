import { Menu } from '@/models/frame';
import { QueryParams, RemoveParams } from '@/models/system/menu';
import request from '@/utils/request';

export const fetchList = (params: QueryParams) => request('/sino-system/menu/list', {
  method: 'GET',
  params
});

export const submit = (data: Menu) => request('/sino-system/menu/submit', {
  method: 'POST',
  data
});

export const remove = (params: RemoveParams) => request('/sino-system/menu/remove', {
  method: 'POST',
  params
});
