<template>
  <div
    w-200px
    h-screen
    fixed
    left-60px
    p-15px
    box-border
  >
    <div
      w-170px
      h-35px
      pt-15px
      text-center
    >
      <img
        src="./image/keda.83d5a1de.png" alt="keda"
        w-130px
      >
    </div>
    <el-menu
      :default-active="da"
      :router="true"
      text-color="#333"
    >
      <el-menu-item index="/">
        <i i-carbon-menu/>
        &nbsp;&nbsp;首页
      </el-menu-item>
      <el-menu-item index="/stuInfo">
        <i i-carbon-menu/>
        &nbsp;&nbsp;学生信息管理
      </el-menu-item>
      <el-menu-item index="/reward">
        <i i-carbon-menu/>
        &nbsp;&nbsp;奖励管理
      </el-menu-item>
      <el-menu-item index="/punishment">
        <i i-carbon-menu/>
        &nbsp;&nbsp;惩罚管理
      </el-menu-item>
      <el-menu-item index="/change">
        <i i-carbon-menu/>
        &nbsp;&nbsp;学籍异动管理
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
const router = useRouter()
let da = ref(router.currentRoute.value.path)
</script>

<style scoped>
li {
  padding: 5px !important;
}

ul {
  border: 0 !important;
}
</style>

