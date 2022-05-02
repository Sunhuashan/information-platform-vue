<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="反馈未通过审核理由">
      <el-form ref="form" :model="selectedFile" label-width="80px">
        <el-form-item label="审核反馈">
          <el-input @click="addCheckInfo" v-model="selectedFile.checkInfo" type="textarea" :rows="5" placeholder="请输入审核未通过理由"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addCheckInfo">提交</el-button>
      </div>
     </el-dialog>
    <el-card>
      <el-table
        :data="fileList.slice((currentPage - 1)*pageSize,currentPage*pageSize)"
        fit="false"
        stripe>
        <el-table-column prop="name" label="文件名" align="center">
        </el-table-column>

        <el-table-column prop="uploadName" label="上传人" align="center">
        </el-table-column>

        <el-table-column prop="date"  label="上传日期" align="center">
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
            <el-button @click="download(scope.row)" size="mini" type="primary" plain round>下载</el-button>
            <el-button @click="deleteFile(scope.row)" size="mini" type="danger" plain round>删除</el-button>
          </template>
        </el-table-column>

        <el-table-column label="审核意见" align="center">
          <template slot-scope="scope">
            <el-button @click="setSelectedMyFile(scope.row)" :disabled="scope.row.state" size="mini" type="primary" plain round>编辑</el-button>
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
      fileList: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      selectedFile: {},
      dialogVisible: false
    }
  },
  mounted () {
    this.getAllFile()
  },
  methods: {
    deleteFile (f) {
      this.$confirm('此操作将永久删除服务器中的文件！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/admin/deleteFile', {
              id: f.id
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
    addCheckInfo () {
      this.$axios
        .post('/admin/addCheckInfo', {
          id: this.selectedFile.id,
          checkInfo: this.selectedFile.checkInfo,
          checkName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('审核意见反馈成功！')
            this.dialogVisible = false
          }
        })
    },
    setSelectedMyFile (f) {
      this.selectedFile = f
      this.dialogVisible = true
    },
    update (myFile) {
      this.$axios
        .post('/admin/updateFileState', {
          id: myFile.id,
          state: myFile.state,
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
    download (myFile) {
      this.$axios({
        method: 'post',
        url: '/home/download',
        data: {
          name: myFile.name
        },
        dataType: 'json',
        responseType: 'blob'
      })
        .then(result => {
          const blob = new Blob([result.data])
          const filename = myFile.name

          // 尝试创建带有 download 属性的<a></a>标签
          if ('download' in document.createElement('a')) {
            const link = document.createElement('a')
            link.download = filename
            link.style.display = 'none'
            link.href = URL.createObjectURL(blob)
            document.body.appendChild(link)
            link.click() // 点击下载
            URL.revokeObjectURL(link.href) // 释放url
            document.body.removeChild(link)// 释放标签
          } else {
            navigator.msSaveBlob(blob, filename)
          }
        })
    },
    getAllFile () {
      this.$axios
        .get('/admin/findAllFile')
        .then(result => {
          if (result.data.code === 200) {
            this.fileList = result.data.data
            this.total = this.fileList.length
          }
        })
    },
    currentChange (page) {
      this.currentPage = page
    }
  }
}
</script>
