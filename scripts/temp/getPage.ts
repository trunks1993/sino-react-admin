/*
 * @Author: wangzhijian
 * @Date: 2022-04-22 20:51:24
 * @LastEditTime: 2022-04-23 14:34:38
 */
export default (name: string) => {
  const _name = name.replace(name[0], name[0].toUpperCase());

  return `import React from 'react';

interface ${_name}Props {
  name?: string;
}

const ${_name}: React.FC<${_name}Props> = ({ name }) => {

  return <div>${_name}</div> ;
};

export default ${_name};
`;
};
