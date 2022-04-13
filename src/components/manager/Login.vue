<template>
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h2 class="login_title">登录后台管理系统</h2>
    <el-form-item>
      <el-input type="text" v-model="loginForm.username" clearable
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password" clearable
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button class="login_button" type="primary" v-on:click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/admin/manager_login', {
          managerUsername: this.loginForm.username,
          managerPassword: this.loginForm.password
        })
        .then(response => {
          if (response.data.code === 200) {
            // this.$router.replace({path: '/manager_index'})
            this.$store.commit('login', this.loginForm.username)
            var path1 = this.$route.query.redirect
            this.$router.replace({path: path1 === '/' || path1 === undefined ? '/admin' : path1})
          } else {
            this.$message({
              message: response.data.message,
              type: 'error'
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_button {
    width: 100%;
    background: #505458;
    border: none;
  }

</style>
