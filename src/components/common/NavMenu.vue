<template>
    <el-menu
      :default-active="currentPath"
      router
      mode="horizontal"
      background-color="transparent"
      text-color="rgb(150,150,150)">
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        {{ item.navItem }}
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/news', navItem: '新闻'},
        {name: '/announcement', navItem: '公告'},
        {name: '/research', navItem: '科研'},
        {name: '/product', navItem: '产品'},
        {name: '/forum', navItem: '论坛'}
      ]
    }
  },
  computed: {
    currentPath () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
</style>
