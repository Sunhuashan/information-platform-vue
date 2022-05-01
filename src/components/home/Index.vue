<template>
  <div>
      <el-container>
        <el-main style="padding: 0">
          <el-carousel
            @change="onChange"
            :trigger="click"
            :autoplay="false"
            height="calc(100vh)">
            <el-carousel-item v-for="(pub,i) in pubs.slice(0,6)" :key="i">
              <video-player
                ref="videoPlayer"
                class="video-player vjs-custom-skin"
                style="width: 100%"
                :options="playerOptions">
              </video-player>
            </el-carousel-item>
          </el-carousel>
        </el-main>
      </el-container>
      <el-row style="height: calc(20%);text-align: center">
        <div style="margin: calc(4%) 0;font-size: 40px;font-weight: bold;color:rgb(150,150,150)">
          公司新闻
        </div>
      </el-row>
      <el-row style="text-align:right;margin:0 50px 15px 0">
        <el-link href="/news" type="primary" style="font-size:20px">更多新闻>>></el-link>
      </el-row>
      <el-row style="height: calc(60%);">
        <el-col :span="7" style="margin: 5px 25px"  v-for="(item,i) in news.slice(0,6)" :key="i" >
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
      <el-row style="height: 72vh;margin: 50px 0 0 0;background:#efefef">
        <el-col :span="12">
          <el-row style="height: calc(20%);text-align: center">
            <div style="margin: calc(4%) 0;font-size: 28px;font-weight: bold;color:rgb(150,150,150)">
              通知公告
            </div>
          </el-row>
          <el-row style="text-align:right;margin:0 50px 15px 0">
            <el-link href="/announcement" type="primary" style="font-size:15px">更多公告信息>>></el-link>
          </el-row>
          <div>
            <el-row style="margin: 40px" v-for="(item,i) in anno.slice(0,3)" :key="i">
              <el-col :span="4">
                <div class="anno_date">
                  <div class="anno_month">{{item.annoDate.slice(0,7)}}</div>
                  <div class="anno_day">{{item.annoDate.slice(8,10)}}</div>
                </div>
              </el-col>
              <el-col :span="20">
                <el-link href="/announcement" :underline="false">
                  <div class="anno_content">{{item.annoContent}}</div>
                </el-link>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="12">
          <el-row style="height: calc(20%);text-align: center">
            <div style="margin: calc(4%) 0;font-size: 28px;font-weight: bold;color:rgb(150,150,150)">
              科研成果
            </div>
          </el-row>
          <el-row style="text-align:right;margin:0 50px 15px 0">
            <el-link href="/research" type="primary" style="font-size:15px">更多科研信息>>></el-link>
          </el-row>
          <div style="margin: 40px">
            <el-row align="left" style="margin: 5px 0" >
              <el-link href="/research#论文发表" :underline="false">
                  <div class="anno_content" style="margin: 3px 0 0 0;">论文发表:</div>
                </el-link>
            </el-row>
            <el-row align="left">
              <div class="res_content" v-for="(item,i) in paper.slice(0,2)" :key="i">{{i+1}}.{{item.content}}</div>
            </el-row>
            <el-row align="left" style="margin: 5px 0">
              <el-link href="/research#发明专利" :underline="false">
                  <div class="anno_content" style="margin: 3px 0 0 0">发明专利:</div>
                </el-link>
            </el-row>
            <el-row align="left">
              <div class="res_content" v-for="(item,i) in design.slice(0,2)" :key="i">{{i+1}}. {{item.content}}</div>
            </el-row>
            <el-row align="left" >
              <el-link href="/research#获奖信息" :underline="false">
                  <div class="anno_content" style="margin: 3px 0 0 0">获奖信息:</div>
                </el-link>
            </el-row>
            <el-row align="left">
              <div class="res_content" v-for="(item,i) in award.slice(0,2)" :key="i">{{i+1}}.{{item.content}}</div>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row style="height: calc(20%);text-align: center">
        <div style="margin: calc(3%) 0;font-size: 40px;font-weight: bold;color:rgb(150,150,150)">
          资源分享
        </div>
      </el-row>
      <el-row style="height: 72vh;">
        <el-col :span="12">
          <el-row style="height: calc(20%);text-align: center">
            <div style="margin: calc(4%) 0;font-size: 28px;font-weight: bold;color:rgb(150,150,150)">
              上传区域
            </div>
          </el-row>
          <div style="margin:40px;text-align:center">
            <zip-upload></zip-upload>
          </div>
        </el-col>
        <el-col :span="12">
          <el-row style="height: calc(20%);text-align: center">
            <div style="margin: calc(4%) 0;font-size: 28px;font-weight: bold;color:rgb(150,150,150)">
              下载区域
            </div>
          </el-row>
          <div style="margin: 40px">
            <template>
              <el-table
                :data="fileList"
                fit="false"
                height="220"
                border>
                <el-table-column prop="name" width="300" label="文件名" align="center">
                </el-table-column>

                <el-table-column prop="uploadName" width="200" label="上传人" align="center">
                </el-table-column>

                <el-table-column prop="date" width="100" label="上传日期" align="center">
                </el-table-column>

                <el-table-column label="下载" align="center" width="90" fixed="right">
                  <template slot-scope="scope">
                    <el-button @click="download(scope.row)" size="mini" type="primary" round>下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import ZipUpload from '../common/ZipUpload.vue'
