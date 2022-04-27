import { Menu } from '@/models/frame';
import { BaseAction } from '@/store';

export enum ActionType {
  List='system/menu/LIST',
  ListSuccess='system/menu/LIST_SUCCESS',
  ListFail='system/menu/LIST_Fail',
}

export type MenuAction =
    BaseAction<ActionType.List>
  | BaseAction<ActionType.ListSuccess, Menu[]>
  | BaseAction<ActionType.ListFail>

export const getListAction = (): BaseAction<ActionType.List> => ({
  type: ActionType.List,
});

export const getListSuccessAction = (payload: Menu[]): BaseAction<ActionType.ListSuccess, Menu[]> => ({
  type: ActionType.ListSuccess,
  payload
});

export const getListFailAction = (): BaseAction<ActionType.ListFail> => ({
  type: ActionType.ListFail,
});
