<template>
  <div>
    <el-container :class="fixed == true ? 'header' : ''">
      <el-header>
        <nav-menu></nav-menu>
      </el-header>
    </el-container>
  </div>
</template>
<script>
import NavMenu from '../common/NavMenu.vue'
export default {
  components: { NavMenu },
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
    position: fixed;
    z-index: 9999;
  }
</style>
