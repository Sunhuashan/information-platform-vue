<template>
  <div>
    <el-container  indicator-position="none">
      <el-aside width="550px">
        <el-carousel height="calc(100vh - 10px)">
          <el-carousel-item>
            <img src="../../assets/img/test1.png">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/test2.png">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/test3.png">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/test4.png">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/img/test5.png">
          </el-carousel-item>
        </el-carousel>
      </el-aside>
      <el-container>
        <el-footer>
            <div style="margin: 20px;float: right;">
              <el-link type="primary">忘记密码请点击联系管理员</el-link>
            </div>
        </el-footer>
        <el-main>
          <el-form class="login-container" label-position="left"
                  label-width="0px">
            <h2 class="login_title">登录xx公司信息平台</h2>
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
            <el-form-item>
              <el-row>
                <el-col :span="19">
                  <el-link type="primary" href="/register">新员工注册</el-link>
                </el-col>
                <el-col :span="5">
                  <el-link type="primary" href="/manager_login">管理员登录</el-link>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/home/login', {
          username: this.loginForm.username,
          userPassword: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$message.success('登录成功！')
            this.$router.replace('/index')
          } else {
            this.$message.warning('用户名或密码错误！')
          }
        })
    }
  }
}
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 50px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgb(255, 255, 255);
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
    background: #7b8085;
    border: none;
  }

</style>
