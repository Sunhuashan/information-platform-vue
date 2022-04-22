<template>
  <div>
    <div>
      <Header></Header>
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
  name: 'Home'
}
</script>
