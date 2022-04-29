import { Menu } from '@/models/frame';
import { QueryParams } from '@/models/system/menu';
import { BaseAction } from '@/store';

export enum ActionType {
  List='system/menu/LIST',
  ListSuccess='system/menu/LIST_SUCCESS',
  ListFail='system/menu/LIST_Fail',
  QueryParams='system/menu/QUERY_PARAMS',
}

export type MenuAction =
    BaseAction<ActionType.List>
  | BaseAction<ActionType.ListSuccess, Menu[]>
  | BaseAction<ActionType.ListFail>
  | BaseAction<ActionType.QueryParams>


export const getQueryParamsAction = (payload: QueryParams): BaseAction<ActionType.QueryParams, QueryParams> => ({
  type: ActionType.QueryParams,
  payload
});

export const getListAction = (payload: QueryParams): BaseAction<ActionType.List, QueryParams> => ({
  type: ActionType.List,
  payload
});

export const getListSuccessAction = (payload: Menu[]): BaseAction<ActionType.ListSuccess, Menu[]> => ({
  type: ActionType.ListSuccess,
  payload
});

export const getListFailAction = (): BaseAction<ActionType.ListFail> => ({
  type: ActionType.ListFail,
});
