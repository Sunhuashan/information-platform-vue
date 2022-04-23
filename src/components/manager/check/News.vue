<template>
  <div>
    <el-card>
      <el-table
        stripe
        :data="news.slice((currentPage-1)*pageSize,(currentPage*pageSize))">
        <el-table-column label="新闻标题" prop="newsTitle" align="center"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="新闻作者" prop="newsReleaseName" align="center"></el-table-column>
        <el-table-column label="发布日期" prop="newsDate" align="center"></el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
              <el-switch
                @change="update(scope.row)"
                v-model="scope.row.newsState"
                active-color="#13ce66"
                active-text="发布"
                inactive-text="未审核">
              </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              @click="detail(scope.row)"
              type="primary"
              round
              icon="el-icon-view"
              size="mini">
              查看
            </el-button>
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
    <news-detail
      :dialogVisible="dialogVisible"
      :contentHtml="selectedNews.newsContentHtml">
    </news-detail>
  </div>
</template>
<script>
import NewsDetail from './NewsDetail.vue'
export default {
  components: { NewsDetail },
  name: 'CheckNews',
  data () {
    return {
      news: [],
      pageSize: 5,
      currentPage: 1,
      total: 1,
      dialogVisible: false,
      selectedNews: {}
    }
  },
  mounted () {
    this.findNews()
  },
  methods: {
    findNews () {
      let _this = this
      _this.$axios
        .get('/admin/findNews')
        .then(result => {
          if (result.data.code === 200) {
            _this.news = result.data.data
            _this.total = result.data.data.length
          }
        })
    },
    currentChange (page) {
      this.dialogVisible = false
      this.currentPage = page
    },
    detail (news) {
      this.dialogVisible = true
      this.selectedNews = news
    },
    update (news) {
      this.$axios
        .post('/admin/updateState', {
          id: news.id,
          newsState: news.newsState,
          newsCheckName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('状态更新成功！')
          } else {
            this.$message.warning(result.data.message)
          }
        })
    }
  }
}
</script>
<style scoped>
</style>
