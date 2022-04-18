<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="科研信息详情">
      <el-form :model="selectedResearch" label-width="100px">
        <el-form-item label="科研信息类型">
          <el-input v-model="selectedResearch.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="科研信息详情">
          <el-input v-model="selectedResearch.content" type="textarea" disabled rows="6"></el-input>        </el-form-item>
      </el-form>
    </el-dialog>
    <el-card>
      <el-table
        stripe
        :data="research.slice((currentPage-1)*pageSize,(currentPage*pageSize))">
        <el-table-column label="科研信息类型" prop="type" align="center"></el-table-column>
        <el-table-column label="发布者" prop="releaseName" align="center"></el-table-column>
        <el-table-column label="发布日期" prop="date" align="center"></el-table-column>
        <el-table-column label="查看科研信息" align="center">
          <div slot-scope="scope">
            <el-button
              @click="setSelected(scope.row)"
              type="primary"
              size="mini"
              round>
              查看<i class="el-icon-view el-icon--right"></i>
            </el-button>
          </div>
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
  name: 'CheckResearch',
  data () {
    return {
      research: [],
      pageSize: 5,
      currentPage: 1,
      total: 1,
      selectedResearch: {},
      dialogVisible: false
    }
  },
  mounted () {
    this.findResearch()
  },
  methods: {
    findResearch () {
      let _this = this
      _this.$axios
        .get('/admin/findAllResearch')
        .then(result => {
          if (result.data.code === 200) {
            _this.research = result.data.data
            _this.total = result.data.data.length
          }
        })
    },
    currentChange (page) {
      this.currentPage = page
    },
    update (research) {
      this.$axios
        .post('/admin/updateResearchState', {
          id: research.id,
          state: research.state,
          checkName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('状态更新成功！')
          } else {
            this.$message.warning(result.data.message)
          }
        })
    },
    setSelected (research) {
      this.selectedResearch = research
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>
</style>
