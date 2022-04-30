<template>
  <div>
    <el-drawer
      title="回帖"
      :before-close="handleClose"
      :visible.sync="drawerVisible"
      :direction="direction"
      size="45%">
      <el-form :model="tobeAddComment" style="margin: 0 10px">
        <el-form-item>
          <el-input v-model="tobeAddComment.content" type="textarea" rows="5" placeholder="维护论坛和谐，请文明发言！"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin: 0 10px">
        <el-button type="primary" @click="addComment">发 布</el-button>
        <el-button @click="cacelAddComment">取 消</el-button>
      </div>
    </el-drawer>
    <div class="posts-area" style="margin:auto">
      <el-row style="font-weight: bold;font-size: 35px;">
        {{posts.title}}
      </el-row>
      <hr>
      <el-row>
        <el-col :span="18" class="releaseName">{{posts.releaseName}}</el-col>
        <el-col :span="4" style="margin: 20px;text-align:right">{{posts.date}}</el-col>
      </el-row>
      <el-row class="markdown-body">
        <el-col v-html="posts.contentHtml"></el-col>
      </el-row>
      <el-row style="text-align:right">
        <el-button @click="drawerVisible=true">
          <i class="el-icon-chat-dot-round"></i>
        </el-button>
      </el-row>
      <hr>
    </div>
    <post-comment v-if="flash_bool" ref="postComment" :postsId="posts.id"></post-comment>
  </div>
</template>
<script>
import Bus from '../../bus.js'
import PostComment from '../home/PostComment.vue'
export default {
  components: { PostComment },
  data () {
    return {
      posts: {},
      drawerVisible: false,
      direction: 'btt',
      tobeAddComment: {
        content: ''
      },
      flash_bool: true
    }
  },
  created () {
    let _this = this
    Bus.$on('posts', (val) => {
      _this.posts = val
    })
  },
  methods: {
    handleClose () {
      if (this.tobeAddComment.content === '') {
        this.drawerVisible = false
      } else {
        this.$confirm('确定要离开吗？离开后草稿不会保存！')
          .then(() => {
            this.cacelAddComment()
          })
          .catch(() => {
          })
      }
    },
    addComment () {
      if (this.tobeAddComment.content === '') {
        this.$message.warning('内容为空！')
      } else {
        this.$axios
          .post('/home/addComment', {
            postsId: this.posts.id,
            content: this.tobeAddComment.content,
            releaseName: this.$store.state.general_username
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('回帖成功！')
              this.flash()
              this.cacelAddComment()
            }
          })
      }
    },
    cacelAddComment () {
      this.tobeAddComment.content = ''
      this.drawerVisible = false
    },
    flash () {
      this.flash_bool = false
      this.$nextTick(() => {
        // 重新渲染组件
        this.flash_bool = true
      })
    }
  }
}
</script>
<style scoped>
  @import "../../style/markdown.css";
  .releaseName {
    margin: 20px;
    font-weight: bold;
    font-size: 19px;
    color: rgb(150,150,150)
  }
  .markdown-body {
    margin: 0 40px;
  }
</style>
