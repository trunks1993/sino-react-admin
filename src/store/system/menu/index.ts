import produce from 'immer';
import { MenuState } from '@/models/system/menu';
import { Response } from '@/models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, getListSuccessAction, getListFailAction, MenuAction } from './actions';
import { fetchList } from '@/service/system/menu';
import { Menu } from '@/models/frame';

const initialState: MenuState = {
  loading: false,
  queryParams: {},
  list: []
};

const reducer = (state = initialState, action: MenuAction) => produce(state, draft => {
  const { type } = action;
  switch (type) {
    case ActionType.List:
      draft.loading = true;
      break;
    case ActionType.ListSuccess:
      draft.loading = false;
      draft.list = action.payload as Menu[];
      break;
    case ActionType.ListFail:
      draft.loading = false;
      break;
    case ActionType.QueryParams:
      draft.queryParams = action.payload;
      break;
  }
});

// 异步调用api
function* getList(action: MenuAction) {
  const [success, data]:Response<Menu[]> = yield call(fetchList, action.payload);
  if (!success) {
    yield put(getListFailAction());
    return;
  }
  yield put(getListSuccessAction(data || []));
}

// 此模块的saga处理函数
function* saga() {
  yield all([
    takeLatest(ActionType.List, getList),
  ]);
}

export { reducer, saga };
