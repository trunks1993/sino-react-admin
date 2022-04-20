/*
 * @Author: wangzhijian
 * @Date: 2022-04-20 00:42:02
 * @LastEditTime: 2022-04-20 10:06:17
 */
import { existsSync, writeFileSync, readdirSync } from 'fs';
import  { join } from 'path';
import mkdirp from 'mkdirp';
import signale from 'signale';

(async () => {
  // const args = yParser(process.argv);
  const [binPath, cwdPath, ...pageNames] = process.argv;

  if (!pageNames.length) {
    // pageNames.push('newPage');
    return signale.error('please type the page name.');
  }

  pageNames.map(async name => {

    const indexPath = join(__dirname, '../src/pages', name, 'index.tsx');
    const _name = name.replace(name[0], name[0].toUpperCase())
    
    if (!existsSync(indexPath)) {
      await mkdirp(join(indexPath, '..'));
      writeFileSync(indexPath, 
  `
  import React from 'react';
  import { useDispatch } from "react-redux";
  import { getLoginAction, getLogoutAction } from '@/store/login/actions';
  
  interface ${_name}Props {
    name: string;
  }
  
  const ${_name}: React.FC<${_name}Props> = ({ name }) => {
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(getLogoutAction());
    }
  
    const handleLogin = () => {
      dispatch(getLoginAction({ username: 'admin', password: '123'}));
    }
    
    return <div>
      <button onClick={handleLogin}>登录{name}</button>
      <button onClick={handleLogout}>退出</button>
    </div> ;
  }
  
  export default ${_name};
  `
  );
    }
  })

})();
