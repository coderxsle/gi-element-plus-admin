<script setup lang="ts">
import { GiForm, GiPageLayout, GiTable } from 'gi-component'
import type { FormColumnItem, TableColumnItem } from 'gi-component'
import { getStudentListApi, createStudentApi, updateStudentApi, deleteStudentApi, getStudentDetailApi } from '@/apis/student'
import { ElMessage, ElMessageBox } from 'element-plus'
import { appConfig } from '@/config'

defineOptions({ name: 'Crud' })

const queryForm = reactive({
  name: '',
})

const formColumns: FormColumnItem[] = [
  { field: 'name', label: '姓名', type: 'input' },
]

const tableColumns: TableColumnItem[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名' },
  { prop: 'student_no', label: '学号' },
  { prop: 'gender', label: '性别' },
  { prop: 'age', label: '年龄' },
  { prop: 'phone', label: '电话' },
  {
    prop: 'action',
    label: '操作',
    width: 180,
    fixed: 'right',
    slotName: 'action',
  },
]

const loading = ref(false)
const tableData = ref<any[]>([])
const total = ref(0)
const pagination = reactive({ page: 1, pageSize: appConfig.pageSize })

const dialogVisible = ref(false)
const isEdit = ref(false)
const currentId = ref<number>()

const formRef = ref()
const formData = reactive({
  name: '',
  student_no: '',
  gender: '',
  age: '',
  phone: '',
  email: '',
  address: '',
})

const formRules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
}

const dialogFormColumns: FormColumnItem[] = [
  { field: 'name', label: '姓名', type: 'input' },
  { field: 'student_no', label: '学号', type: 'input' },
  {
    field: 'gender',
    label: '性别',
    type: 'select',
    options: [
      { label: '男', value: '男' },
      { label: '女', value: '女' },
    ],
  },
  { field: 'age', label: '年龄', type: 'input' },
  { field: 'phone', label: '电话', type: 'input' },
  { field: 'email', label: '邮箱', type: 'input' },
  { field: 'address', label: '地址', type: 'input' },
]

async function fetchData() {
  loading.value = true
  try {
    const res = await getStudentListApi({ page: pagination.page, page_size: pagination.pageSize, name: queryForm.name || undefined })
    tableData.value = res.items
    total.value = res.total
  }
  finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.page = 1
  fetchData()
}

function handleReset() {
  queryForm.name = ''
  handleSearch()
}

function handlePageChange(page: number) {
  pagination.page = page
  fetchData()
}

function handleSizeChange(pageSize: number) {
  pagination.pageSize = pageSize
  handleSearch()
}

function handleAdd() {
  isEdit.value = false
  Object.assign(formData, { name: '', student_no: '', gender: '', age: '', phone: '', email: '', address: '' })
  dialogVisible.value = true
}

async function handleEdit(row: any) {
  isEdit.value = true
  currentId.value = row.id
  const res = await getStudentDetailApi(row.id)
  Object.assign(formData, res)
  dialogVisible.value = true
}

async function handleDelete(row: any) {
  await ElMessageBox.confirm('确定要删除该学生吗？', '提示', { type: 'warning' })
  await deleteStudentApi(row.id)
  ElMessage.success('删除成功')
  fetchData()
}

async function handleSubmit() {
  await formRef.value?.validate()
  if (isEdit.value && currentId.value) {
    await updateStudentApi(currentId.value, formData)
    ElMessage.success('更新成功')
  }
  else {
    await createStudentApi(formData)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  fetchData()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <GiPageLayout class="page-container">
    <template #header>
      <GiForm
        v-model="queryForm"
        :columns="formColumns"
        search
        @search="handleSearch"
        @reset="handleReset"
      />
    </template>

    <GiTable
      :data="tableData"
      :columns="tableColumns"
      :loading="loading"
      row-key="id"
    >
      <template #toolbar>
        <el-button type="primary" @click="handleAdd">
          新增
        </el-button>
      </template>
      <template #action="{ row }">
        <el-button type="primary" link @click="handleEdit(row)">
          编辑
        </el-button>
        <el-button type="danger" link @click="handleDelete(row)">
          删除
        </el-button>
      </template>
    </GiTable>

    <div class="crud__pagination">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="total"
        :page-sizes="appConfig.pageSizes"
        layout="total, sizes, prev, pager, next"
        background
        @change="fetchData"
      />
    </div>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑学生' : '新增学生'" width="600px">
      <GiForm
        ref="formRef"
        v-model="formData"
        :columns="dialogFormColumns"
        :rules="formRules"
        label-width="80px"
      />
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </GiPageLayout>
</template>

<style lang="scss" scoped>
.crud__pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
</style>