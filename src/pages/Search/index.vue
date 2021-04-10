<!--
 * @Author: your name
 * @Date: 2021-04-10 13:02:22
 * @LastEditTime: 2021-04-10 21:50:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\pages\Home\index.vue
-->
<template>
  <div>
      <h2>Search --- {{$route.params.keyword}} --- {{$route.query.keyword1}}</h2>
      <h2>Search --- {{keyword}} --- {{keyword1}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword','keyword1']
}
</script>

<style lang="less" scoped>

</style>
