<!--
 * @Author: your name
 * @Date: 2021-04-10 13:02:22
 * @LastEditTime: 2021-04-12 10:51:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulishop-client\src\pages\Home\index.vue
-->
<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Ranks></Ranks>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Ranks from './Ranks'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  },
  components:{
    ListContainer,
    Recommend,
    Ranks,
    Like,
    Floor,
    Brand
  },
  mounted(){
    this.$store.dispatch('getFloorList')
  }
}
</script>

<style lang="less" scoped>

</style>
