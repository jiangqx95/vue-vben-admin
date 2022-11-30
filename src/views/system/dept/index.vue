<template>
  <div>
    <BasicTable @register="registerTable" @expand="expandCustomRow">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门
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
    <DeptModal @register="registerModal"
               @success="handleSuccess"/>
  </div>
</template>
<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';

import {columns, searchFormSchema} from './dept.data';
import {BasicTable, useTable, TableAction} from '/@/components/Table';
import {useModal} from '/@/components/Modal';
import DeptModal from './DeptModal.vue';

// api
import {getDeptList} from '/@/api/system/system';

export default defineComponent({
  name: 'DeptManagement',
  components: {BasicTable, DeptModal, TableAction},
  setup() {

    onMounted(() => {
      const a = getData(null);
      console.log(a);
      zidataSource.value =a
    })

    const zidataSource = ref([]);

    const [registerModal, {openModal}] = useModal();
    const [registerTable, {reload}] = useTable({
      title: '部门列表',
      // api: (param) => getDeptList(param),
      dataSource: zidataSource,
      columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      pagination: false,
      isTreeTable: true,
      childrenColumnName: 'hasChildren',
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

    function expandCustomRow(expanded, record) {
      if (!expanded) {
        return
      }
      const res = getData(record.id);
      if (res.code === '0') {
        const children = res.result.items || []
        // children.forEach((opt) => {
        //   // 如果children为空 不显示展开icon
        //   try {
        //     if (opt.children.length === 0) {
        //       delete opt.children
        //     }
        //   } catch (err) {}
        // })
        // 如果数据有children字段，就不需要下面这句
        // children.forEach((item) => {
        //   item.children = []
        // })
        const dataSourceMap = (items) => {
          items.find((item) => {
            if (item.id === id) {
              //找到当前要展开的节点
              item.children = children
              return items
            }
            if (item.children && item.children.length > 0) {
              dataSourceMap(item.children)
            }
          })
        }
        const data = zidataSource.value;
        dataSourceMap(data || [])
        zidataSource.value = data
        console.log(zidataSource.value);
      }
    }

     async function getData(pid: string) {
      return await getDeptList({pid: pid})
    }

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record: Recordable) {
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDelete(record: Recordable) {
      console.log(record);
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      getData,
      expandCustomRow
    };
  },
});
</script>
