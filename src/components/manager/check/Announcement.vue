<template>
  <div>
    <el-dialog
      :visible.sync="feedbackDialog"
      title="反馈未通过审核理由">
      <el-form ref="form" :model="feedbackAnno" label-width="80px">
        <el-form-item label="审核反馈">
          <el-input v-model="feedbackAnno.checkInfo" type="textarea" :rows="5" placeholder="请输入审核未通过理由"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addFeedback">提交</el-button>
      </div>
    </el-dialog>
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
         <el-table-column label="审核意见" align="center">
          <template slot-scope="scope">
            <el-button
              @click="feedback(scope.row)"
              :disabled="scope.row.annoState"
              size="mini"
              type="primary"
              plain
              round>
              编辑
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
      selectedAnno: {},
      feedbackAnno: {},
      feedbackDialog: false
    }
  },
  mounted () {
    this.findAnno()
  },
  methods: {
    feedback (anno) {
      this.feedbackDialog = true
      this.feedbackAnno = anno
    },
    addFeedback () {
      this.$axios
        .put('/admin/anno-check-info', {
          id: this.feedbackAnno.id,
          checkInfo: this.feedbackAnno.checkInfo,
          annoCheckName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('审核意见反馈成功！')
            this.feedbackDialog = false
          }
        })
    },
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
