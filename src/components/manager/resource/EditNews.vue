<template>
    <div>
      <el-row>
          <el-dialog
            :visible.sync="dialogVisible"
            title="添加新闻标题/封面">
            <el-form :model="news" ref="titleForm">
              <el-form-item prop="title" label="标题" label-width="50px">
                <el-input v-model="news.title" placeholder="请输入新闻标题" clearable></el-input>
              </el-form-item>
              <el-form-item prop="abstract" label="摘要" label-width="50px">
                <el-input
                  type="textarea"
                  v-model="news.abstract"
                  :rows="6"
                  placeholder="请输入新闻摘要">
                </el-input>
              </el-form-item>
              <el-form-item label="封面" label-width="50px">
                <el-input v-model="news.imagePath" placeholder="封面URL" disabled></el-input>
                <image-upload @onUpload="setURL" @onRemove="remove" ref="imageUpload"></image-upload>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="dialogVisible = false">确 认</el-button>
            </div>
          </el-dialog>
      </el-row>
      <el-row style="height: calc(100vh - 140px);">
          <mavon-editor
            @save="saveNews"
            style="height: 100%;"
            v-model="news.contentMD">
            <template slot="left-toolbar-after">
              <button
                type="button"
                @click="visible()"
                class="op-icon  el-icon-document"
                aria-hidden="true"
                title="添加标题/封面">
              </button>
            </template>
          </mavon-editor>
      </el-row>
    </div>
</template>
<script>
import ImageUpload from '../../common/ImageUpload.vue'
export default {
  components: { ImageUpload },
  name: 'EditNews',
  data () {
    return {
      currentManagerId: 0,
      news: {
        title: '',
        abstract: '',
        imagePath: '',
        contentMD: ''
      },
      dialogVisible: false
    }
  },
  mounted () {
    this.getCurrentManagerId()
  },
  methods: {
    getCurrentManagerId () {
      this.$axios
        .post('/api/admin/getManagerId', {
          managerUsername: this.$store.state.username
        })
    },
    saveNews (value, render) {
      // value是MD，render是HTML
      if (this.news.contentMD === '') {
        this.$message.warning('新闻内容为空！')
      } else if (this.news.title === '' || this.news.abstract === '' || this.news.imagePath === '') {
        this.$message.warning('请添加新闻标题,摘要和封面！')
      } else {
        this.$comfirm('是否发布新闻?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$axios
              .post('/api/admin/addNews', {
                newsTitle: this.news.title,
                newsAbstract: this.news.abstract,
                newsContentHtml: render,
                newsContentMd: value,
                newsReleaseId: this.currentManagerId,
                newsImagePath: this.news.imagePath
              })
          })
      }
    },
    visible () {
      this.dialogVisible = true
    },
    setURL () {
      this.news.imagePath = this.$refs.imageUpload.url
    },
    remove () {
      this.news.imagePath = ''
      // 日后应添加对后端服务器上文件删除操作
    }
  }
}
</script>
