import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';

export const columns: BasicColumn[] = [
  {title: '角色名称', dataIndex: 'name', width: 150},
  {title: '数据权限', dataIndex: 'dataScope', width: 180},
  {title: '角色级别', dataIndex: 'level', width: 100},
  {title: '描述', dataIndex: 'description', width: 180},
  {title: '创建时间', dataIndex: 'createTime', width: 180}
];

export const searchFormSchema: FormSchema[] = [
  {field: 'name', label: '角色名称', component: 'Input', colProps: {span: 8}}
];

export const formSchema: FormSchema[] = [
  {field: 'name', label: '角色名称', required: true, component: 'Input'},
  {
    field: 'level', label: '角色级别', component: 'InputNumber', required: true, defaultValue: 3,
    componentProps: {
      max: 10,
      min: 1
    }
  },
  {
    field: 'scopeType', label: '数据范围', component: 'Select', defaultValue: '全部',
    componentProps: {
      options: [
        {label: '全部', value: '全部'},
        {label: '本级', value: '本级'},
        {label: '自定义', value: '自定义'}
      ],
    }
  },
  {
    field: 'dataScope', label: '数据权限', component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {field: 'description', label: '描述', component: 'InputTextArea'}
];
