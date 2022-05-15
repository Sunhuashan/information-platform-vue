<template>
  <div>
    <el-dialog
      :before-close="beforeClose"
      :visible.sync="modifyDialog"
      title="修改科研信息">
      <el-form :model="selectedResearch">
        <el-form-item label="科研信息" label-width="100px">
          <el-input type="textarea" rows="5" v-model="selectedResearch.content"></el-input>
        </el-form-item>
        <el-form-item label="科研信息类型" label-width="100px">
          <el-select v-model="selectedResearch.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">更新</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="addDialog"
      title="添加新的科研信息">
      <el-form :model="tobeAddResearch">
        <el-form-item label="科研信息内容" label-width="100px">
          <el-input type="textarea" rows="5" v-model="tobeAddResearch.content"  placeholder="请输入科研信息内容"></el-input>
        </el-form-item>
        <el-form-item label="科研信息类型" label-width="100px">
          <el-select v-model="tobeAddResearch.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addResearch">发布</el-button>
        <el-button @click="clean" >取消</el-button>
      </div>
    </el-dialog>
    <el-card>
      <el-table :data="reseach.slice((currentPage - 1)*pageSize , (currentPage*pageSize))">
        <el-table-column label="科研信息类型" prop="type" align="center" ></el-table-column>
        <el-table-column label="科研信息内容" prop="content" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="科研信息发布日期" prop="date" align="center"></el-table-column>
        <el-table-column label="状态" prop="state" align="center" :formatter="fomatBoolean"></el-table-column>
        <el-table-column label="意见" prop="checkInfo" align="center" :show-overflow-tooltip="true" width="70px">
        </el-table-column>
        <el-table-column label="审核人" prop="checkName" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="190px">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.state"
              round
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="setSelectedResearch(scope.row)">
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
      <el-col :span="19">
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
      <el-col :span="4" >
        <div style="margin: 19px;">
            <el-button
            type="primary"
            size="medium"
            round
            @click="addDialog = true">
            发布科研信息<i class="el-icon-edit-outline el-icon--right"></i></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  name: 'Research',
  data () {
    return {
      options: [{
        value: '论文',
        label: '论文'
      }, {
        value: '发明专利',
        label: '发明专利'
      }, {
        value: '获奖信息',
        label: '获奖信息'
      }],
      reseach: [],
      currentPage: 1,
      pageSize: 5,
      total: 1,
      addDialog: false,
      tobeAddResearch: {
        content: '',
        type: ''
      },
      modifyDialog: false,
      selectedResearch: {}
    }
  },
  mounted () {
    this.findAllResearch()
  },
  methods: {
    findAllResearch () {
      this.$axios
        .post('/admin/findAllResearchById', {
          releaseName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.reseach = result.data.data
            this.total = result.data.data.length
          }
        })
    },
    fomatBoolean (row, column, cellValue, index) {
      let state = ''
      if (cellValue === false) {
        state = '待审核'
      } else {
        state = '已发布'
      }
      return state
    },
    flash () {
      this.reload()
    },
    currentChange (page) {
      this.currentPage = page
    },
    preConfirm (reseach) {
      this.$confirm('此操作将永久删除该科研信息，是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.deleteResearch(reseach)
        })
        .catch(() => {
          this.$message({
            message: '已取消删除',
            type: 'info'
          })
        })
    },
    deleteResearch (reseach) {
      this.$axios
        .post('/admin/deleteResearch', {
          id: reseach.id
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('删除成功!')
            this.flash()
          } else {
            this.$message.warning('删除失败!')
          }
        })
    },
    addResearch () {
      if (this.tobeAddResearch.type === '') {
        this.$message.warning('请输入科研信息!')
      } else if (this.tobeAddResearch.content === '') {
        this.$message.warning('请选择科研信息类型！')
      } else {
        this.$axios
          .post('/admin/addResearch', {
            releaseName: this.$store.state.username,
            content: this.tobeAddResearch.content,
            type: this.tobeAddResearch.type
          })
          .then(reslut => {
            if (reslut.data.code === 200) {
              this.$message.success('发布成功!')
              this.flash()
            } else {
              this.$message.warning('发布失败!')
            }
          })
      }
    },
    clean () {
      this.tobeAddResearch = {}
      this.addDialog = false
    },
    setSelectedResearch (anno) {
      this.selectedResearch = anno
      this.modifyDialog = true
    },
    beforeClose () {
      this.$confirm('当前修改尚未保存，是否保存？', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否'
      })
        .then(() => {
          this.update()
        })
        .catch(() => {
          this.modifyDialog = false
          this.flash()
          this.$message({
            message: '已取消保存',
            type: 'info'
          })
        })
    },
    update () {
      this.$axios
        .post('/admin/updateResearch', {
          id: this.selectedResearch.id,
          content: this.selectedResearch.content,
          type: this.selectedResearch.type,
          releaseId: this.selectedResearch.releaseId
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('更新成功')
            this.modifyDialog = false
          }
        })
    }
  }
}
</script>
