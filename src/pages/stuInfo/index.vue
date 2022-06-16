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
    <el-button
        type="danger"
        plain
        size="mini"
        :disabled="multiple"
        @click="handleDelete"
    ><i i-ic-baseline-delete-outline></i>删除
    </el-button
    >
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
          <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.row)"
          ><i i-ic-baseline-delete-outline></i>删除
          </el-button>
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
      append-to-body
    >
      <template #footer>
        <span class="dialog-footer">
          <el-button
              type="primary"
              @click="add"
          >确认</el-button>
          <el-button @click="isAdding = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <!--  确认删除框  -->
    <el-dialog
        v-model="isDeleting"
        title="提示"
        width="30%"
        append-to-body
    >
      <span>是否确认删除所选学生信息？</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button
            type="primary"
            @click="del"
        >确认</el-button>
        <el-button @click="isDeleting = false">取消</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {addStu, deleteStu, stuInfoList} from "../../utils/api"
// 加载标志
const loading = ref(true)
// 新增学生信息标志
const isAdding = ref(false)
// 删除学生信息标志
const isDeleting = ref(false)
//选中数组
const ids = reactive({
  value: []
})
// 删除学号列表
const deletes = reactive({
  value: []
})
// 非单个禁用
const single = ref(true)
// 非多个禁用
const multiple = ref(true)
// 学生信息列表
const stuInfos = reactive({
  value: []
})
// 信息总数
const total = ref(0)
// 新增或修改对话框标题
const title = ref('')
// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  id: undefined
})
// 新增学生信息
// const newStuInfo = reactive({
//   name: undefined,
//   id: undefined,
//   sex: undefined,
//   dept: undefined,
//   classId: undefined,
//   birthday: undefined,
//   place: undefined
// })
const newStuInfo = reactive({
  name: '吴嘉瑜',
  id: 2001010207,
  sex: '男',
  dept: 5,
  classId: 8,
  birthday: '2002-09-19',
  place: '江西新余'
})
// 列信息
const columns = reactive([
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
  isAdding.value = true
  title.value = '新增学生信息'
}
// 增加操作
const add = () => {
  addStu(newStuInfo).then(value => {
    if(value.data === 1){
      ElMessage({
        message: '添加成功',
        type: 'success',
      })
    }else{
      ElMessage({
        message: '学生已存在，添加失败',
        type: 'error',
      })
    }
    isAdding.value = false
  })
}
// 修改按钮操作
const handleEdit = (row) => {
  reset()
}
// 删除按钮操作
const handleDelete = (row) => {
  isDeleting.value = true
  if(row.hasOwnProperty('student_id')){
    deletes.value = [row.student_id]
  }else{
    deletes.value = ids.value
  }
}
// 删除操作
const del = () => {
  deleteStu({ids: deletes.value}).then(value => {
    isDeleting.value = false
    reset()
    getList()
    console.log(value)
  })
}
getList()
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
