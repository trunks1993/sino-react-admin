import React, { useEffect } from 'react';
import PlusForm from '@/components/PlusForm';
import { ConnectState } from '@/models';
import { QueryParams } from '@/models/system/menu';
import { getListAction } from '@/store/system/menu/actions';
import { map } from 'lodash-es';
import { useDispatch, useSelector } from 'react-redux';

const Menu: React.FC = () => {

  const queryParams = useSelector(({ systemMenuState }: ConnectState) => systemMenuState.queryParams);
  const list = useSelector(({ systemMenuState }: ConnectState) => systemMenuState.list);

  const handleFilter = (value: QueryParams) => {
    console.log(value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListAction());
  }, []);

  return (
    <div className="page-container">
      <PlusForm.QueryForm<QueryParams> formSource={queryParams} collapse onFilter={handleFilter}>
        <PlusForm.FormItemInputText name="name" label="姓名" placeholder="请输入" />
        <PlusForm.FormItemInputText name="code" label="菜单编号" placeholder="请输入" />
      </PlusForm.QueryForm>
      {
        map(list, item => <>{item.name}</>)
      }
    </div>
  );
};

export default Menu;
