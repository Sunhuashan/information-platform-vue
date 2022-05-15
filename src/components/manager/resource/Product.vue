<template>
  <div>
    <el-dialog
      :visible.sync="editDialog"
      title="更新产品信息">
      <el-form :model="selected" label-width="70px">
        <el-form-item label="重新上传">
          <el-input v-model="selected.imagePath" placeholder="产品主图URL" disabled></el-input>
          <image-upload ref="imageUpload2" @onUpload="reSetURL" @onRemove="reRemoveImage"></image-upload>
        </el-form-item>
        <el-form-item label="产品名">
          <el-input v-model="selected.name" placeholder="请输入产品名"></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="selected.model" placeholder="请输入产品型号"></el-input>
        </el-form-item>
        <el-form-item label="产品详情">
          <el-input v-model="selected.detail" placeholder="请输入产品详情" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="产品长度">
          <el-input v-model="selected.length" placeholder="请输入产品长度，单位：厘米"></el-input>
        </el-form-item>
        <el-form-item label="产品宽度">
          <el-input v-model="selected.width" placeholder="请输入产品宽度，单位：厘米"></el-input>
        </el-form-item>
        <el-form-item label="产品高度">
          <el-input v-model="selected.height" placeholder="请输入产品高度，单位：厘米"></el-input>
        </el-form-item>
        <el-form-item label="产品总量">
          <el-input v-model="selected.weight" placeholder="请输入产品重量，单位：千克"></el-input>
        </el-form-item>
        <el-form-item label="传感器">
          <el-input v-model="selected.sensor" placeholder="请输入产品传感器信息"></el-input>
        </el-form-item>
        <el-form-item label="产品材质">
          <el-input v-model="selected.material" placeholder="请输入产品材质信息"></el-input>
        </el-form-item>
        <el-form-item label="产品电池">
          <el-input v-model="selected.battery" placeholder="请输入产品电池信息"></el-input>
        </el-form-item>
        <el-form-item label="电池续航">
          <el-input v-model="selected.batteryLife" placeholder="请输入产品电池续航时间，单位：小时"></el-input>
        </el-form-item>
        <el-form-item label="联网方式">
          <el-input v-model="selected.network" placeholder="请输入产品联网方式"></el-input>
        </el-form-item>
        <el-form-item label="数据传输">
          <el-input v-model="selected.dataLink" placeholder="请输入产品数据传输方式"></el-input>
        </el-form-item>
        <el-form-item label="更多信息">
          <el-input v-model="selected.more" placeholder="更多信息" type="textarea" rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateProduct">更新</el-button>
        <el-button @click="cancelUpdate" >取消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="addDialog"
      title="发布新的产品">
      <el-form :model="tobeAdd" label-width="70px">
        <el-form-item label="产品主图">
          <el-input v-model="tobeAdd.imagePath" placeholder="产品主图URL" disabled></el-input>
          <image-upload ref="imageUpload" @onUpload="setURL" @onRemove="removeImage"></image-upload>
        </el-form-item>
        <el-form-item label="产品名">
          <el-input v-model="tobeAdd.name" placeholder="请输入产品名"></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="tobeAdd.model" placeholder="请输入产品型号"></el-input>
        </el-form-item>
        <el-form-item label="产品详情">
          <el-input v-model="tobeAdd.detail" placeholder="请输入产品详情" type="textarea" rows="3"></el-input>
        </el-form-item>
        <el-form-item label="产品长度">
          <el-input v-model="tobeAdd.length" placeholder="请输入产品长度，单位：厘米"></el-input>
        </el-form-item>
        <el-form-item label="产品宽度">
          <el-input v-model="tobeAdd.width" placeholder="请输入产品宽度，单位：厘米"></el-input>
        </el-form-item>
        <el-form-item label="产品高度">
          <el-input v-model="tobeAdd.height" placeholder="请输入产品高度，单位：厘米"></el-input>
        </el-form-item>
        <el-form-item label="产品总量">
          <el-input v-model="tobeAdd.weight" placeholder="请输入产品重量，单位：千克"></el-input>
        </el-form-item>
        <el-form-item label="传感器">
          <el-input v-model="tobeAdd.sensor" placeholder="请输入产品传感器信息"></el-input>
        </el-form-item>
        <el-form-item label="产品材质">
          <el-input v-model="tobeAdd.material" placeholder="请输入产品材质信息"></el-input>
        </el-form-item>
        <el-form-item label="产品电池">
          <el-input v-model="tobeAdd.battery" placeholder="请输入产品电池信息"></el-input>
        </el-form-item>
        <el-form-item label="电池续航">
          <el-input v-model="tobeAdd.batteryLife" placeholder="请输入产品电池续航时间，单位：小时"></el-input>
        </el-form-item>
        <el-form-item label="联网方式">
          <el-input v-model="tobeAdd.network" placeholder="请输入产品联网方式"></el-input>
        </el-form-item>
        <el-form-item label="数据传输">
          <el-input v-model="tobeAdd.dataLink" placeholder="请输入产品数据传输方式"></el-input>
        </el-form-item>
        <el-form-item label="更多信息">
          <el-input v-model="tobeAdd.more" placeholder="更多信息" type="textarea" rows="5"></el-input>
        </el-form-item>
      </el-form>
      <div  slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addProduct">发布</el-button>
        <el-button type="success" @click="clean">重置</el-button>
        <el-button @click="addDialog = false" >取消</el-button>
      </div>
    </el-dialog>
    <el-card>
      <el-table
        :stripe="true"
        :data="product.slice((currentPage-1)*pageSize , (currentPage*pageSize))"
        max-height="window.innerHeight - 320"
        style="width: 100%">
        <el-table-column label="产品名" prop="name" align="center"></el-table-column>
        <el-table-column label="型号" prop="model" align="center"></el-table-column>
        <el-table-column label="发布时间" prop="date" align="center"></el-table-column>
        <el-table-column label="状态" prop="state" :formatter="formatBoolean" align="center"></el-table-column>
        <el-table-column label="意见" prop="checkInfo" align="center" :show-overflow-tooltip="true" width="70px">
        </el-table-column>
        <el-table-column label="审核人" prop="checkName" align="center"></el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="scope">
              <el-button
                :disabled="scope.row.state"
                @click="edit(scope.row)"
                type="primary"
                round
                icon="el-icon-edit"
                size="mini">
                修改
              </el-button>
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
      <el-col :span="19">
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
            @click="addDialog = true">
            发布新的产品<i class="el-icon-edit-outline el-icon--right"></i></el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ImageUpload from '../../common/ImageUpload.vue'
