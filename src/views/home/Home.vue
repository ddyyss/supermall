<template>
  <div id="home" class="wrapper">
      <nav-bar class="home-nav">
        <div slot="center" >购物街</div>
      </nav-bar>
      <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="fixed" v-show="isFixedShow"></tab-control>
     <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"
              :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends" ></recommend-view>
        <feature-view></feature-view>
        <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
     </scroll>
     <back-top @click.native="backClick" v-show="isShow"></back-top>

     
  </div>
</template>


<script>
//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'


//子组件
import HomeSwiper from './childComps/HomeSiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from '../../common/utils'
import {itemListenerMixin,backTopMixin} from '../../common/mixin'




export default {
  name:'Home',
  components:{
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    
    
  },
  props:{},
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        "pop":{page:0,list:[]},
        "new":{page:0,list:[]},
        "sell":{page:0,list:[]}
      },
      currentTpye:"pop",
      tabOffsetTop:0,
      isFixedShow:false,
      saveY:0,
      
    }
  },
  watch:{},
  computed:{
    showGoods(){
      return this.goods[this.currentTpye].list
    }
  },
  
  created(){
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    
  },
  methods:{
    /* 网络请求相关的方法 */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      
      this.banners=res.data.banner.list;
      this.recommends=res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1;
      
      //完成上啦加载更多
        this.$refs.scroll.finishPullUp();
    })},
    /* 事件监听相关的方法 */
    tabClick(index){
      /* switch(index){
        case 0:
          this.currentTpye='pop'
          break
        case 1:
          this.currentTpye='sell'
          break
        case 2:
          this.currentTpye='new'
          break
      } */
      this.currentTpye=Object.keys(this.goods)[index];
      //console.log(Object.keys(this.goods));// ["pop", "new", "sell"]
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    
    //回到顶部按钮的显示和隐藏
    contentScroll(position){
      //console.log(position);
      /* if(-position.y>800){
        this.isShow=true
      } */
      this.listenerShow(position)
      this.isFixedShow= -position.y >538
    },

    //底部加载更多
    loadMore(){
      this.getHomeGoods(this.currentTpye)  
    },
    swiperImageLoad(){
      //获取tabControl的offsetTop
    //所有的组件都有一个属性$el 用户获取组件中的元素
      //console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    }
    
  },
  mounted(){
    //用mixin混入
   /*  //监听item图片加载完成
    const refresh=debounce(this.$refs.scroll.refresh,5)
    
    //保存监听事件
    this.itemimageListener=()=>{
      //加载完成后重新刷新 bscroll的高度 
      refresh()
    }
    this.$bus.$on("itemImageLoad",this.itemimageListener) */
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY=this.$refs.scroll.scroll.y;
    this.$bus.$off("itemImageLoad",this.itemimageListener)
  },
}

</script>

<style scoped>
/* scoped  表示只对当前组件起效果 */
#home{
  
  height: 100vh;
  position: relative;
 
}
.home-nav{
  background-color: var(--color-tint);
  color: white;
  /* 原生滚动的时候为了让导航在最上面 但是现在是 bs 滚动  原生的不会滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content{
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.fixed{
  position: relative;
  z-index: 9;
}
/* .content{
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>