<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      fullscreen
      :before-close="beforeClose"
      title="修改你发布的新闻">
      <mavon-editor
        @save="save"
        v-model="selectedNews.newsContentMd">
        <template slot="left-toolbar-after">
          <button
            type="button"
            @click="visible()"
            class="op-icon  el-icon-document"
            aria-hidden="true"
            title="添加标题/封面">
          </button>
        </template>
      </mavon-editor>
    </el-dialog>
    <el-card>
      <el-table
        :stripe="true"
        :data="news.slice((currentPage-1)*pageSize , (currentPage*pageSize))"
        max-height="window.innerHeight - 320"
        style="width: 100%">
        <el-table-column label="新闻标题" prop="newsTitle" align="center"></el-table-column>
        <el-table-column label="发布时间" prop="newsDate" align="center"></el-table-column>
        <el-table-column label="状态" prop="newsState" :formatter="formatBoolean" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
              <el-button
                :disabled="scope.row.newsState"
                @click="setSelectedNews(scope.row)"
                type="primary"
                round
                icon="el-icon-edit"
                size="mini">
                修改
              </el-button>
              <el-button
                @click="preConfirm(scope.row)"
                type="danger"
                round
                icon="el-icon-delete"
                size="mini">
                移除
              </el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="17">
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
      </el-col>
      <el-col :span="7" >
        <div style="margin: 19px;">
          <el-button
            type="primary"
            size="medium"
            round
            @click="upload()">
            直接上传<i class="el-icon-upload el-icon--right"></i>
            </el-button>
            <el-button
            type="success"
            size="medium"
            round
            @click="editNews()">
            在线编辑<i class="el-icon-edit-outline el-icon--right"></i></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'News',
  inject: ['reload'],
  data () {
    return {
      news: [],
      currentPage: 1,
      pageSize: 5,
      total: 1,
      dialogVisible: false,
      selectedNews: {}
    }
  },
  mounted () {
    this.selectAllNews()
  },
  computed: {
    currentManager () {
      return this.$store.state.username
    }
  },
  methods: {
    selectAllNews () {
      let _this = this
      _this.$axios
        .post('/admin/findNewsByName', {
          managerUsername: _this.currentManager
        })
        .then(result => {
          if (result.data.code === 200) {
            _this.news = result.data.data
            _this.total = result.data.data.length
          }
        })
    },
    preConfirm (thisNews) {
      this.$confirm('此操作将永久删除该条新闻, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteNews(thisNews)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteNews (thisNews) {
      let _this = this
      _this.$axios
        .post('/admin/deleteNews', {
          id: thisNews.id
        })
        .then(result => {
          if (result.data.code === 200) {
            _this.successMsg('恭喜你，删除成功！')
            _this.flash()
          } else {
            _this.failMsg('糟糕，出错了！删除失败！')
          }
        })
    },
    formatBoolean (row, column, cellValue, index) {
      let state = ''
      if (cellValue === true) {
        state = '已发布'
      } else {
        state = '待审核'
      }
      return state
    },
    editNews () {
      this.$router.replace('/admin/resource/edit_news')
    },
    successMsg (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    },
    failMsg (msg) {
      this.$message.error(msg)
    },
    flash () {
      this.reload()
    },
    currentChange (page) {
      this.currentPage = page
    },
    setSelectedNews (current) {
      this.dialogVisible = true
      this.selectedNews = current
    },
    beforeClose () {
      this.$confirm('当前修改尚未保存，是否保存？', '提示', {
        confirmButtonText: '保存',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.dialogVisible = false
        })
        .catch(() => {
          this.dialogVisible = false
          this.flash()
        })
    }
  }
}
</script>
