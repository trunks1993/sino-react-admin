enum MenuCategory {
  parent = 1,
  child,
}
export interface FrameState {
  loadingGlobal: boolean;
  loadingAuthMenu: boolean;
  siderCollapsed: boolean;
  authInfo: AuthInfo;
  authMenu: Menu[];
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface AuthInfo {
  access_token?: string;
  account?: string;
  account_id?: string;
  account_type?: string;
  app_id?: string;
  avatar_url?: string;
  client_id?: string;
  client_scope?: string;
  client_type?: string;
  employee_sn?: string;
  employee_worknum?: string;
  expires_in?: number;
  guid?: string;
  im_account?: string;
  mch_code?: string;
  mch_id?: string;
  nick_name?: string;
  oauth_id?: string;
  object_id?: string;
  org_guid?: string;
  org_id?: string;
  post_id?: string;
  real_name?: string;
  refresh_token?: string;
  role_id?: string;
  role_name?: string;
  scope?: string;
  sign_account?: string;
  tenant_id?: string;
  tenant_ids?: string;
}

export interface Menu {
  id?: string;
  name?: string;
  source?: string;
  path?: string;
  category?: MenuCategory.parent | MenuCategory.child;
  hasChildren?: boolean;
  parentId?: string;
  children?: Menu[];
}
