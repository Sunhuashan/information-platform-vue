<template>
  <div style="margin: 20px auto">
    <el-input placeholder="请输入内容" v-model="input" class="searchClass">
      <div slot="prepend">
        <div class="centerClass">
          <el-select v-model="select" placeholder="选择" style="width: 80px">
            <el-option label="新闻" value="1"></el-option>
            <el-option label="公告" value="2"></el-option>
            <el-option label="科研" value="3"></el-option>
          </el-select>
        </div>
        <div class="centerClass">
          <div class="line"></div>
        </div>
      </div>
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>
<script>
import Bus from '../../bus.js'
export default {
  data () {
    return {
      input: '',
      select: '',
      newsRes: [],
      annoRes: [],
      researchRes: []
    }
  },
  methods: {
    search () {
      if (this.input === '') {
        alert('请输入搜索内容!')
      } else if (this.select === '') {
        alert('请先选择搜索内容!')
      } else if (this.select === '1') {
        this.searchNews()
      } else if (this.select === '2') {
        this.searchAnno()
      } else if (this.select === '3') {
        this.searchResearch()
      }
    },
    searchNews () {
      this.$axios
        .post('/home/searchNews', {
          content: this.input
        })
        .then(result => {
          if (result.data.code === 200) {
            this.newsRes = result.data.data
            this.$emit('onNewsRes')
            Bus.$emit('newsRes', this.newsRes)
            this.$router.replace('/news/result')
          } else {
            this.$router.replace('/empty')
          }
        })
    },
    searchAnno () {
      this.$axios
        .post('/home/searchAnno', {
          content: this.input
        })
        .then(result => {
          if (result.data.code === 200) {
            this.annoRes = result.data.data
            this.$emit('onAnnoRes')
            Bus.$emit('annoRes', this.annoRes)
            this.$router.replace('/announcement/result')
          } else {
            this.$router.replace('/empty')
          }
        })
    },
    searchResearch () {
      this.$axios
        .post('/home/searchResearch', {
          content: this.input
        })
        .then(result => {
          if (result.data.code === 200) {
            this.researchRes = result.data.data
            this.$emit('onResearchRes')
            Bus.$emit('researchRes', this.researchRes)
            this.$router.replace('/research/result')
          } else {
            this.$router.replace('/empty')
          }
        })
    }
  }
}
</script>
<style scoped>
    .el-input >>> .el-input__inner {
        background-color: rgba(255, 255, 255, 0.02);
    }
  .searchClass{
    border: #c5c5c5;
    border-radius: 50px;
  }
</style>
