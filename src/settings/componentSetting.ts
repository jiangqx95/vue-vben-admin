// Used to configure the general configuration of some components without modifying the components
// 用于配置部分组件的通用配置，无需对组件进行修改

import type { SorterResult } from '../components/Table';

export default {
  // basic-table setting
  // 基本表格设置
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    fetchSetting: {
      // The field name of the current page passed to the background
      pageField: 'page',
      // The number field name of each page displayed in the background
      sizeField: 'pageSize',
      // Field name of the form data returned by the interface
      listField: 'items',
      // Total number of tables returned by the interface field name
      totalField: 'total',
    },
    // Number of pages that can be selected
    pageSizeOptions: ['10', '50', '80', '100'],
    // Default display quantity on one page
    defaultPageSize: 10,
    // Default Size
    defaultSize: 'middle',
    // Custom general sort function
    // 自定义一般排序函数
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      if (field && order) {
        return {
          // The sort field passed to the backend you
          // 排序字段传递给后端
          field,
          // Sorting method passed to the background asc/desc
          // 排序方法传递给后台asc/desc
          order,
        };
      } else {
        return {};
      }
    },
    // Custom general filter function
    // 自定义通用过滤器功能
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return data;
    },
  },
  // scrollbar setting
  // 滚动条设置
  scrollbar: {
    // Whether to use native scroll bar
    // 是否使用本机滚动条
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    // 打开后，菜单、模式、抽屉将改变弹出滚动条为本机
    native: false,
  },
};
