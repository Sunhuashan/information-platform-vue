<template>
  <el-form :model="post">
    <el-form-item >
      <el-input v-model="form.username" placeholder="name"></el-input>
    </el-form-item>
    <el-form-item >
      <el-input v-model="form.password" placeholder="password"></el-input>
    </el-form-item>
    <el-form-item >
      <el-button v-on:click="reg">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'Init',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    reg () {
      this.$axios
        .post('/admin/manager_add', {
          managerUsername: this.form.username,
          managerPassword: this.form.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$router.replace({path: '/manager_login'})
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>
<style scoped>

</style>