import Bus from '../../bus.js'
export default {
  components: { ZipUpload },
  name: 'Index',
  data () {
    return {
      pubs: [],
      playerOptions: {
        autoplay: true,
        loop: true,
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: ''
          }
        ]
      },
      news: [],
      research: [],
      paper: [],
      design: [],
      award: [],
      anno: [],
      selectedNewsId: '',
      fileList: []
    }
  },
  mounted () {
    this.getAllPublicity()
    this.getAllNews()
    this.getAllAnno()
    this.getAllResearch()
    this.getAllFile()
  },
  destroyed () {
    Bus.$emit('id', this.selectedNewsId)
  },
  methods: {
    download (myFile) {
      this.$axios
        .post('/home/download', {
          filename: myFile.name
        })
    },
    getAllFile () {
      this.$axios
        .get('/home/findAllFile')
        .then(result => {
          if (result.data.code === 200) {
            this.fileList = result.data.data
          }
        })
    },
    sendNews (currentId) {
      this.selectedNewsId = currentId
      this.$router.replace('/news/detail')
    },
    getAllResearch () {
      this.$axios
        .get('/home/findAllResearch')
        .then(result => {
          if (result.data.code === 200) {
            this.research = result.data.data
            for (let i = 0; i < this.research.length; i++) {
              if (this.research[i].type === '论文') {
                this.paper.push(this.research[i])
              } else if (this.research[i].type === '发明专利') {
                this.design.push(this.research[i])
              } else {
                this.award.push(this.research[i])
              }
            }
          }
        })
    },
    getAllAnno () {
      this.$axios
        .get('/home/findAllAnno')
        .then(result => {
          if (result.data.code === 200) {
            this.anno = result.data.data
          }
        })
    },
    getAllNews () {
      this.$axios
        .get('/home/findAllNews')
        .then(result => {
          if (result.data.code === 200) {
            this.news = result.data.data
          }
        })
    },
    getAllPublicity () {
      this.$axios
        .get('/home/findAllPub')
        .then(result => {
          if (result.data.code === 200) {
            this.pubs = result.data.data
            this.playerOptions.sources = this.pubs[0].pubPath
          }
        })
    },
    onChange (index) {
      this.playerOptions.sources = this.pubs[index].pubPath
    }
  }
}
</script>
<style scoped>
/* 禁止暂停视频 */
  .video-player {
    pointer-events: none
  }
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
  .anno_date {
    margin-top: -2px;
    text-align: center;
    margin-right: -85px;
    width: 70px;
    float: left;
    border: 1px solid #4e85b3;
  }
  .anno_month {
    margin-bottom: 0;
    background: #4e85b3;
    line-height: 34px;
    color: #eee;
  }
  .anno_day {
    font-size: 26px;
    line-height: 29px;
    color: #4e85b3;
  }
  .anno_content {
    font-weight: bold;
    font-size: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width: 75vh;
    height: 5vh;
    display:block;
    margin: 5px;
  }
  .res_content {
    margin: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width: 90vh;
  }
</style>
