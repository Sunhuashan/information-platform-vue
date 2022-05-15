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
    <el-row style="margin: 20px;text-align: left;">
      <div style="font-size: 25px;font-weight: bold;">
        公司产品
      </div>
    </el-row>
    <el-row>
      <el-col :span="11" style="margin: 5px 25px"  v-for="(item,i) in product" :key="i" >
        <el-card>
          <img :src="item.imagePath" class="image">
          <div style="margin: 3px">
            <span class="news_title">{{item.name}}</span>
            <el-row>
              <div style="float: right">
                <el-button type="text" @click="setSelected(item)">了解更多...</el-button>
              </div>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      product: [],
      selectedProduct: {},
      dialogVisible: false
    }
  },
  created () {
    this.findAllProduct()
  },
  methods: {
    findAllProduct () {
      let _this = this
      _this.$axios
        .get('/admin/findAllProduct')
        .then(result => {
          if (result.data.code === 200) {
            _this.product = result.data.data
          }
        })
    },
    setSelected (thisProduct) {
      this.selectedProduct = thisProduct
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped>
  .image {
    object-fit: cover;
    width: 100%;
    height: 70vh;
  }
  .news_title {
    font-weight: bolder;
    font-size: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
    width:55vh;
    display:block;
    margin: 5px;
  }
</style>
