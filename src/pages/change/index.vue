<template>
  <TopBar title="学籍异动管理"></TopBar>
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
        <el-button
          type="danger"
          plain
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >
          <i i-ic-baseline-delete-outline></i>删除
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="changeInfos.value"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
        align="center"
      />
      <el-table-column
        label="异动编号"
        align="center"
        key="changeId"
        prop="change_id"
        v-if="columns[0].visible"
      />
      <el-table-column
        label="学号"
        align="center"
        key="studenId"
        prop="student_id"
        v-if="columns[1].visible"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="姓名"
        align="center"
        key="name"
        prop="student.student_name"
        v-if="columns[2].visible"
      />
      <el-table-column
        label="异动类型"
        align="center"
        key="type"
        prop="s_change_codes.c_description"
        v-if="columns[3].visible"
      />
      <el-table-column
        label="备注"
        align="center"
        key="description"
        prop="description"
        v-if="columns[4].visible"
      />
      <el-table-column
        label="创建时间"
        align="center"
        key="createTime"
        prop="rec_time"
        v-if="columns[4].visible"
      />
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
  </div>
</template>

<script setup>

import {changeInfoList, deleteChange, deleteReward, rewardInfoList} from "../../utils/api";
// 加载标志
const loading = ref(false)
// 选中数组
const ids = reactive({
  value: []
})
// 奖励信息列表
const changeInfos = reactive({
  value: []
})
// 非多个禁用
const multiple = ref(true)
// 信息总数
const total = ref(0)
// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  id: undefined
})
// 列信息
const columns = reactive([
  {
    key: 0,
    value: '异动编号',
    visible: true
  },
  {
    key: 1,
    value: '学号',
    visible: true
  },
  {
    key: 2,
    value: '姓名',
    visible: true
  },
  {
    key: 3,
    value: '移动类型',
    visible: true
  },
  {
    key: 4,
    value: '异动描述',
    visible: true
  },
  {
    key: 5,
    value: '创建时间',
    visible: true
  }
])
// 查询奖励信息列表
const getList = () => {
  loading.value = true
  changeInfoList(queryParams).then(value => {
    changeInfos.value = value.data.data
    console.log(changeInfos)
    total.value = value.data.total
    loading.value = false
  })
}
// 多选框选中数据
const handleSelectionChange = (selection) => {
  ids.value = selection.map(item => item.change_id)
  multiple.value = !selection.length
}
// 搜索按钮操作
const handleQuery = () => {
  queryParams.pageNum = 1
  getList()
}
// 重置表单信息
const resetQuery = () => {
  queryParams.pageNum = 1
  queryParams.name = undefined
  queryParams.id = undefined
  getList()
}
// 删除按钮操作
const handleDelete = () => {
  ElMessageBox.confirm(
    '是否确认删除所选学籍异动信息？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteChange({ids: ids.value}).then(value => {
        if(value.data === ids.value.length){
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
        }else{
          ElMessage({
            type: 'error',
            message: '删除失败'
          })
        }
        resetQuery()
      })
    })
}
getList()
</script>

<style scoped>

</style>
