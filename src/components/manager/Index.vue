<template>
  <el-container id="admin-body">
    <el-header style="z-index: 1;height: 80px;margin-left: -20px">
      <Header style="position: absolute;width: 98%;"></Header>
    </el-header>
    <!--<el-row style="height: 100%;">-->
    <el-container>
      <el-aside style="height: 112%;margin-top: -80px;width: 250px">
        <admin-menu></admin-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './Header.vue'
import AdminMenu from './NavMenu.vue'
export default {
  name: 'Index',
  components: {Header, AdminMenu}
}
</script>

<style scoped>
  #admin-body {
  height: 95vh;
}
</style>
