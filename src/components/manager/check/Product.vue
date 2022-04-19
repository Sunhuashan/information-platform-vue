<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="产品详情">
      <el-form :model="selectedProduct" label-width="100px" >
        <el-form-item label="产品主图">
          <el-card style="text-align: center;width: 180px" >
            <el-image
              style="width: 110px; height: 110px"
              :src="selectedProduct.imagePath"></el-image>
          </el-card>
        </el-form-item>
        <el-form-item label="产品名">
          <el-input v-model="selectedProduct.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="selectedProduct.model" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品详情">
          <el-input v-model="selectedProduct.detail" type="textarea" rows="3" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品长度">
          <el-row>
            <el-col :span="22">
              <el-input v-model="selectedProduct.length" disabled></el-input>
            </el-col>
            <el-col :span="2" style="text-align: center">
              <span>厘米</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="产品宽度">
          <el-row>
            <el-col :span="22">
              <el-input v-model="selectedProduct.width" disabled></el-input>
            </el-col>
            <el-col :span="2"  style="text-align: center">
              <span>厘米</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="产品高度">
          <el-col :span="22">
            <el-input v-model="selectedProduct.height" disabled></el-input>
          </el-col>
          <el-col :span="2"  style="text-align: center">
            <span>厘米</span>
          </el-col>
        </el-form-item>
        <el-form-item label="产品重量">
          <el-col :span="22">
            <el-input v-model="selectedProduct.weight" disabled></el-input>
          </el-col>
          <el-col :span="2"  style="text-align: center">
            <span>千克</span>
          </el-col>
        </el-form-item>
        <el-form-item label="传感器">
          <el-input v-model="selectedProduct.sensor" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品材质">
          <el-input v-model="selectedProduct.material" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品电池">
          <el-input v-model="selectedProduct.battery" disabled></el-input>
        </el-form-item>
        <el-form-item label="电池续航">
          <el-row>
            <el-col :span="22">
              <el-input v-model="selectedProduct.batteryLife" disabled></el-input>
            </el-col>
            <el-col :span="2"  style="text-align: center">
              <span>小时</span>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="联网方式">
          <el-input v-model="selectedProduct.network" disabled></el-input>
        </el-form-item>
        <el-form-item label="数据传输">
          <el-input v-model="selectedProduct.dataLink" disabled></el-input>
        </el-form-item>
        <el-form-item label="更多信息">
          <el-input v-model="selectedProduct.more" type="textarea" rows="5" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-card>
      <el-table
        stripe
        :data="product.slice((currentPage-1)*pageSize,(currentPage*pageSize))">
        <el-table-column label="产品名" prop="name" align="center"></el-table-column>
        <el-table-column label="型号" prop="model" align="center"></el-table-column>
        <el-table-column label="发布人" prop="releaseName" align="center"></el-table-column>
        <el-table-column label="发布日期" prop="date" align="center"></el-table-column>
        <el-table-column label="查看详细信息" align="center">
          <div slot-scope="scope">
            <el-button
              @click="setSelected(scope.row)"
              type="primary"
              size="mini"
              round>
              查看<i class="el-icon-view el-icon--right"></i>
            </el-button>
          </div>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="update(scope.row)"
              v-model="scope.row.state"
              active-color="#13ce66"
              active-text="发布"
              inactive-text="未审核">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
  </div>
</template>
<script>
export default {
  name: 'CheckProduct',
  data () {
    return {
      product: [],
      pageSize: 5,
      currentPage: 1,
      total: 1,
      selectedProduct: {},
      dialogVisible: false
    }
  },
  mounted () {
    this.findProduct()
  },
  methods: {
    findProduct () {
      let _this = this
      _this.$axios
        .get('/admin/findAllProduct')
        .then(result => {
          if (result.data.code === 200) {
            _this.product = result.data.data
            _this.total = result.data.data.length
          }
        })
    },
    currentChange (page) {
      this.currentPage = page
    },
    update (product) {
      this.$axios
        .post('/admin/updateProductState', {
          id: product.id,
          state: product.state,
          checkName: this.$store.state.username
        })
        .then(result => {
          if (result.data.code === 200) {
            this.$message.success('状态更新成功！')
          } else {
            this.$message.warning(result.data.message)
          }
        })
    },
    setSelected (product) {
      this.selectedProduct = product
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>
</style>
