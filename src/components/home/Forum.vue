<template>
  <div>
    <el-container style="height: 80vh">
      <el-aside>
        <el-menu
          :default-active="currentPath"
          text-color="black"
          active-text-color="#409EFF"
          style="height: 100%"
          router>
          <el-menu-item index="/forum">
            <i class="el-icon-menu"></i>
            <span slot="title">浏览帖子</span>
          </el-menu-item>
          <el-menu-item index="/forum/release">
            <i class="el-icon-edit"></i>
            <span slot="title">发布帖子</span>
          </el-menu-item>
          <el-menu-item index="/forum/myposts">
            <i class="el-icon-tickets"></i>
            <span slot="title">我的发帖</span>
          </el-menu-item>
          <el-menu-item index="/forum/file">
            <i class="el-icon-folder-opened"></i>
            <span slot="title">我的共享文件</span>
          </el-menu-item>
          <el-menu-item index="/forum/info">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  computed: {
    currentPath () {
      return this.$route.path
    }
  }
}
</script>
