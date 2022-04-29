<template>
  <div>
    <el-form :model="posts">
      <el-form-item label="帖子标题" label-width="70px">
        <el-input v-model="posts.title" placeholder="请输入帖子标题"></el-input>
      </el-form-item>
    </el-form>
    <mavon-editor
      :boxShadow="false"
      @save="save"
      style="height: 60vh"
      v-model="posts.contentMD">
    </mavon-editor>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  name: 'ReleasePost',
  data () {
    return {
      posts: {
        title: '',
        contentMD: ''
      }
    }
  },
  methods: {
    save (value, render) {
      // value是MD
      if (this.posts.contentMD === '') {
        this.$message.warning('帖子内容为空！')
      } else if (this.posts.title === '') {
        this.$message.warning('帖子标题为空！')
      } else {
        this.$axios
          .post('/home/releasePosts', {
            title: this.posts.title,
            contentMD: value,
            contentHtml: render,
            releaseName: this.$store.state.general_username
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('帖子发布成功！')
              this.$router.replace('/forum')
            }
          })
      }
    }
  }
}
</script>
