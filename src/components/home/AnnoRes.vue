<template>
  <div>
    <el-row style="margin: 20px;text-align: left;">
      <div style="font-size: 25px;font-weight: bold;">
        通知公告
      </div>
    </el-row>
    <div>
      <el-row style="margin: 40px" v-for="(item,i) in anno" :key="i">
        <el-col :span="2">
          <div class="anno_date">
            <div class="anno_month">{{item.annoDate.slice(0,7)}}</div>
            <div class="anno_day">{{item.annoDate.slice(8,10)}}</div>
          </div>
        </el-col>
        <el-col :span="22" id="item.id">
          <div class="anno_content">{{item.annoContent}}</div>
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
      anno: []
    }
  },
  mounted () {
    this.anno = this.$parent.annoRes
  },
  created () {
    Bus.$on('annoRes', (val) => {
      this.anno = val
    })
  }
}
</script>
<style scoped>
  .anno_date {
    margin-top: 5px;
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
    font-size: 18px;
    height: 5vh;
    display:block;
    margin: 2px;
  }
</style>
