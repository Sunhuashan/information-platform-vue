<template>
  <div>
    <div>
    <el-row style="margin: 20px;text-align: left;" v-if="paper.length !== 0">
      <div id="论文发表" style="font-size: 25px;font-weight: bold;">
        论文发表
      </div>
    </el-row>
    <el-row align="left">
      <div v-for="(item,i) in paper" :key="i" style="margin: 12px">{{i+1}}.{{item.content}}</div>
    </el-row>
    <el-row style="margin: 20px;text-align: left;" v-if="design.length !== 0">
      <div id="发明专利" style="font-size: 25px;font-weight: bold;">
        发明专利
      </div>
    </el-row>
    <el-row align="left">
      <div v-for="(item,i) in design" :key="i" style="margin: 12px">{{i+1}}.{{item.content}}</div>
    </el-row>
    <el-row style="margin: 20px;text-align: left;" v-if="award.length !== 0">
      <div id="获奖信息" style="font-size: 25px;font-weight: bold;color:">
        获奖信息
      </div>
    </el-row>
    <el-row align="left">
      <div v-for="(item,i) in award" :key="i" style="margin: 12px">{{i+1}}.{{item.content}}</div>
    </el-row>
  </div>
  </div>
</template>
<script>
import Bus from '../../bus.js'
export default {
  data () {
    return {
      research: [],
      paper: [],
      design: [],
      award: []
    }
  },
  mounted () {
    this.research = this.$parent.researchRes
    this.init()
  },
  created () {
    Bus.$on('researchRes', (val) => {
      this.research = val
      this.init()
    })
  },
  methods: {
    init () {
      this.paper = []
      this.design = []
      this.award = []
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
  }
}
</script>
