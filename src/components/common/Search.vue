<template>
  <div style="margin: 20px auto">
    <el-input placeholder="请输入内容" v-model="input" class="searchClass">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      input: ''
    }
  }
}
</script>
<style scoped>
  .searchClass{
    border: #c5c5c5;
    border-radius: 50px;
    background: #f4f4f4;
  }
</style>
