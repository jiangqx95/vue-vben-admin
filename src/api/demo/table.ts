import { defHttp } from '/@/utils/http/axios';
import { DemoParams, DemoListGetResultModel } from './model/tableModel';

enum Api {
  DEMO_LIST = '/table/getDemoList',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: 'http://localhost:8000/api/menus/tree',
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  });
