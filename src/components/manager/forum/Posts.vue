<template>
  <div>
    <el-dialog
    :visible.sync="detailDialog"
    title="帖子详情">
    <div class="articles-area">
      <el-card style="text-align: left;">
        <div>
          <div class="markdown-body">
            <div v-html="detailPosts.contentHtml"></div>
          </div>
        </div>
      </el-card>
    </div>
  </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      title="反馈未通过审核理由">
      <el-form ref="form" :model="selectedPosts" label-width="80px">
        <el-form-item label="审核反馈">
          <el-input v-model="selectedPosts.checkInfo" type="textarea" :rows="5" placeholder="请输入审核未通过理由"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addCheckInfo">提交</el-button>
      </div>
     </el-dialog>
    <el-card>
      <el-table
        :data="posts.slice((currentPage - 1)*pageSize,currentPage*pageSize)"
        fit="false"
        stripe>
        <el-table-column prop="title" label="帖子标题" align="center" :show-overflow-tooltip="true">
        </el-table-column>

        <el-table-column prop="releaseName" label="发布人" align="center">
        </el-table-column>

        <el-table-column prop="date"  label="发布日期" align="center">
        </el-table-column>

        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
              <el-switch
                @change="update(scope.row)"
                v-model="scope.row.state"
                active-color="#13ce66"
                active-text="发布"
                inactive-text="未审核">
              </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button @click="setDetailPosts(scope.row)" size="mini" type="primary" plain round>查看</el-button>
            <el-button @click="deletePosts(scope.row)" size="mini" type="danger" plain round>删除</el-button>
          </template>
        </el-table-column>

        <el-table-column label="审核意见" align="center">
          <template slot-scope="scope">
            <el-button @click="setSelectedPosts(scope.row)" :disabled="scope.row.state" size="mini" type="primary" plain round>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div>
      <el-pagination
        style="margin: 20px;text-align: center"
        background
        @current-change="currentChange"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total, prev, pager, next , jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      posts: [],
      currentPage: 1,
      pageSize: 5,
      total: 1,
      dialogVisible: false,
      detailDialog: false,
      selectedPosts: {},
      detailPosts: {}
    }
  },
  mounted () {
    this.findAllPosts()
  },
  methods: {
    addCheckInfo () {
      this.$axios
        .put('/admin/posts-check-info', {
          id: this.selectedPosts.id,
          checkName: this.$store.state.username,
          checkInfo: this.selectedPosts.checkInfo
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('审核意见反馈成功')
            this.dialogVisible = false
          }
        })
    },
    setDetailPosts (thisPosts) {
      this.detailDialog = true
      this.detailPosts = thisPosts
    },
    setSelectedPosts (thisPosts) {
      this.dialogVisible = true
      this.selectedPosts = thisPosts
    },
    findAllPosts () {
      this.$axios
        .get('/admin/posts')
        .then(result => {
          if (result.data.code === 200) {
            this.posts = result.data.data
            this.total = result.data.data.length
          }
        })
    },
    update (thisPosts) {
      this.$axios
        .put('/admin/post', {
          id: thisPosts.id,
          state: thisPosts.state,
          checkName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('状态更新成功！')
          }
        })
    },
    deletePosts (thisPosts) {
      this.$confirm('此操作将永久删除该帖子及其评论！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/admin/post', {
              id: thisPosts.id
            })
            .then(result => {
              if (result.data.code === 200) {
                this.$message.success('删除成功！')
                this.reload()
              }
            })
        })
        .catch(() => {
          this.$message.info('已取消删除！')
        })
    },
    currentChange (page) {
      this.currentPage = page
    }
  }
}
</script>
<style scoped>
  @import "../../../style/markdown.css"
</style>
