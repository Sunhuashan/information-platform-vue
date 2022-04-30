<template>
  <div>
    <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible">
      <el-form ref="passwordForm" :model="passwordForm" label-width="90px" :rules="passRules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" placeholder="请输入旧密码" clearable type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" placeholder="请输入新密码" clearable type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkNewPassword">
          <el-input v-model="passwordForm.checkNewPassword" placeholder="请再次输入新密码" clearable type="password"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right">
          <el-button @click="cacel">取 消</el-button>
          <el-button type="primary" @click="updatePassword">修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div style="color:rgb(150,150,150);font-size:24px;font-weight:bolder;text-align:center">
      更新个人信息</div>
    <div style="margin: 30px 100px;">
      <el-form ref="updateForm" :model="user" label-width="100px" :rules="rules">
        <el-form-item label="用户名/账号" prop="username">
          <el-input v-model="user.username" ></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-button type="warning" @click="dialogVisible=true">修改密码</el-button>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio v-model="user.userSex" label="男">男</el-radio>
            <el-radio v-model="user.userSex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="user.userDept" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="user.userPosition" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.userPhone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.userEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="user.userDetail" placeholder="用几句话介绍一一下自己~~" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="update">更 新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  name: 'Info',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwordForm.checkNewPassword !== '') {
          this.$refs.regForm.validateField('checkNewPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {},
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        checkNewPassword: ''
      },
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      },
      passRules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkNewPassword: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$axios
        .post('/home/findUserByName', {
          username: this.$store.state.general_username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.user = result.data.data
          }
        })
    },
    updatePassword () {
      this.$axios
        .post('/home/updatePassword', {
          username: this.$store.state.general_username,
          userPassword: this.passwordForm.oldPassword,
          newPassword: this.passwordForm.newPassword
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('密码更新成功！')
            this.cacel()
          } else {
            this.$message.warning(result.data.message)
          }
        })
    },
    update () {
      this.$refs.updateForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/home/updateUser', {
              id: this.user.id,
              username: this.user.username,
              userSex: this.user.userSex,
              userDept: this.user.userDept,
              userPosition: this.user.userPosition,
              userPhone: this.user.userPhone,
              userEmail: this.user.userEmail,
              userDetail: this.user.userDetail
            })
            .then(result => {
              if (result.data.code === 200) {
                this.$message.success('更新成功！')
                this.reload()
              } else {
                this.$message.warning(result.data.message)
              }
            })
        }
      })
    },
    cacel () {
      this.dialogVisible = false
      this.passwordForm = {}
    }
  }
}
</script>
