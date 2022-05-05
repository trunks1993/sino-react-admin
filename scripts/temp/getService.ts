export default (moduleName: string, name: string) => {
  const _name = name.replace(name[0], name[0].toUpperCase());

  return `import request from '@/utils/request';
import { ${_name}, QueryParams, RemoveParams } from '@/models/${moduleName}/${name}';

export const fetchList = (params: QueryParams) => request('/sino-system/${name}/list', {
  method: 'GET',
  params
});

export const submit = (data: ${_name}) => request('/sino-system/${name}/submit', {
  method: 'POST',
  data
});

export const remove = (params: RemoveParams) => request('/sino-system/${name}/remove', {
  method: 'POST',
  params
});
`;
};
