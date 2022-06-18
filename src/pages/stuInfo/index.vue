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
      @click="handleAdd(ruleFormRef)"
      ml-30px
    >
      <i i-carbon-add></i>新增
    </el-button>
    <el-button
      type="success"
      plain
      size="mini"
      :disabled="single"
      @click="handleEdit"
    >
      <i i-carbon-edit></i>修改
    </el-button>
    <el-button
      type="danger"
      plain
      size="mini"
      :disabled="multiple"
      @click="handleDelete"
    >
      <i i-ic-baseline-delete-outline></i>删除
    </el-button>
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
        width="250"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          &nbsp;&nbsp;
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          ><i i-carbon-edit></i>修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleAddReward(scope.row)"
          ><i i-fluent-reward-16-filled></i>新增奖励
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          ><i i-ic-round-gpp-bad></i>新增处罚
          </el-button><el-button
          size="mini"
          type="text"
          @click="handleDelete(scope.row)"
        ><i i-ic-baseline-delete-outline></i>删除
        </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          ><i i-carbon-order-details></i>详细信息
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleAddChange(scope.row)"
          ><i i-raphael-exchange></i>学籍异动
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

    <!--  学生信息添加(修改)框  -->
    <el-dialog
      v-model="showDialog"
      :title="title"
      append-to-body
      @open="openDialog"
      @close="closeDialog"
    >
      <el-form
        ref="ruleFormRef"
        :model="newStuInfo"
        :rules="rules"
        status-icon
        label-width="auto"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="姓名:" prop="name">
              <el-input
                v-model="newStuInfo.name"
                type="text"
                autocomplete="off"
                :readonly="isEditing"
                placeholder="请填写姓名"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="学号:" prop="id">
              <el-input
                v-model.number="newStuInfo.id"
                type="text"
                autocomplete="off"
                :readonly="isEditing"
                placeholder="请填写学号"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="性别:" prop="sex">
          <el-select v-model="newStuInfo.sex" placeholder="请选择">
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院:" prop="deptName">
          <el-select v-model="newStuInfo.deptName" placeholder="请选择" @change="changeDept">
            <el-option v-for="(dept, index) in depts" :value="dept" :key="index">{{ dept }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级:" prop="className">
          <el-select v-model="newStuInfo.className" placeholder="请选择">
            <el-option v-for="(className, index) in classes" :value="className" :key="index">{{ className }}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日:" prop="birthday">
          <el-date-picker
            v-model="newStuInfo.birthday"
            type="date"
            placeholder="选择一个日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="家庭住址:" prop="place">
          <el-input
            type="text"
            v-model="newStuInfo.place"
            autocomplete="off"
            placeholder="请填写家庭住址"
          />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="commit(ruleFormRef)"
        >确认</el-button>
          <el-button @click="isAdding = false; isEditing = false">取消</el-button>
      </span>
      </template>
    </el-dialog>
  </div>

  <!-- 奖励新增框 -->
  <el-dialog
    v-model="isAddingReward"
    title="新增学生奖励信息"
    @close="closeDialog"
  >
    <el-form
      :model="newRewardInfo"
      label-width="auto"
      label-position="top"
      :rules="rules"
      ref="rewardFormRef"
    >
      <el-form-item label="奖励等级:" prop="levels">
        <el-select v-model="newRewardInfo.levels" placeholder="请选择">
          <el-option
            v-for="(item, index) in ['校特等奖学金', '校一等奖学金', '校二等奖学金', '校三等奖学金', '院一等奖学金', '院二等奖学金', '院三等奖学金']"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="description">
        <el-input v-model="newRewardInfo.description" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="addRew(rewardFormRef)"
        >
          确认
        </el-button>
        <el-button @click="isAddingReward = false">取消</el-button>

      </span>
    </template>
  </el-dialog>

  <!-- 学籍异动新增框 -->
  <el-dialog
    v-model="isAddingChange"
    title="新增学生奖励信息"
    @close="closeDialog"
  >
    <el-form
      :model="newChangeInfo"
      label-width="auto"
      label-position="top"
      :rules="rules"
      ref="changeFormRef"
    >
      <el-form-item label="异动类型:" prop="type">
        <el-select v-model="newChangeInfo.type" placeholder="请选择">
          <el-option
            v-for="(item, index) in ['转系', '休学', '复学', '退休', '毕业']"
            :key="index"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注:" prop="description">
        <el-input v-model="newChangeInfo.description" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="addCha(changeFormRef)"
        >
          确认
        </el-button>
        <el-button @click="isAddingChange = false">取消</el-button>

      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  addChange,
  addReward,
  addStu,
  deleteStu,
  editStuInfo,
  getClassByDept,
  getDept,
  stuInfoList
} from "../../utils/api"
// 加载标志
const loading = ref(false)
// 修改学生信息标志
const isEditing = ref(false)
// 新增学生信息标志
const isAdding = ref(false)
// 新增奖励信息标志
const isAddingReward = ref(false)
// 新增学籍异动信息标志
const isAddingChange = ref(false)
// 选中数组
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
// 触发查询
const ruleFormRef = ref()
const rewardFormRef = ref()
const changeFormRef = ref()
// 查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  name: undefined,
  id: undefined
})
// 新增学生信息
const newStuInfo = reactive({
  name: undefined,
  id: undefined,
  sex: undefined,
  deptName: undefined,
  className: undefined,
  birthday: undefined,
  place: undefined
})
// 新增奖励信息
const newRewardInfo = reactive({
  id: undefined,
  levels: undefined,
  description: undefined
})
// 新增学籍异动信息
const newChangeInfo = reactive({
  id: undefined,
  type: undefined,
  description: undefined
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
// 学院列表
const depts = reactive([])
// 班级列表
const classes = reactive([])
// 表单校验
const rules = reactive({
  name: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: ['blur', 'change']
    }
  ],
  id: [
    {
      required: true,
      message: '学号不能为空',
      trigger: ['blur', 'change']
    },
    {
      type: 'integer',
      min: 1000000000,
      max: 9999999999,
      message: '学号必须为10位整数',
      trigger: ['blur', 'change']
    }
  ],
  sex: [
    {
      required: true,
      message: '性别不能为空',
      trigger: ['blur', 'change']
    }
  ],
  deptName: [
    {
      required: true,
      message: '学院不能为空',
      trigger: ['blur', 'change']
    },
  ],
  className: [
    {
      required: true,
      message: '班级不能为空',
      trigger: ['blur', 'change']
    },
  ],
  birthday: [
    {
      required: true,
      message: '生日不能为空',
      trigger: ['blur', 'change']
    },
  ],
  place: [
    {
      required: true,
      message: '家庭住址不能为空',
      trigger: ['blur', 'change']
    },
  ],
  levels: [
    {
      required: true,
      message: '奖励等级不能为空',
      trigger: ['blur', 'change']
    }
  ],
  type: [
    {
      required: true,
      message: '异动类型不能为空',
      trigger: ['blur', 'change']
    }
  ]
})
// 是否展示添加（修改）框
const showDialog = computed(() => {
  return isAdding.value || isEditing.value
})
// 查询学生信息列表
const getList = () => {
  loading.value = true
  stuInfoList(queryParams).then(value => {
    stuInfos.value = value.data.data
    console.log(value)
    total.value = value.data.total
    loading.value = false
  })
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
// 重置表单信息
const resetQuery = () => {
  queryParams.pageNum = 1
  queryParams.name = undefined
  queryParams.id = undefined
  getList()
}
// 增加按钮操作
const handleAdd = (formEl) => {
  // resetNewStuInfo()
  if(formEl !== undefined){
    formEl.resetFields()
  }
  isAdding.value = true
  title.value = '新增学生信息'
}
// 增加操作
const commit = async (formEl) => {
  if(!formEl) return
  if(isAdding.value){
    await formEl.validate((valid, fields) => {
      if (valid) {
        addStu(newStuInfo).then(value => {
          if (value.data === 1) {
            ElMessage({
              message: '添加成功',
              type: 'success',
            })
          } else {
            ElMessage({
              message: '学生已存在，添加失败',
              type: 'error',
            })
          }
          isAdding.value = false
          resetQuery()
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }else{
    await formEl.validate((valid, fields) => {
      if (valid) {
        editStuInfo(newStuInfo).then(value => {
          if (value.data === 1) {
            ElMessage({
              message: '修改成功',
              type: 'success',
            })
          } else {
            ElMessage({
              message: '修改失败',
              type: 'error',
            })
          }
          isEditing.value = false
          resetQuery()
        })
      } else {
        console.log('error submit!', fields)
      }
    })
  }
}
// 修改按钮操作
const handleEdit = (row) => {
  title.value = '修改学生信息'
  isEditing.value = true
  let student
  if(row.hasOwnProperty('student_id')){
    student = row
  }else{
    stuInfos.value.forEach(item => {
      if(item.student_id === ids.value[0]){
        student = item
      }
    })
  }
  newStuInfo.name = student.student_name
  newStuInfo.id = student.student_id
  newStuInfo.sex = student.sex
  newStuInfo.deptName = student.s_dept.dept_name
  newStuInfo.className = student.s_class.class_name
  newStuInfo.birthday = student.birthday
  newStuInfo.place = student.native_place
}
// 删除按钮操作
const handleDelete = (row) => {
  ElMessageBox.confirm(
    '是否确认删除所选学生信息？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      if (row.hasOwnProperty('student_id')) {
        deletes.value = [row.student_id]
      } else {
        deletes.value = ids.value
      }
      deleteStu({ids: deletes.value}).then(value => {
        if(value.data === deletes.value.length){
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
// 增加奖励按钮操作
const handleAddReward = (row) => {
  isAddingReward.value = true
  newRewardInfo.id = row.student_id
}
// 增加奖励操作
const addRew = async (formEl) => {
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addReward(newRewardInfo).then(value => {
        if (value.data === 1) {
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '学生已存在，添加失败',
            type: 'error',
          })
        }
        isAddingReward.value = false
        resetQuery()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 增加学籍异动按钮操作
const handleAddChange = (row) => {
  isAddingChange.value = true
  newChangeInfo.id = row.student_id
}
// 增加学籍异动操作
const addCha = async (formEl) => {
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(newChangeInfo)
      addChange(newChangeInfo).then(value => {
        if (value.data === 1) {
          ElMessage({
            message: '添加成功',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '学生已存在，添加失败',
            type: 'error',
          })
        }
        isAddingChange.value = false
        resetQuery()
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 打开新增（修改）框
const openDialog = () => {
  if(depts.length !== 0)  return
  getDept().then(value => {
    console.log(value)
    value.data.forEach(item => {
      depts.push(item.dept_name)
    })
  })
}
// 选择学院后获取对应班级
const changeDept = (val) => {
  classes.splice(0, classes.length)
  newStuInfo.className = undefined
  getClassByDept({deptName: val}).then(value => {
    value.data.forEach(item => {
      classes.push(item.class_name)
    })
  })
}
// 关闭新增（修改）框
const closeDialog = () => {
  isAdding.value = false
  isEditing.value = false
  isAddingReward.value = false
  isAddingChange.value = false
}
getList()
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
