export interface LoginParams {
  username: string;
  password: string;
  code: string;
  uuid: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

export interface LoginResultModel {
  token: string;
  user: GetUserInfoModel;
}

export interface GetUserInfoModel {
  authorities: AuthorityModel[];
  dataScopes: [];
  roles: string[];
  user: UserModel;
}

export interface UserModel {
  avatarName: string;
  avatarPath: string;
  createTime: string;
  dept: object;
  email: string;
  enabled: boolean;
  gender: string;
  id: string | number;
  isAdmin: boolean;
  jobs: object[];
  nickName: string;
  password: string;
  phone: string;
  pwdResetTime: string;
  roles: object[];
  updateBy: string;
  updateTime: string;
  username: string;
  homePath: string;
}

export interface AuthorityModel {
  authority: string;
}
