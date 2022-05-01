<template>
  <div>
    <el-upload
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :data="uploadData"
      ref="zipUpload"
      drag
      action="http://localhost:8443/api/home/uploadFile"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传zip文件,且不超过50MB</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'ZipUpload',
  data () {
    return {
    }
  },
  computed: {
    uploadData () {
      return {
        username: this.$store.state.general_username
      }
    }
  },
  methods: {
    beforeUpload (file) {
      var fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
      var size = file.size / 1024 / 1024
      if (fileType !== 'zip') {
        alert('仅能上传.zip类型的文件')
        return false
      } else if (size > 50) {
        alert('文件限制大小:50MB , 当前文件大小:' + size.toFixed(1) + 'MB')
        return false
      }
      return true
    },
    onSuccess (response, file, fileList) {
      if (response.code === 200) {
        this.$message.success('文件上传成功,等待管理员审核!')
      } else {
        alert(response.message)
      }
    }
  }
}
</script>
