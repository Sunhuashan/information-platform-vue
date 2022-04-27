<template>
  <div class="articles-area" style="margin:auto">
      <el-card style="text-align: left;">
        <div>
          <div class="markdown-body">
            <div v-html="news.newsContentHtml"></div>
          </div>
          <div style="float: right">
            编辑人:{{news.newsReleaseName}}
          </div>
          <br>
          <br>
          <div style="float: right">
            审核人:{{news.newsCheckName}}
          </div>
          <br>
          <br>
          <div style="float: right">
            {{news.newsDate}}
          </div>
        </div>
        <br>
        <br>
        <br>
        <br>
      </el-card>
    </div>
</template>
<script>
import Bus from '../../bus.js'
export default {
  data () {
    return {
      news: {}
    }
  },
  created () {
    let _this = this
    Bus.$on('id', (val) => {
      _this.$axios
        .post('/home/findNewsById', {
          id: val
        })
        .then(result => {
          if (result.data.code === 200) {
            _this.news = result.data.data
          }
        })
    })
  }
}
</script>
<style scoped>
  @import "../../style/markdown.css"
</style>
