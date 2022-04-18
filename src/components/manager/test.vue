<template>
  <div>
    <el-carousel
    @change="onChange"
    :trigger="click"
    :autoplay="false"
    height="calc(100vh)">
      <el-carousel-item v-for="(pub,i) in pubs" :key="i">
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          style="width: 100%"
          :options="playerOptions">
        </video-player>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data () {
    return {
      pubs: [],
      playerOptions: {
        autoplay: true,
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: ''
          }
        ]
      }
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.$axios
        .get('/admin/findAllPub')
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
/*  */
.video-player {
  pointer-events: none
}
</style>
