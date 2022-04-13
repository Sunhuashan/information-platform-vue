<template>
  <div>
    <el-card style="width: 700px; margin: 30px auto">
      <el-form :model="regForm" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="regForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码"></el-form-item>
        <el-form-item label="确认密码"></el-form-item>
        <el-form-item label="性别"></el-form-item>
        <el-form-item label="部门"></el-form-item>
        <el-form-item label="职位"></el-form-item>
        <el-form-item label="电话"></el-form-item>
        <el-form-item label="邮箱"></el-form-item>
        <el-form-item label="个性签名"></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      regForm: {
        name: '',
        passwoed: '',
        checkPass: '',
        sex: '',
        dept: '',
        position: '',
        phone: '',
        email: '',
        detail: ''
      }
    }
  }
}
</script>
