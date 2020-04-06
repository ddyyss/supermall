<template>
  <div id="home">
      <nav-bar class="home-nav">
        <div slot="center" >购物街</div>
      </nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends" ></recommend-view>
  </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSiper'
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata} from 'network/home'


export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView
  },
  props:{},
  data(){
    return {
      banners:[],
      recommends:[]
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){
    //请求多个数据
    getHomeMultidata().then(res=>{
      console.log(res);
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
    })
  },
  mounted(){}
}

</script>
<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: white;
}
</style>