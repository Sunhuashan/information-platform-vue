<template>
 <el-dialog
    :visible.sync="dialogVisible"
    title="新闻详情">
    <div class="articles-area">
      <el-card style="text-align: left;">
        <div>
          <div class="markdown-body">
            <div v-html="contentHtml"></div>
          </div>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: Boolean,
    contentHtml: String
  }
}
</script>
<style scoped>
  @import "../../../style/markdown.css"
</style>
