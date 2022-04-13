<template>
  <div>
        <el-carousel height="calc(100vh - 16px)">
          <el-carousel-item>
            <el-image></el-image>
          </el-carousel-item>
        </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'Test',
  date () {
    return {
      image: {url: '../../assets/img/test1.jpg'}
    }
  }
}
</script>
