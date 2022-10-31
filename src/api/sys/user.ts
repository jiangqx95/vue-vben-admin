import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/auth/getUserInfo',
  GetPermCode = '/auth/getPermCode',
  TestRetry = '/testRetry',
  GetVerificationCode = '/auth/getVerificationCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: 'http://localhost:8000' + Api.Login,
      params,
      timeout: 15000
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getVerificationCode() {
  return defHttp.get(
    { url: 'http://localhost:8000' + Api.GetVerificationCode },
    { errorMessageMode: 'none' },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>(
    { url: 'http://localhost:8000' + Api.GetUserInfo },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: 'http://localhost:8000' + Api.GetPermCode });
}

export function doLogout() {
  return defHttp.delete({ url: 'http://localhost:8000' + Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
