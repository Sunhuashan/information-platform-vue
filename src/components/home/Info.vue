<template>
  <div>
    <h2>个人信息测试</h2>
    <div>{{user}}</div>
  </div>
</template>
<script>
export default {
  name: 'Info',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.user = this.$store.state.general_username
  }
}
</script>
