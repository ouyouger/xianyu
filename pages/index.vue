<template>
  <div class="xyly_index">
<div class="index_carousel">
<el-carousel height="700px">
<el-carousel-item 
v-for="(item,index) in swiperList"
            :key="index"
            >
<div :style="`background:url(${$axios.defaults.baseURL+item.url}) center center  ; height:700px;`"></div>
</el-carousel-item>
</el-carousel>
 <!-- tabs 栏 -->
 <div class="index_tabs">
<TypesTab/>
 </div>
 <!-- tabs栏 结束 -->
</div>
  </div>
</template>

<script>
import TypesTab from '@/components/index/TypesTab'
export default {
data(){
  return{
    swiperList:[]
  }
},
 asyncData(context){
   const $axios =context.app.$axios;
   return $axios.get('/scenics/banners').then(res=>{
     return{
       swiperList:res.data.data
     }
   })
 },
 components:{
   TypesTab
 }
}
</script>

<style  lang="less" scoped  >
.xyly_index{
  min-width: 1000px;
}
.index_carousel {
  position: relative;
  .index_tabs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
}
</style>