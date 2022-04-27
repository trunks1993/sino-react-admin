import { Menu } from '../frame';

export interface QueryParams {
  code?: string;
  name?: string;
}

export interface MenuState {
  loading: boolean;
  queryParams: QueryParams;
  list: Menu[];
}
