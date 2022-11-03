<template>
  <div>
    <BasicTable @register="registerTable"
                @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary"
                  @click="handleCreate"> 新增菜单
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"/>
        </template>
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer"
                @success="handleSuccess"/>
  </div>
</template>
<script lang="ts">
import {defineComponent, h, toRaw} from 'vue';

import {BasicTable, useTable, TableAction, BasicColumn, FormSchema} from '/@/components/Table';
import {useDrawer} from '/@/components/Drawer';
import MenuDrawer from './MenuDrawer.vue';
import {Tag} from "ant-design-vue";
import {Icon} from '/@/components/Icon';

// api
import {getMenuListAll, deleteMenu} from '/@/api/system/system';
import {useMessage} from '/@/hooks/web/useMessage';

const {createMessage} = useMessage();

// 列数据
const columns: BasicColumn[] = [
  {title: '菜单名称', dataIndex: 'title', align: 'left'},
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
  {title: '权限标识', dataIndex: 'permission'},
  {title: '组件', dataIndex: 'component'},
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
  {title: '创建时间', dataIndex: 'createTime'}
];

// 搜索表单
const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '菜单名称',
    component: 'Input',
    colProps: {span: 8},
  },
  {
    field: 'hidden',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        {label: '启用', value: false},
        {label: '停用', value: true},
      ],
    },
    colProps: {span: 8},
  },
];

export default defineComponent({
  name: 'MenuManagement',
  components: {BasicTable, MenuDrawer, TableAction},
  setup() {
    const [registerDrawer, {openDrawer}] = useDrawer();
    const [registerTable, {reload}] = useTable({
      title: '菜单列表',
      api: (title, hidden) => getMenuListAll(title, hidden),
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      isTreeTable: true,
      pagination: false,
      striped: false,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      showIndexColumn: false,
      canResize: false,
      actionColumn: {
        width: 80,
        title: '操作',
        dataIndex: 'action',
        // slots: { customRender: 'action' },
        fixed: undefined,
      },
    });

    function handleCreate() {
      openDrawer(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      openDrawer(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDelete(record: Recordable) {
      deleteMenu([toRaw(record).id]).then(() => {
        reload();
        createMessage.success("删除成功");
      });
    }

    function handleSuccess() {
      reload();
    }

    function onFetchSuccess() {
      // 演示默认展开所有表项
      // nextTick(expandAll);
    }

    return {
      registerTable,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      onFetchSuccess,
    };
  },
});
</script>
