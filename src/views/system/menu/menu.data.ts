import {BasicColumn} from '/@/components/Table';
import {FormSchema} from '/@/components/Table';
import {h} from 'vue';
import {Tag} from 'ant-design-vue';
import {Icon} from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {title: '菜单名称', dataIndex: 'title', align: 'left', width: 150},
  {
    title: '图标', dataIndex: 'icon', width: 50,
    customRender: ({record}) => {
      return h(Icon, {icon: record.icon});
    }
  },
  {
    title: '类型', dataIndex: 'type', width: 80,
    customRender: ({record}) => {
      const color = ['green', 'red', 'blue'];
      const text = ['目录', '菜单', '按钮'];
      return h(Tag, {color: color[record.type]}, () => text[record.type]);
    }
  },
  {title: '权限标识', dataIndex: 'permission', width: 150},
  {title: '组件', dataIndex: 'component', width: 150},
  {title: '排序', dataIndex: 'menuSort', width: 50},
  {
    title: '状态', dataIndex: 'hidden', width: 80,
    customRender: ({record}) => {
      const hidden = record.hidden
      const color = hidden ? 'red' : 'green';
      const text = hidden ? '停用' : '启用';
      return h(Tag, {color: color}, () => text);
    }
  },
  {title: '创建时间', dataIndex: 'createTime', width: 150}
];

export const searchFormSchema: FormSchema[] = [
  {field: 'title', label: '菜单名称', component: 'Input', colProps: {span: 8}},
  {
    field: 'hidden', label: '状态', component: 'Select',
    componentProps: {
      options: [
        {label: '启用', value: false},
        {label: '停用', value: true},
      ],
    },
    colProps: {span: 8},
  },
];


const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const formSchema: FormSchema[] = [
  {field: 'id', label: 'id', show: false, component: 'Input'},
  {
    field: 'type', label: '菜单类型', component: 'RadioButtonGroup', defaultValue: 0,
    componentProps: {
      options: [
        {label: '目录', value: 0},
        {label: '菜单', value: 1},
        {label: '按钮', value: 2},
      ],
    },
    colProps: {lg: 24, md: 24},
  },
  {field: 'title', label: '菜单名称', component: 'Input', required: true},
  {
    field: 'pid', label: '上级菜单', component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {field: 'menuSort', label: '排序', component: 'InputNumber', required: true},
  {
    field: 'icon', label: '图标', component: 'IconPicker', required: true,
    show: ({values}) => !isButton(values.type),
  },
  {
    field: 'path', label: '路由地址', component: 'Input', required: true,
    show: ({values}) => !isButton(values.type),
  },
  {
    field: 'component', label: '组件路径', component: 'Input',
    show: ({values}) => isMenu(values.type),
  },
  {
    field: 'permission', label: '权限标识', component: 'Input',
    show: ({values}) => !isDir(values.type),
  },
  {
    field: 'hidden', label: '状态', component: 'RadioButtonGroup', defaultValue: false,
    componentProps: {
      options: [
        {label: '启用', value: false},
        {label: '禁用', value: true},
      ],
    },
  },
  {
    field: 'iFrame', label: '是否外链', component: 'RadioButtonGroup', defaultValue: false,
    componentProps: {
      options: [
        {label: '否', value: false},
        {label: '是', value: true},
      ],
    },
    show: ({values}) => !isButton(values.type),
  },
  {
    field: 'cache', label: '是否缓存', component: 'RadioButtonGroup', defaultValue: false,
    componentProps: {
      options: [
        {label: '否', value: false},
        {label: '是', value: true},
      ],
    },
    show: ({values}) => isMenu(values.type),
  },
  {
    field: 'hidden', label: '是否显示', component: 'RadioButtonGroup', defaultValue: false,
    componentProps: {
      options: [
        {label: '是', value: false},
        {label: '否', value: true},
      ],
    },
    show: ({values}) => !isButton(values.type),
  },
];
