export default (name: string) =>{
const _name = name.replace(name[0], name[0].toUpperCase())

 return `import React from 'react';
import { useDispatch } from "react-redux";
import { getLoginAction, getLogoutAction } from '@/store/login/actions';

interface ${_name}Props {
  name?: string;
}

const ${_name}: React.FC<${_name}Props> = ({ name }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(getLogoutAction());
  }

  const handleLogin = () => {
    dispatch(getLoginAction({ username: 'admin', password: '123'}));
  }
  
  return <div>${_name}</div> ;
}

export default ${_name};
`
}