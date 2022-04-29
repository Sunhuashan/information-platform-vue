<template>
  <div>
    <el-container style="height: 80vh">
      <el-aside>
        <el-menu
          default-active="/forum"
          style="height: 100%"
          router>
          <el-menu-item index="/forum">
            <i class="el-icon-menu"></i>
            <span slot="title">浏览帖子</span>
          </el-menu-item>
          <el-menu-item index="/forum/release">
            <i class="el-icon-document"></i>
            <span slot="title">发布帖子</span>
          </el-menu-item>
          <el-menu-item index="/forum/info">
            <i class="el-icon-setting"></i>
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
