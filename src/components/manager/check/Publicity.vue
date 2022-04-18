<template>
  <div>
    <el-card>
      <el-table
        stripe
        :data="publicity.slice((currentPage-1)*pageSize,(currentPage*pageSize))">
        <el-table-column label="宣传类型" prop="pubType" align="center"></el-table-column>
        <el-table-column label="描述" :show-overflow-tooltip="true" prop="pubDescribe" align="center"></el-table-column>
        <el-table-column label="发布者" prop="pubReleaseName" align="center"></el-table-column>
        <el-table-column label="发布日期" prop="pubDate" align="center"></el-table-column>
        <el-table-column label="查看宣传内容" align="center">
          <div slot-scope="scope">
            <el-link :href="scope.row.pubPath" type="primary">
              查看<i class="el-icon-view el-icon--right"></i>
            </el-link>
          </div>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="update(scope.row)"
              v-model="scope.row.pubState"
              active-color="#13ce66"
              active-text="发布"
              inactive-text="未审核">
            </el-switch>
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
  name: 'CheckPublicity',
  data () {
    return {
      publicity: [],
      pageSize: 5,
      currentPage: 1,
      total: 1,
      selectedPublicity: {}
    }
  },
  mounted () {
    this.findPublicity()
  },
  methods: {
    findPublicity () {
      let _this = this
      _this.$axios
        .get('/admin/findAllPublicty')
        .then(result => {
          if (result.data.code === 200) {
            _this.publicity = result.data.data
            _this.total = result.data.data.length
          }
        })
    },
    currentChange (page) {
      this.currentPage = page
    },
    update (publicity) {
      this.$axios
        .post('/admin/updatePublicityState', {
          id: publicity.id,
          pubState: publicity.pubState,
          pubCheckName: this.$store.state.username
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
