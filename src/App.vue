<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 路由组件展示区域 -->
    <router-view></router-view>
    <!-- 下部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>

<style scoped>

</style>
