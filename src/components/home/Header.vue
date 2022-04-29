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
          <el-col :span="6" style="margin: 0 40px 10px 50px">
            <search
              ref="search"
              @onNewsRes="setNewsRes"
              @onAnnoRes="setAnnoRes"
              @onResearchRes="setResearchRes"></search>
          </el-col>
          <el-col :span="8" style="margin: 0 20px">
            <nav-menu></nav-menu>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-switch-button" v-on:click="logout" style="font-size: 30px;float: right;margin: 20px 0;color:rgb(150,150,150)"></i>
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
      fixed: false,
      newsRes: [],
      annoRes: [],
      researchRes: []
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
    },
    setNewsRes () {
      this.newsRes = this.$refs.search.newsRes
      this.$emit('onNewsRes')
    },
    setAnnoRes () {
      this.annoRes = this.$refs.search.annoRes
      this.$emit('onAnnoRes')
    },
    setResearchRes () {
      this.researchRes = this.$refs.search.researchRes
      this.$emit('onResearchRes')
    },
    logout () {
      var _this = this
      _this.$store.commit('general_logout')
      _this.$router.replace('/login')
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
