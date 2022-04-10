<template>
  <div>
    <el-dialog
    title="编辑管理员信息"
    :visible.sync="editDialogVisisble">
      <el-form v-model="SelectedManager" style="text-align: left ">
        <el-form-item label="管理员用户名" label-width="120px" prop="managerUsername">
          <label>{{SelectedManager.managerUsername}}</label>
        </el-form-item>
        <el-form-item label="管理员邮箱" label-width="120px" prop="managerEmail">
          <label>{{SelectedManager.managerEmail}}</label>
        </el-form-item>
        <el-form-item label="管理员电话" label-width="120px" prop="managerPhone">
          <label>{{SelectedManager.managerPhone}}</label>
        </el-form-item>
        <el-form-item label="管理员密码" label-width="120px" prop="managerPassword">
          <el-button type="warning" @click="resetPassword(SelectedManager.managerUsername)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="allRoles">
          <el-checkbox-group  v-model="selectedRoleIds">
              <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{role.roleNameZh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update(SelectedManager)">立即更新</el-button>
        <el-button @click="editDialogVisisble = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
    title="添加管理员账号"
    :visible.sync="addDialogVisible">
      <el-form :model="tobeAddManager" :rules="rules" ref="tobeAddManagerForm" label-position="right" label-width="120px">
        <el-form-item label="管理员用户名" prop="username">
          <el-input v-model="tobeAddManager.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="tobeAddManager.password" type="password" clearable show-password placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="tobeAddManager.checkPassword" type="password" clearable show-password placeholder="请确认密码"></el-input>
        </el-form-item>

        <el-form-item label="管理员邮箱" prop="email">
          <el-input v-model="tobeAddManager.email" clearable placeholder="请输入管理员邮箱"></el-input>
        </el-form-item>

        <el-form-item label="管理员电话" prop="phone">
          <el-input v-model="tobeAddManager.phone" clearable placeholder="请输入管理员电话"></el-input>
        </el-form-item>

        <el-form-item label="角色分配" prop="tobeAddRoleIds">
          <el-checkbox-group v-model="tobeAddManager.tobeAddRoleIds">
            <el-checkbox v-for="role in allRoles" :key="role.id" :label="role.id">{{role.roleNameZh}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAdd()">立即添加</el-button>
        <el-button @click="clearForm()">重置</el-button>
      </div>
    </el-dialog>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
      :stripe="true"
      :data="users.slice((currentPage-1)*pageSize , (currentPage*pageSize))"
      :default-sort="{prop: 'id', order: 'ascending'}"
      max-height="window.innerHeight - 320"
      style="width: 100%">
        <el-table-column label="管理员id" align="center" prop="id">

        </el-table-column>
        <el-table-column label="管理员用户名" align="center" prop="managerUsername">

        </el-table-column>
        <el-table-column label="管理员邮箱" align="center" prop="managerEmail" >

        </el-table-column>
        <el-table-column label="管理员电话" align="center" prop="managerPhone">

        </el-table-column>
        <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button
                @click="editManager(scope.row)"
                type="primary"
                round
                icon="el-icon-edit"
                size="mini">
                编辑
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
      <el-col :span="18">
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
        <el-col :span="6">
          <div>
            <el-button
              style="margin: 19px;"
              type="primary"
              size="medium"
              round
              icon="el-icon-circle-plus-outline"
              @click="addManager()">
              添 加 管 理 员 账 号</el-button>
          </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Manager',
  inject: ['reload'],
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入管理员密码'))
      } else {
        if (this.tobeAddManager.checkPassword !== '') {
          this.$refs.tobeAddManagerForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.tobeAddManager.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      users: [],
      editDialogVisisble: false,
      SelectedManager: [],
      allRoles: [],
      selectedRoleIds: [],
      currentPage: 1,
      pageSize: 5,
      total: 1,
      addDialogVisible: false,
      tobeAddManager: {
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        phone: '',
        tobeAddRoleIds: []
      },
      rules: {
        username: [
          { required: true, message: '请输入管理员用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入管理员密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        tobeAddRoleIds: [
          { type: 'array', required: true, message: '请至少分配一个角色', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.SelectAllManager()
    this.selectRoles()
  },
  methods: {
    selectRoles () {
      var _this = this
      _this.$axios
        .get('/admin/roles')
        .then(result => {
          if (result.data.code === 200) {
            _this.allRoles = result.data.data
          }
        })
    },
    SelectAllManager () {
      var _this = this
      _this.$axios
        .get('/admin/manager_show')
        .then((result) => {
          if (result.data.code === 200) {
            _this.users = result.data.data
            _this.total = result.data.data.length
          }
        })
    },
    editManager (user) {
      this.editDialogVisisble = true
      this.SelectedManager = user
      let roleIds = []
      for (let i = 0; i < user.roleList.length; i++) {
        roleIds.push(user.roleList[i].id)
      }
      this.selectedRoleIds = roleIds
    },
    preConfirm (user) {
      this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteManager(user)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deleteManager (user) {
      var _this = this
      _this.$axios
        .post('/admin/manager_delete', {
          managerUsername: user.managerUsername
        })
        .then(result => {
          if (result.data.code === 200) {
            _this.successMsg('恭喜你，删除成功！!')
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
    resetPassword (name) {
      var _this = this
      _this.$axios
        .post('/admin/resetPassword', {
          managerUsername: name
        })
        .then(result => {
          if (result.data.code === 200) {
            this.successMsg('恭喜你，密码重置成功！')
          } else {
            this.failMsg('出错了，密码重置失败！')
          }
        })
    },
    update (user) {
      let _this = this
      let roels = []
      for (let i = 0; i < _this.selectedRoleIds.length; i++) {
        for (let j = 0; j < _this.allRoles.length; j++) {
          if (_this.selectedRoleIds[i] === _this.allRoles[j].id) {
            roels.push(_this.allRoles[j])
          }
        }
      }
      _this.$axios
        .post('/admin/updateManager', {
          managerUsername: user.managerUsername,
          roleList: roels
        })
        .then(result => {
          if (result.data.code === 200) {
            _this.successMsg('用户信息更新成功！')
            // 关闭编辑窗口，刷新页面
            _this.editDialogVisisble = false
            _this.SelectAllManager()
          } else {
            _this.failMsg('用户信息更新失败！')
          }
        })
    },
    currentChange (page) {
      this.currentPage = page
    },
    addManager () {
      this.addDialogVisible = true
    },
    clearForm () {
      this.$refs.tobeAddManagerForm.resetFields()
    },
    submitAdd () {
      this.$refs.tobeAddManagerForm.validate((valid) => {
        if (valid) {
          let _this = this
          let roels = []
          for (let i = 0; i < _this.tobeAddManager.tobeAddRoleIds.length; i++) {
            for (let j = 0; j < _this.allRoles.length; j++) {
              if (_this.tobeAddManager.tobeAddRoleIds[i] === _this.allRoles[j].id) {
                roels.push(_this.allRoles[j])
              }
            }
          }
          _this.$axios
            .post('/admin/addManager', {
              managerUsername: _this.tobeAddManager.username,
              managerPassword: _this.tobeAddManager.password,
              managerEmail: _this.tobeAddManager.email,
              managerPhone: _this.tobeAddManager.phone,
              roleList: roels
            })
            .then(result => {
              if (result.data.code === 200) {
                _this.successMsg('恭喜你，添加管理员账号成功！')
                _this.addDialogVisible = false
                _this.flash()
              } else {
                _this.failMsg(result.data.message)
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
