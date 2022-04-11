<template>
  <div>
    <el-container>
      <el-aside width="550px">
        <el-carousel height="calc(100vh - 16px)">
          <el-carousel-item v-for="item in image" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-aside>
      <el-container>
        <el-footer  style="background: rgb(25, 25, 255);">
        </el-footer>
        <el-main>
          <el-form class="login-container" label-position="left"
                  label-width="0px">
            <h2 class="login_title">登录</h2>
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
                  <el-link type="primary" href="/register">新用户注册</el-link>
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
        password: '',
        image: [
          {url: require('../../assets/img/login1.png')},
          {url: require('../../assets/img/login1.png')},
          {url: require('../../assets/img/login1.png')},
          {url: require('../../assets/img/login1.png')}
        ]
      }
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/admin/manager_login', {
          managerUsername: this.loginForm.username,
          managerPassword: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            // this.$router.replace({path: '/manager_index'})
            this.$store.commit('login', this.loginForm.username)
            var path1 = this.$route.query.redirect
            this.$router.replace({path: path1})
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
