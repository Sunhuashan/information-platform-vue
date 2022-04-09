<template>
  <div>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
      :stripe="true"
      :data="users.slice((currentPage-1)*pageSize , (currentPage*pageSize))"
      :default-sort="{prop: 'id', order: 'ascending'}"
      max-height="window.innerHeight - 320"
      style="width: 100%">
        <el-table-column label="用户id" align="center" prop="id">
        </el-table-column>

        <el-table-column label="用户名" align="center" prop="username">
        </el-table-column>

        <el-table-column label="性别" align="center" prop="sex">
        </el-table-column>

        <el-table-column label="用户电话" align="center" prop="phone">
        </el-table-column>

         <el-table-column label="用户部门" align="center" prop="dept">
        </el-table-column>

         <el-table-column label="用户职位" align="center" prop="position">
        </el-table-column>

        <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                @click="preConfirm(scope.row)"
                type="danger"
                round
                size="mini"
                icon="el-icon-delete">
                移除
              </el-button>
            </template>
          </el-table-column>
      </el-table>
    </el-card>
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
</template>
<script>
export default {
  name: 'User',
  inject: ['reload'],
  data () {
    return {
      users: [],
      currentPage: 1,
      pageSize: 5,
      total: 1
    }
  },
  mounted () {
    this.selectAllUser()
  },
  methods: {
    selectAllUser () {
      let _this = this
      _this.$axios
        .get('/user/findAllUsers')
        .then(result => {
          if (result.data.code === 200) {
            _this.users = result.data.data
            _this.total = result.data.data.length
          } else {
            _this.failMsg('获取用户信息失败！')
          }
        })
    },
    preConfirm (user) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteUser(user)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteUser (user) {
      let _this = this
      _this.$axios
        .post('/user/deleteUser', {
          username: user.username
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
    }
  }
}
</script>
<style scoped>

</style>
