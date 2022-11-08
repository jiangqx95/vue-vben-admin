import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {h} from 'vue';
import {Tag} from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {title: '部门名称', dataIndex: 'name', width: 160, align: 'left'},
  {title: '排序', dataIndex: 'deptSort', width: 50},
  {
    title: '状态', dataIndex: 'enabled', width: 80,
    customRender: ({record}) => {
      const enable = record.enabled
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, {color: color}, () => text);
    }
  },
  {title: '创建时间', dataIndex: 'createTime', width: 180}
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name', label: '部门名称', component: 'Input', colProps: {span: 8}
  },
  {
    field: 'enabled', label: '状态', component: 'Select',
    componentProps: {
      options: [
        {label: '启用', value: true},
        {label: '停用', value: false},
      ],
    },
    colProps: {span: 8}
  }
];

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentDept',
    label: '上级部门',
    component: 'TreeSelect',

    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        {label: '启用', value: '0'},
        {label: '停用', value: '1'},
      ],
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
