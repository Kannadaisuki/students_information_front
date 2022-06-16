<template>
  <TopBar title="学生信息管理"></TopBar>
  <div
      bg-hex-ffffff
      m-10px
      overflow-auto
      text-left
  >
    <el-form
        :model="queryParams"
        :inline="true"
        label-width="68px"
        mt-15px
    >
      <el-form-item label="学号" prop="id">
        <el-input
            v-model="queryParams.id"
            placeholder="请输入学号"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
            v-model="queryParams.name"
            placeholder="请输入姓名"
            clearable
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button
            type="primary"
            @click="handleQuery"
            w-65px
        ><i i-carbon-search></i>搜索
        </el-button
        >
        <el-button
            @click="resetQuery"
            w-65px
        ><i i-carbon-reset></i>重置
        </el-button
        >
      </el-form-item>
    </el-form>
    <el-button
        type="primary"
        plain
        size="mini"
        @click="handleAdd"
        ml-30px
    ><i i-carbon-add></i>新增
    </el-button
    >
    <el-button
        type="success"
        plain
        size="mini"
        :disabled="single"
        @click="handleEdit"
    ><i i-carbon-edit></i>修改
    </el-button
    >
    <el-popconfirm
        confirm-button-text="Yes"
        cancel-button-text="No"
        icon-color="#626AEF"
        title="Are you sure to delete this?"
        @confirm="handleDelete"
    >
      <template #reference>
        <el-button
            type="danger"
            plain
            size="mini"
            :disabled="multiple"
            @click="confirmDelete"
        ><i i-ic-baseline-delete-outline></i>删除
        </el-button
        >
      </template>
    </el-popconfirm>
    <el-table
        v-loading="loading"
        :data="stuInfos.value"
        @selection-change="handleSelectionChange"
    >
      <el-table-column
          type="selection"
          width="50"
          align="center"
      />
      <el-table-column
          label="学号"
          align="center"
          key="id"
          prop="student_id"
          v-if="columns[0].visible"
      />
      <el-table-column
          label="姓名"
          align="center"
          key="name"
          prop="student_name"
          v-if="columns[1].visible"
          :show-overflow-tooltip="true"
      />
      <el-table-column
          label="性别"
          align="center"
          key="sex"
          prop="sex"
          v-if="columns[2].visible"
      />
      <el-table-column
          label="学院"
          align="center"
          key="dept"
          prop="s_dept.dept_name"
          v-if="columns[3].visible"
          width="250"
      />
      <el-table-column
          label="班级"
          align="center"
          key="class"
          prop="s_class.class_name"
          v-if="columns[4].visible"
          width="250"
      />
      <el-table-column
          label="操作"
          align="center"
          width="160"
          class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-button
              size="mini"
              type="text"
              @click="handleEdit(scope.row)"
          ><i i-carbon-edit></i>修改
          </el-button>
          <el-popconfirm
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="handleDelete(scope.row)"
          >
            <template #reference>
              <el-button
                  size="mini"
                  type="text"
              ><i i-ic-baseline-delete-outline></i>删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        v-model:currentPage="queryParams.pageNum"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        :hide-on-single-page="true"
        @size-change="getList"
        @current-change="getList"
        justify-center
        mt-10px
    />

  <!--  学生信息添加框  -->
    <el-dialog
      v-model="isAdding"
      :title="title"
      append-to-body="true"
    >

    </el-dialog>
  </div>
</template>

<script setup>
import {deleteStu, stuInfoList} from "../../utils/api"
// 加载标志
let loading = ref(true)
// 新增学生信息标志
let isAdding = ref(true)
//选中数组
let ids = reactive({
  value: []
})
// 非单个禁用
let single = ref(true)
// 非多个禁用
let multiple = ref(true)
// 学生信息列表
let stuInfos = reactive({
  value: []
})
// 信息总数
let total = ref(0)
// 新增或修改对话框标题
let title = ref('')
// 查询参数
let queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  id: undefined
})
// 列信息
let columns = reactive([
  {
    key: 0,
    value: '学号',
    visible: true
  },
  {
    key: 1,
    value: '姓名',
    visible: true
  },
  {
    key: 2,
    value: '性别',
    visible: true
  },
  {
    key: 3,
    value: '学院',
    visible: true
  },
  {
    key: 4,
    value: '班级',
    visible: true
  }
])
// 查询学生信息列表
const getList = data => {
  loading.value = true
  stuInfoList(queryParams).then(value => {
    stuInfos.value = value.data.data
    console.log(value)
    total.value = value.data.total
    loading.value = false
  })
}
// 重置表单信息
const reset = () => {
  queryParams.pageNum = 1
  queryParams.name = undefined
  queryParams.id = undefined
}
// 多选框选中数据
const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.student_id)
  single.value = selection.length !== 1
  multiple.value = !selection.length
}
// 搜索按钮操作
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}
// 重置按钮操作
const resetQuery = () => {
  reset()
  handleQuery()
}
// 增加按钮操作
const handleAdd = () => {
  reset()
}
// 修改按钮操作
const handleEdit = (row) => {
  reset()
}
// 删除按钮操作
const handleDelete = (row) => {
  if(row.hasOwnProperty('student_id')){
    deleteStu({ids: [row.student_id]}).then(value => {
      reset()
      getList()
    })
  }else{
    deleteStu({ids: ids.value}).then(value => {
      reset()
      getList()
    })
  }

}
getList()
</script>

<style scoped>

</style>
