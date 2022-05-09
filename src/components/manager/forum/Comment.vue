<template>
  <div>
    <el-card>
      <el-table
        :data="comment.slice((currentPage - 1)*pageSize,currentPage*pageSize)"
        fit="false"
        stripe>
        <el-table-column prop="content" label="评论内容" align="center" :show-overflow-tooltip="true">
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
            <el-button @click="deleteComment(scope.row)" size="mini" type="danger" plain round>删除</el-button>
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
      comment: [],
      currentPage: 1,
      pageSize: 5,
      total: 1
    }
  },
  mounted () {
    this.findAllComment()
  },
  methods: {
    findAllComment () {
      this.$axios
        .get('/admin/comments')
        .then(result => {
          if (result.data.code === 200) {
            this.comment = result.data.data
            this.total = this.comment.length
          }
        })
    },
    update (thisComment) {
      this.$axios
        .put('/admin/comment', {
          id: thisComment.id,
          state: thisComment.state,
          checkName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('状态更新成功！')
          }
        })
    },
    deleteComment (thisComment) {
      this.$confirm('此操作将永久删除该评论！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/admin/delete-comment', {
              id: thisComment.id
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
