import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  getMenuListResultModel
} from './model/systemModel';
import {defHttp} from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/api/dept',
  setRoleStatus = '/system/setRoleStatus',

  Menu = '/api/menus',
  MenuBuild = '/api/menus/build',
  MenuList = '/api/menus/tree',
  MenuListAll = '/api/menus/treeAll',

  Role = '/api/roles',
  RolePageList = '/api/roles/all',

  GetAllRoleList = '/system/getAllRoleList',
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({url: Api.AccountList, params});

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({url: 'http://localhost:8000' + Api.DeptList, params});

export const menuBuild = () =>
  defHttp.get<getMenuListResultModel>({url: 'http://localhost:8000' + Api.MenuBuild});

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({url: 'http://localhost:8000' + Api.MenuList, params});

export const getMenuListAll = (params) =>
  defHttp.get<MenuListGetResultModel>({url: 'http://localhost:8000' + Api.MenuListAll, params});

export const updateMenu = (params?: MenuParams) =>
  defHttp.put<MenuListGetResultModel>({url: 'http://localhost:8000' + Api.Menu, params});

export const deleteMenu = (params?: string[]) =>
  defHttp.delete<MenuListGetResultModel>({url: 'http://localhost:8000' + Api.Menu, params});

export const addMenu = (params?: MenuParams) =>
  defHttp.post<MenuListGetResultModel>({url: 'http://localhost:8000' + Api.Menu, params});

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({url: 'http://localhost:8000' + Api.RolePageList, params});

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({url: Api.GetAllRoleList, params});

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({url: Api.setRoleStatus, params: {id, status}});

export const isAccountExist = (account: string) =>
  defHttp.post({url: Api.IsAccountExist, params: {account}}, {errorMessageMode: 'none'});
