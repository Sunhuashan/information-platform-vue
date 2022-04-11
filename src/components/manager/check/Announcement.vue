<template>
  <div>
    <el-card>
      <el-table
        stripe
        :data="anno.slice((currentPage-1)*pageSize,(currentPage*pageSize))">
        <el-table-column label="公告内容" :show-overflow-tooltip="true" prop="annoContent" align="center"></el-table-column>
        <el-table-column label="发布者" prop="annoReleaseName" align="center"></el-table-column>
        <el-table-column label="发布日期" prop="annoDate" align="center"></el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
              <el-switch
                @change="update(scope.row)"
                v-model="scope.row.annoState"
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
  name: 'Checkanno',
  data () {
    return {
      anno: [],
      pageSize: 5,
      currentPage: 1,
      total: 1,
      dialogVisible: false,
      selectedAnno: {}
    }
  },
  mounted () {
    this.findAnno()
  },
  methods: {
    findAnno () {
      let _this = this
      _this.$axios
        .get('/admin/findAll')
        .then(result => {
          if (result.data.code === 200) {
            _this.anno = result.data.data
            _this.total = result.data.data.length
          }
        })
    },
    currentChange (page) {
      this.currentPage = page
    },
    update (anno) {
      this.$axios
        .post('/admin/updateAnnoState', {
          id: anno.id,
          annoState: anno.annoState,
          annoCheckName: this.$store.state.username
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
