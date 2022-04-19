<template>
  <div>
    <el-dialog
      :visible.sync="addVideoDialog"
      title="发布宣传视频">
      <el-form>
        <el-form-item label="视频URL" label-width="70px">
          <el-input v-model="url" disabled placeholder="视频URL"></el-input>
        </el-form-item>
        <el-form-item label="视频描述" label-width="70px">
          <el-input v-model="describe" placeholder="请输入视频内容描述，以便尽快通过审核"></el-input>
        </el-form-item>
        <el-form-item label="上传视频" label-width="70px">
          <video-upload ref="videoUpload" @onUpload="setURL" @onRemove="removeVideo"></video-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addVideo">发布</el-button>
        <el-button @click="addVideoDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="addImageDialog"
      title="发布宣传图片">
      <el-form>
        <el-form-item label="图片URL" label-width="70px">
          <el-input v-model="url" disabled placeholder="图片URL"></el-input>
        </el-form-item>
        <el-form-item label="图片描述" label-width="70px">
          <el-input v-model="describe" placeholder="请输入图片内容描述，以便尽快通过审核"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" label-width="70px">
          <image-upload ref="imageUpload" @onUpload="setImageURL" @onRemove="removeImage"></image-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="addImage">发布</el-button>
        <el-button @click="addImageDialog = false">取消</el-button>
      </div>
    </el-dialog>
    <el-card>
      <el-table
        :stripe="true"
        :data="pubs.slice((currentPage-1)*pageSize , (currentPage*pageSize))"
        max-height="window.innerHeight - 320"
        style="width: 100%">
        <el-table-column label="宣传类型" prop="pubType" align="center"></el-table-column>
        <el-table-column label="描述" :show-overflow-tooltip="true" prop="pubDescribe" align="center"></el-table-column>
        <el-table-column label="状态" prop="pubState" :formatter="formatBoolean" align="center"></el-table-column>
        <el-table-column label="审核人" prop="pubCheckName" align="center"></el-table-column>
        <el-table-column label="发布时间" prop="pubDate" align="center"></el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
              <el-link :href="scope.row.pubPath" type="primary">
                查看<i class="el-icon-view el-icon--right"></i>
              </el-link>
              <el-button
                @click="preConfirm(scope.row)"
                type="danger"
                round
                icon="el-icon-delete"
                size="mini">
                移除
              </el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-row>
      <el-col :span="15">
        <div>
          <el-pagination
            style="margin: 20px;text-align: center"
            background
            @current-change="currentChange"
            :page-size="pageSize"
            :current-page="currentPage"
            layout="total, prev, pager, next , jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="4" >
        <div style="margin: 19px;">
            <el-button
            type="primary"
            size="medium"
            round
            @click="addVideoDialog = true">
            发布宣传视频<i class="el-icon-edit-outline el-icon--right"></i></el-button>
        </div>
      </el-col>
      <el-col :span="4" >
        <div style="margin: 19px;">
            <el-button
            type="primary"
            size="medium"
            round
            @click="addImageDialog = true">
            发布宣传图片<i class="el-icon-edit-outline el-icon--right"></i></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ImageUpload from '../../common/ImageUpload.vue'
import VideoUpload from '../../common/VideoUpload.vue'
export default {
  name: 'Publicity',
  inject: ['reload'],
  components: {VideoUpload, ImageUpload},
  data () {
    return {
      pubs: [],
      url: '',
      describe: '',
      total: 1,
      pageSize: 5,
      currentPage: 1,
      addVideoDialog: false,
      addImageDialog: false
    }
  },
  mounted () {
    this.findAll()
  },
  methods: {
    findAll () {
      this.$axios
        .post('/admin/findAllPubByName', {
          pubReleaseName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.pubs = result.data.data
            this.total = result.data.data.length
          }
        })
    },
    formatBoolean (row, column, cellValue, index) {
      let state = ''
      if (cellValue === true) {
        state = '已发布'
      } else {
        state = '待审核'
      }
      return state
    },
    preConfirm (thisPub) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deletePub(thisPub)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    deletePub (thisPub) {
      this.$axios
        .post('/admin/removeImage', {
          url: thisPub.pubPath
        })
        .then(result => {
        })
      this.$axios
        .post('/admin/deletePublicity', {
          id: thisPub.id
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('删除成功！')
            this.reload()
          } else {
            this.$message.warning('删除失败！')
          }
        })
    },
    currentChange (page) {
      this.currentPage = page
    },
    setURL () {
      this.url = this.$refs.videoUpload.url
    },
    setImageURL () {
      this.url = this.$refs.imageUpload.url
    },
    removeVideo () {
      this.$axios
        .post('/admin/removeImage', {
          url: this.url
        })
        .then(result => {
        })
      this.$refs.videoUpload.url = ''
      this.url = ''
    },
    removeImage () {
      this.$axios
        .post('/admin/removeImage', {
          url: this.url
        })
        .then(result => {
        })
      this.$refs.imageUpload.url = ''
      this.url = ''
    },
    addVideo () {
      if (this.url === '') {
        this.$message.warning('视频尚未上传')
      } else {
        this.$axios
          .post('/admin/addVideoPublicity', {
            pubType: 'video',
            pubDescribe: this.describe,
            pubPath: this.url,
            pubReleaseName: this.$store.state.username
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('发布成功')
              this.reload()
              this.addVideoDialog = false
            }
          })
      }
    },
    show (publicity) {
      this.$router.replace(publicity.pubPath)
    },
    addImage () {
      if (this.url === '') {
        this.$message.warning('图片尚未上传')
      } else {
        this.$axios
          .post('/admin/addImagePublicity', {
            pubType: 'image',
            pubDescribe: this.describe,
            pubPath: this.url,
            pubReleaseName: this.$store.state.username
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('发布成功')
              this.reload()
              this.addImageDialog = false
            }
          })
      }
    }
  }
}
</script>
