<template>
  <div>
    <el-container :class="fixed == true ? 'header' : ''">
      <el-header>
        <el-row>
          <el-col :span="7" style="margin: 15px 20px 0 20px">
            <a href="/index">
              <img src="../../assets/img/main.png" alt="" width="55px" style="float: left;margin-top: -5px;">
            </a>
            <span style="font-size: 32px;font-weight: bold;position:absolute;left: 100px;color:rgb(192,192,192)">公司内部信息平台</span>
          </el-col>
          <el-col :span="7" style="margin: 0 20px 0 20px">
            <search></search>
          </el-col>
          <el-col :span="7" style="margin: 0 20px 0 20px">
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
    width: 100%;
    position: fixed;
    z-index: 9999;
  }
</style>
