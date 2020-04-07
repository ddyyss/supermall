<template>
 <div>
   <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </swiper-item>
      </swiper>
 </div>
</template>


<script>
import {Swiper,SwiperItem} from 'common/swiper'
export default {
  name:'',
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  watch:{},
  computed:{},
  methods:{
    imageLoad(){
      //只执行一次
      if(!this.isLoad){
        this.$emit("swiperImageLoad")
        this.isLoad=true
      } 
    }
  },
  created(){},
  mounted(){}
}

</script>
<style scoped>

</style>