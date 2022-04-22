<template>
  <div>
    <el-card style="width: 700px; margin: 30px auto">
      <div style="margin:20px;font-weight:bold;font-size:30px;text-align:center">欢迎注册XX公司内部信息平台</div>
      <el-form :model="regForm" label-width="90px" ref="regForm" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="regForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="regForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="regForm.checkPassword" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio v-model="regForm.sex" label="男">男</el-radio>
            <el-radio v-model="regForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="regForm.dept" placeholder="请输入部门"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="regForm.position" placeholder="请输入职位"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="regForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="regForm.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="regForm.detail" placeholder="用几句话介绍一一下自己~~" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reg">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.regForm.checkPassword !== '') {
          this.$refs.regForm.validateField('checkPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.regForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      regForm: {
        name: '',
        password: '',
        checkPassword: '',
        sex: '',
        dept: '',
        position: '',
        phone: '',
        email: '',
        detail: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reg () {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/home/register', {
              username: this.regForm.name,
              userPassword: this.regForm.password,
              userSex: this.regForm.sex,
              userDept: this.regForm.dept,
              userPosition: this.regForm.position,
              usePphone: this.regForm.phone,
              userEmail: this.regForm.email,
              userDetail: this.regForm.detail
            })
            .then(result => {
              if (result.data.code === 200) {
                this.$message.success('注册成功！')
                this.$router.replace('/login')
              } else {
                this.$message.warning(result.data.message)
              }
            })
        }
      })
    }
  }
}
</script>
