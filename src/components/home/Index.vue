<template>
  <div>
    <Header></Header>
    <el-container>
      <el-main style="height: calc(100vh + 2000px)"></el-main>
    </el-container>
  </div>
</template>
<script>
import Header from '../home/Header.vue'
export default {
  components: { Header },
  name: 'Index'
}
</script>
<style scoped>

</style>
