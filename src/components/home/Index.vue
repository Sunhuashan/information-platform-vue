<template>
  <div>
    <div>
      <Header></Header>
    </div>
      <el-container>
        <el-main style="height: calc(100vh + 2000px)">
        </el-main>
      </el-container>
</div>
</template>
<script>
import Search from '../common/Search.vue'
import Header from '../home/Header.vue'
export default {
  components: { Header, Search },
  name: 'Index'
}
</script>
<style scoped>

</style>
