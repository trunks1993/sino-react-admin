import { Role, QueryParams, RemoveParams, AuthGrantParams } from '@/models/system/role';
import request from '@/utils/request';

export const fetchList = (params: QueryParams) => request('/sino-system/role/list', {
  method: 'GET',
  params
});

export const submit = (data: Role) => request('/sino-system/role/submit', {
  method: 'POST',
  data
});

export const remove = (params: RemoveParams) => request('/sino-system/role/remove', {
  method: 'POST',
  params
});

export const fetchAuthMenuKeys = (params: { roleIds: string }) => request('/sino-system/menu/role-tree-keys', {
  method: 'GET',
  params
});

export const grant = (data: AuthGrantParams) => request('/sino-system/role/grant', {
  method: 'POST',
  data: {
    ...data,
    apiScopeIds: [],
    dataScopeIds: [],
  }
});
