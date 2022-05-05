import request from '@/utils/request';
import { Article, QueryParams, RemoveParams } from '@/models/content/article';

export const fetchList = (params: QueryParams) => request('/sino-system/article/list', {
  method: 'GET',
  params
});

export const submit = (data: Article) => request('/sino-system/article/submit', {
  method: 'POST',
  data
});

export const remove = (params: RemoveParams) => request('/sino-system/article/remove', {
  method: 'POST',
  params
});
