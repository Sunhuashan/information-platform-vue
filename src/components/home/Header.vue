<template>
  <div style="padding: 0 0 20px 0;">
    <el-container :class="fixed == true ? 'header' : ''">
      <el-header>
        <el-row>
          <el-col :span="6" style="margin: 15px 0">
            <a href="/index">
              <img src="../../assets/img/main.png" alt="" width="50px" style="float: left;">
            </a>
            <span style="font-size: 32px;font-weight: bold;position:absolute;left: 70px;color:rgb(150,150,150)">公司内部信息平台</span>
          </el-col>
          <el-col :span="7" style="margin: 0 40px 10px 50px">
            <search></search>
          </el-col>
          <el-col :span="8" style="margin: 0 20px">
            <nav-menu></nav-menu>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
  </div>
</template>
<script>
import NavMenu from '../common/NavMenu.vue'
import Search from '../common/Search.vue'
export default {
  components: { NavMenu, Search },
  name: 'Header',
  data () {
    return {
      fixed: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.setHeight)
  },
  methods: {
    setHeight () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 1) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    }
  }
}
</script>
<style scoped>
  .header{
    width: 99%;
    position: fixed;
    z-index: 9999;
  }
</style>
