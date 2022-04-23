<template>
  <div>
    <el-dialog
      :before-close="beforeClose"
      :visible.sync="modifyDialog"
      title="修改公告">
      <el-form :model="selectedAnno">
        <el-form-item label="公告内容" label-width="90px">
          <el-input type="textarea" rows="5" v-model="selectedAnno.annoContent"></el-input>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">更新</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="addDialog"
      title="添加新的公告">
      <el-form :model="tobeAddAnno">
        <el-form-item label="公告内容(限180字)" label-width="80px">
          <el-input maxlength="180" type="textarea" rows="5" v-model="tobeAddAnno.content"  placeholder="请输入公告内容"></el-input>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAnno">发布</el-button>
        <el-button @click="clean" >取消</el-button>
      </div>
    </el-dialog>
    <el-card>
      <el-table :data="annos.slice((currentPage-1)*pageSize,currentPage*pageSize)">
        <el-table-column label="公告内容" prop="annoContent" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="公告发布日期" prop="annoDate" align="center"></el-table-column>
        <el-table-column label="公告状态" prop="annoState" align="center" :formatter="fomatBoolean"></el-table-column>
        <el-table-column label="审核人" prop="annoCheckName" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
             :disabled="scope.row.annoState"
              round
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="setSelectedAnno(scope.row)">
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
            发布公告<i class="el-icon-edit-outline el-icon--right"></i></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  name: 'Announcement',
  data () {
    return {
      annos: [],
      currentPage: 1,
      pageSize: 5,
      total: 1,
      addDialog: false,
      tobeAddAnno: {
        content: ''
      },
      modifyDialog: false,
      selectedAnno: {}
    }
  },
  mounted () {
    this.findAllAnno()
  },
  methods: {
    findAllAnno () {
      this.$axios
        .post('/admin/findAllAnno', {
          managerUsername: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.annos = result.data.data
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
    editAnno () {

    },
    flash () {
      this.reload()
    },
    currentChange (page) {
      this.currentPage = page
    },
    preConfirm (anno) {
      this.$confirm('此操作将永久删除该公告，是否继续？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.deleteAnno(anno)
        })
        .catch(() => {
          this.$message({
            message: '已取消删除',
            type: 'info'
          })
        })
    },
    deleteAnno (anno) {
      this.$axios
        .post('/admin/deleteAnno', {
          id: anno.id
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
    addAnno () {
      this.$axios
        .post('/admin/addAnno', {
          annoReleaseName: this.$store.state.username,
          annoContent: this.tobeAddAnno.content
        })
        .then(reslut => {
          if (reslut.data.code === 200) {
            this.$message.success('发布成功!')
            this.flash()
          } else {
            this.$message.warning('发布失败!')
          }
        })
    },
    clean () {
      this.tobeAddAnno = {}
      this.addDialog = false
    },
    setSelectedAnno (anno) {
      this.selectedAnno = anno
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
        .post('/admin/updateAnno', {
          id: this.selectedAnno.id,
          annoContent: this.selectedAnno.annoContent,
          annoReleaseId: this.selectedAnno.annoReleaseId
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('发布成功')
            this.modifyDialog = false
          }
        })
    }
  }
}
</script>
