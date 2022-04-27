<template>
  <div>
    <div>
      <el-row style="margin: 20px;text-align: left;">
        <div style="font-size: 25px;font-weight: bold;">
          公司新闻
        </div>
      </el-row>
      <el-row style="height: calc(60%);">
        <el-col :span="7" style="margin: 5px 25px"  v-for="(item,i) in news" :key="i" >
          <el-card style="height: 50vh">
            <img :src="item.newsImagePath" class="image">
            <div style="margin: 3px">
              <span class="news_title">{{item.newsTitle}}</span>
              <el-row>
                <div style="float: right">
                <time class="time">{{item.newsDate}}</time>
              </div>
              </el-row>
              <el-row>
                <div style="float: right">
                  <el-button type="text" @click="sendNews(item.id)">了解更多...</el-button>
                </div>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Bus from '../../bus.js'
export default {
  data () {
    return {
      news: [],
      selectedNewsId: ''
    }
  },
  mounted () {
    this.news = this.$parent.newsRes
  },
  created () {
    Bus.$on('newsRes', (val) => {
      this.news = val
    })
  },
  destroyed () {
    Bus.$emit('id', this.selectedNewsId)
  },
  methods: {
    sendNews (currentId) {
      this.selectedNewsId = currentId
      this.$router.replace('/news/detail')
    }
  }
}
</script>
<style scoped>
  .image {
    object-fit: cover;
    width: 55vh;
    height: 30vh;
  }
  .news_title {
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width:55vh;
    height: 5vh;
    display:block;
    margin: 5px;
  }
</style>
