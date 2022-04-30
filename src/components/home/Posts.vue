<template>
  <div>
    <ul v-infinite-scroll="load" style="list-style: none">
      <li v-for="i in count" :key="i">
        <hr>
          <el-row class="posts_box">
            <el-col :span="15">
              <el-link  @click="setSelectedPosts(posts[i-1])" class="title" :underline="false">{{posts[i-1].title}}</el-link>
            </el-col>
            <el-col :span="4" class="author">
              {{posts[i-1].releaseName}}
            </el-col>
            <el-col :span="4" class="author">
              {{posts[i-1].date}}
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
  name: 'Posts',
  data () {
    return {
      posts: [],
      len: 1,
      count: 0,
      selectedPosts: {}
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
        .get('/home/findAllPostsByState')
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
</style>
