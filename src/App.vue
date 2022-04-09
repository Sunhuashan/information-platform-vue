<template>
  <div id="app" v-if="isRouterAlive">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isRouterAlive: true
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload: function () {
      this.isRouterAlive = false
      this.$nextTick(function () { this.isRouterAlive = true })
    }
  }
}
</script>
