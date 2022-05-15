<template>
  <div>
    <el-dialog
     title="修改帖子内容"
     width="80%"
     :visible.sync="updateDialog">
     <el-form :model="operatedPosts" label-width="70px">
       <el-form-item label="帖子标题">
        <el-input v-model="operatedPosts.title"></el-input>
       </el-form-item>
       <el-form-item label="帖子内容">
         <mavon-editor
            @save="updatePosts"
            v-model="operatedPosts.contentMD">
          </mavon-editor>
       </el-form-item>
     </el-form>
    </el-dialog>
    <ul v-infinite-scroll="load" style="list-style: none">
      <li v-for="i in count" :key="i">
        <hr>
          <el-row class="posts_box">
            <el-col :span="7">
              <div class="title" :underline="false">{{posts[i-1].title}}</div>
            </el-col>
            <el-col :span="4" class="author">
              {{posts[i-1].date}}
            </el-col>
            <el-col :span="4" class="author">
              <el-button @click="preUpdatePosts(posts[i-1])" type="primary" size="small" round plain>修改</el-button>
              <el-button @click="preDeletePosts(posts[i-1])" type="danger" size="small" round plain>删除</el-button>
            </el-col>
            <el-col :span="4" class="author">
              <div>{{posts[i-1].state === true ? '已通过' : '暂未通过'}}</div>
            </el-col>
            <el-col :span="4" style="margin:5px;text-align:center">
              <el-tooltip class="item" effect="dark" :content="posts[i-1].checkInfo === '' ? '待审核' : posts[i-1].checkInfo" placement="top" >
                <el-button size="mini" type="primary" plain round :disabled="posts[i-1].state">审核意见</el-button>
              </el-tooltip>
            </el-col>
          </el-row>
      </li>
    </ul>
    <hr>
    <div style="text-align:center">已经到底了~~</div>
  </div>
</template>
<script>
import Bus from '../../bus.js'
export default {
  inject: ['reload'],
  name: 'Posts',
  data () {
    return {
      posts: [],
      len: 1,
      count: 0,
      selectedPosts: {},
      operatedPosts: {},
      updateDialog: false
    }
  },
  mounted () {
    this.getAllPosts()
  },
  destroyed () {
    Bus.$emit('posts', this.selectedPosts)
  },
  methods: {
    getAllPosts () {
      var _this = this
      _this.$axios
        .post('/home/findAllPostsByReleaseName', {
          releaseName: this.$store.state.general_username
        })
        .then(result => {
          if (result.data.code === 200) {
            _this.posts = result.data.data
            _this.len = result.data.data.length
          }
        })
    },
    setSelectedPosts (ps) {
      this.selectedPosts = ps
      this.$router.replace('/forum/detail')
    },
    preUpdatePosts (posts) {
      this.updateDialog = true
      this.operatedPosts = posts
    },
    updatePosts (value, render) {
      if (this.operatedPosts.contentMD === '') {
        this.$message.warning('帖子内容为空！')
      } else if (this.operatedPosts.title === '') {
        this.$message.warning('帖子标题为空！')
      } else {
        this.$axios
          .post('/home/updatePosts', {
            id: this.operatedPosts.id,
            title: this.operatedPosts.title,
            contentMD: value,
            contentHtml: render
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('帖子更新成功！')
              this.updateDialog = false
            }
          })
      }
    },
    preDeletePosts (currentPosts) {
      this.$confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deletePosts(currentPosts)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deletePosts (currentPosts) {
      this.$axios
        .post('/home/deletePosts', {
          id: currentPosts.id
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('删除成功！')
            this.reload()
          }
        })
    },
    load () {
      if (this.count < this.len) {
        this.count += 1
      }
    }
  }
}
</script>
<style scoped>
  .title{
    font-weight: bold;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width: 90%;
    height: 5vh;
    display:block;
    margin: 5px;
    color: darkgray;
  }
  .author {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: darkgray;
    height: 5vh;
    display:block;
    margin: 5px;
  }
  .posts_box {
    margin: 30px 0;
  }
  .info {
    font-weight: bold;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width: 70%;
  }
</style>
