<template>
  <div>
    <el-drawer
      title="回帖"
      :before-close="handleClose"
      :visible.sync="drawerVisible"
      :direction="direction"
      size="45%">
      <el-form :model="tobeAddReply" style="margin: 0 10px">
        <el-form-item>
          <el-input v-model="tobeAddReply.content" type="textarea" rows="5" placeholder="维护论坛和谐，请文明发言！"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin: 0 10px">
        <el-button type="primary" @click="addReply">发 布</el-button>
        <el-button @click="cacelAddReply">取 消</el-button>
      </div>
    </el-drawer>
    <div style="text-align:center" v-show="buttonShow">
      <el-button type="text" @click="operateComment">{{info}}</el-button>
    </div>
    <div v-if="flash_bool">
      <div v-for="(item,i) in comment" :key="i">
        <el-row>
          <el-col :span="18" class="releaseName">{{item.releaseName}}</el-col>
          <el-col :span="4" style="margin: 20px;text-align:right">{{item.date}}</el-col>
        </el-row>
        <el-row v-if="item.parentComment" class="reply">
          <el-row>
            <el-col :span="20" class="reply-releaseName">{{item.parentComment.releaseName}}</el-col>
            <el-col :span="4" class="reply-date">{{item.parentComment.date}}</el-col>
          </el-row>
          <el-row>
            <el-col class="reply-content">{{item.parentComment.content}}</el-col>
          </el-row>
        </el-row>
        <el-row class="markdown-body">
          <el-col>{{item.content}}</el-col>
        </el-row>
        <el-row style="text-align:right">
          <el-button @click="preAddReply(item.id)">
            <i class="el-icon-chat-dot-round"></i>
          </el-button>
        </el-row>
        <hr>
      </div>
   </div>
  </div>
</template>
<script>
export default {
  inject: ['reload'],
  props: {
    postsId: String,
    required: true
  },
  data () {
    return {
      comment: [],
      info: '点击查看所有回帖',
      buttonShow: true,
      direction: 'btt',
      drawerVisible: false,
      tobeAddReply: {
        content: ''
      },
      selectedCommentId: '',
      flash_bool: true
    }
  },
  methods: {
    getAllComment () {
      this.$axios
        .post('/home/findAllComment', {
          postsId: this.postsId
        })
        .then(result => {
          if (result.data.code === 200) {
            this.comment = result.data.data
          }
        })
    },
    handleClose () {
      if (this.tobeAddReply.content === '') {
        this.drawerVisible = false
      } else {
        this.$confirm('确定要离开吗？离开后草稿不会保存！')
          .then(() => {
            this.cacelAddReply()
          })
          .catch(() => {
          })
      }
    },
    preAddReply (pid) {
      this.drawerVisible = true
      this.selectedCommentId = pid
    },
    addReply () {
      if (this.tobeAddReply.content === '') {
        this.$message.warning('内容为空！')
      } else {
        this.$axios
          .post('/home/addReply', {
            parent: this.selectedCommentId,
            postsId: this.postsId,
            content: this.tobeAddReply.content,
            releaseName: this.$store.state.general_username
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('回帖成功！')
              this.flash()
              this.cacelAddReply()
            }
          })
      }
    },
    cacelAddReply () {
      this.tobeAddReply.content = ''
      this.selectedCommentId = ''
      this.drawerVisible = false
    },
    operateComment () {
      this.buttonShow = false
      this.getAllComment()
    },
    flash () {
      this.getAllComment()
      this.flash_bool = false
      this.$nextTick(() => {
        this.flash_bool = true
      })
    }
  }
}
</script>
<style scoped>
  .markdown-body {
    margin: 0 40px;
  }
  .releaseName {
    margin: 20px;
    font-weight: bold;
    font-size: 19px;
    color: rgb(150,150,150)
  }
  .reply {
    background-color: rgba(150, 150, 150, 0.3);
    padding: 15px;
    margin: 10px 35px;
    font-style: oblique;
    font-size: 15px
  }
  .reply-releaseName {
    font-weight: bolder;
  }
  .reply-date {
    text-align: right;
  }
  .reply-content {
    margin: 10px 0 0 20px;
  }
</style>
