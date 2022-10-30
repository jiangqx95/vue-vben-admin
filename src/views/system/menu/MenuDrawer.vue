<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm"/>
  </BasicDrawer>
</template>
<script lang="ts">
import {defineComponent, ref, computed, unref} from 'vue';
import {BasicForm, FormSchema, useForm} from '/@/components/Form/index';
import {BasicDrawer, useDrawerInner} from '/@/components/Drawer';

import {getMenuList, updateMenu} from '/@/api/demo/system';

const isDir = (type: number) => type === 0;
const isMenu = (type: number) => type === 1;
const isButton = (type: number) => type === 2;

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    show: false,
    component: 'Input',
    required: true
  },
  {
    field: 'type',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 0,
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
  {field: 'menuSort', label: '排序', component: 'InputNumber', required: true,},
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    show: ({values}) => !isButton(values.type),
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: true,
    show: ({values}) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    show: ({values}) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: '权限标识',
    component: 'Input',
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
    // field: 'isExt', label: '是否外链', component: 'RadioButtonGroup', defaultValue: '0',
    field: 'iframe', label: '是否外链', component: 'RadioButtonGroup', defaultValue: false,
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

export default defineComponent({
  name: 'MenuDrawer', components: {BasicDrawer, BasicForm},
  emits: ['success', 'register'],
  setup(_, {emit}) {

    const isUpdate = ref(true);

    const [registerForm, {resetFields, setFieldsValue, updateSchema, validate}] = useForm({
      labelWidth: 100,
      schemas: formSchema,
      showActionButtonGroup: false,
      baseColProps: {lg: 12, md: 24}
    });

    const [registerDrawer, {setDrawerProps, closeDrawer}] = useDrawerInner(async (data) => {
      await resetFields();

      setDrawerProps({confirmLoading: false});
      isUpdate.value = !!data?.isUpdate;
      if (unref(isUpdate)) {
        await setFieldsValue({
          ...data.record,
        });
      }

      const treeData = await getMenuList();
      await updateSchema({
        field: 'pid',
        componentProps: {treeData},
      });
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({confirmLoading: true});

        await updateMenu(values);

        // TODO custom api
        console.log(values);
        closeDrawer();
        emit('success');
      } finally {
        setDrawerProps({confirmLoading: false});
      }
    }

    return {registerDrawer, registerForm, getTitle, handleSubmit};
  }
});
</script>
