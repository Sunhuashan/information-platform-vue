<template>
  <div>
    <div>
      <Header
        ref="header"
        @onNewsRes="setNewsRes"
        @onAnnoRes="setAnnoRes"
        @onResearchRes="setResearchRes"></Header>
    </div>
    <div>
    <router-view/>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import Header from '../home/Header.vue'

export default {
  components: { Header },
  name: 'Home',
  data () {
    return {
      newsRes: [],
      annoRes: [],
      researchRes: []
    }
  },
  methods: {
    setNewsRes () {
      this.newsRes = this.$refs.header.newsRes
    },
    setAnnoRes () {
      this.annoRes = this.$refs.header.annoRes
    },
    setResearchRes () {
      this.researchRes = this.$refs.header.researchRes
    }
  }
}
</script>
