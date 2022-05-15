<template>
  <div>
    <div style="margin: 40px">
      <template>
        <el-table
          :data="fileList"
          fit="false"
          height="calc(50vh)">
          <el-table-column prop="name" label="文件名" align="center">
          </el-table-column>

          <el-table-column prop="date" label="上传日期" align="center">
          </el-table-column>

          <el-table-column prop="state" label="审核状态" align="center" :formatter="formatBoolean">
          </el-table-column>

          <el-table-column prop="checkName" label="审核人" align="center">
          </el-table-column>

          <el-table-column prop="checkInfo" label="审核意见" align="center" :show-overflow-tooltip="true"></el-table-column>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="delFile(scope.row)" type="danger" plain round size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  data () {
    return {
      fileList: []
    }
  },
  created () {
    this.findAllFIle()
  },
  methods: {
    findAllFIle () {
      this.$axios
        .post('/home/files', {
          uploadName: this.$store.state.general_username
        })
        .then((result) => {
          if (result.data.code === 200) {
            this.fileList = result.data.data
            this.total = this.fileList.length
          }
        })
    },
    formatBoolean: function (row, column, cellValue) {
      var ret = ''
      if (cellValue) {
        ret = '已通过'
      } else {
        ret = '暂未通过'
      }
      return ret
    },
    delFile (file) {
      this.$confirm('此操作将永久删除服务器中的文件！是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios
            .post('/admin/deleteFile', {
              id: file.id
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
    }
  }
}
</script>