export default {
  components: { ImageUpload },
  inject: ['reload'],
  name: 'Product',
  data () {
    return {
      product: [],
      selected: {},
      tobeAdd: {
        name: '',
        model: '',
        imagePath: '',
        detail: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        sensor: '',
        material: '',
        battery: '',
        batteryLife: '',
        network: '',
        dataLink: '',
        more: ''
      },
      addDialog: false,
      editDialog: false,
      currentPage: 1,
      pageSize: 5,
      total: 1
    }
  },
  mounted () {
    this.findAll()
  },
  methods: {
    findAll () {
      this.$axios
        .post('/admin/findAllById', {
          releaseName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.product = result.data.data
            this.total = result.data.data.length
          }
        })
    },
    addProduct () {
      if (this.tobeAdd.name === '' || this.tobeAdd.model === '') {
        this.$message.warning('关键信息未填写！')
      } else {
        this.$axios
          .post('/admin/addProduct', {
            name: this.tobeAdd.name,
            model: this.tobeAdd.model,
            imagePath: this.tobeAdd.imagePath,
            detail: this.tobeAdd.detail,
            length: this.tobeAdd.length,
            width: this.tobeAdd.width,
            height: this.tobeAdd.height,
            weight: this.tobeAdd.weight,
            sensor: this.tobeAdd.sensor,
            material: this.tobeAdd.material,
            battery: this.tobeAdd.battery,
            batteryLife: this.tobeAdd.batteryLife,
            network: this.tobeAdd.network,
            dataLink: this.tobeAdd.dataLink,
            more: this.tobeAdd.more,
            releaseName: this.$store.state.username
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('发布成功')
              this.addDialog = false
              this.clean()
              this.reload()
            }
          })
      }
    },
    updateProduct () {
      if (this.selected.name === '' || this.selected.model === '') {
        this.$message.warning('关键信息未填写！')
      } else {
        this.$axios
          .post('/admin/updateProduct', {
            id: this.selected.id,
            name: this.selected.name,
            model: this.selected.model,
            imagePath: this.selected.imagePath,
            detail: this.selected.detail,
            length: this.selected.length,
            width: this.selected.width,
            height: this.selected.height,
            weight: this.selected.weight,
            sensor: this.selected.sensor,
            material: this.selected.material,
            battery: this.selected.battery,
            batteryLife: this.selected.batteryLife,
            network: this.selected.network,
            dataLink: this.selected.dataLink,
            more: this.selected.more,
            releaseId: this.selected.releaseId
          })
          .then(result => {
            if (result.data.code === 200) {
              this.$message.success('更新成功')
              this.editDialog = false
              this.clean()
              this.reload()
            }
          })
      }
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
    preConfirm (product) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delete(product)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    delete (product) {
      this.$axios
        .post('/admin/deleteById', {
          id: product.id
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
    edit (product) {
      this.selected = product
      this.editDialog = true
    },
    currentChange (page) {
      this.currentPage = page
    },
    setURL () {
      this.tobeAdd.imagePath = this.$refs.imageUpload.url
    },
    reSetURL () {
      this.selected.imagePath = this.$refs.imageUpload2.url
    },
    removeImage () {
      this.$axios
        .post('/admin/removeImage', {
          url: this.tobeAdd.imagePath
        })
        .then(result => {
        })
      this.$refs.imageUpload.url = ''
      this.tobeAdd.imagePath = ''
    },
    reRemoveImage () {
      this.$axios
        .post('/admin/removeImage', {
          url: this.selected.imagePath
        })
        .then(result => {
        })
      this.$refs.imageUpload2.url = ''
      this.selected.imagePath = ''
    },
    clean () {
      this.tobeAdd = {}
    },
    cancelUpdate () {
      this.editDialog = false
      this.reload()
    }
  }
}
</script>
