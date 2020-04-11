<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleIndex" ref="nav" ></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @goodsimgload="goodsimgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comments"></detail-comment-info>
      <goods-list :goods="recommend" ref="goods"></goods-list>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>


<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getdetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import {debounce} from '../../common/utils'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import {itemListenerMixin,backTopMixin} from '../../common/mixin'
import DetailBottomBar from './childComps/DetailBottomBar'
import { mapActions } from 'vuex'

//import Toast from 'components/common/toast/Toast'



export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    
  
  },
  props:{},
  mixins:[itemListenerMixin,backTopMixin],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopY:[],
      getthemeTopY:null,
      currentIndex:0,
      isShow:false,
      /* message:"哈哈哈",
      show:false */
      
      
      
    }
  },
  watch:{},
  computed:{
    
  },
  methods:{  
  ...mapActions(['addCart']),
   goodsimgLoad(){  
     //用的是mixin中的this.newrefresh()
      this.newrefresh();
      //在图片加载完成后获取offsetTop
      this.getthemeTopY();
   },
   titleIndex(index){
     this.$refs.scroll.scrollTo(0,-this.themeTopY[index],200)
   },
   //监听实时滚动的位置
   contentScroll(position){
     //获取Y值
     const positionY=-position.y
     //对比获取currentIndex
     let length=this.themeTopY.length
     //第一种
     /* this.themeTopY.forEach((value,index) => {
       if(this.currentIndex !==index &&((index<length-1 && positionY>=this.themeTopY[index]&& positionY < this.themeTopY[index+1] ) || 
       (index===length-1 && positionY>=this.themeTopY[index]))){
         this.currentIndex=index;
        this.$refs.nav.currentIndex=this.currentIndex
          
       }
     }); */
     //第二种  
     //先在this.themeTopY 的最后以为加一个最大值 Number.MAX_VALUE
      for(let i =0;i<length-1;i++){
          if(this.currentIndex !== i &&(positionY>=this.themeTopY[i] && positionY < this.themeTopY[i+1])){
          this.currentIndex=i;
          this.$refs.nav.currentIndex=this.currentIndex
          }
      }
      //是否显示回到顶部
      this.listenerShow(position);
    
   },
   addToCart(){
      //获取购物车需要展示的信息
      const product={};
      product.image=this.topImages[0];
      product.title=this.goods.title;
      product.desc=this.goods.desc;
      product.price=this.goods.realPrice;
      product.iid=this.iid;
      

      //将商品加入购物车 并且返回添加成功 1.Pormise 2.mapActions
      //mutations 传入mutations中
      //this.$store.commit("addCart",product)
      //actions 传入actions中
      //第一种
      /* this.$store.dispatch("addCart",product).then(res=>{
        console.log(res);
        
      }) */
      //第二种
      //用mapActions  ---79行
      this.addCart(product).then(res=>{
        /* this.show=true;
        this.message=res;
        setTimeout(()=>{
          this.show=false;
          this.message=""
        },1500) */
        this.$toast.show(res,1500)
      })
   }
    
  },
  created(){
    //保存传入的iid
    this.iid=this.$route.params.iid;
    //根据iid请求数据
    getdetail(this.iid).then(res=>{
      //console.log(res);
      const data=res.result;
      //获取轮播图的数据
      this.topImages=data.itemInfo.topImages;
      //获取商品的信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取店铺的信息
      this.shop=new Shop(data.shopInfo)
      //保存商品的详情数据  
      this.detailInfo=data.detailInfo
      //获取参数信息
      this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
      if(data.cRate !==0){
        this.commentInfo=data.rate.list[0]
      }

      //第一次 this.$refs.params.$el 没有渲染根本取不到值
        /* this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comments.$el.offsetTop)
      this.themeTopY.push(this.$refs.goods.$el.offsetTop)
      console.log(this.themeTopY); */

      //第二次 值不对的原因
      //根据最新的数据，对应的DOM是已经呗渲染出来了
      //但是图片还没有呗加载完（目前取到的offsetTop不包含其中的图片）
      //offsetTop值不对的时候 因为图片的问题
      /* this.$nextTick(()=>{
      this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comments.$el.offsetTop)
      this.themeTopY.push(this.$refs.goods.$el.offsetTop)
      console.log(this.themeTopY);
      }) */
      
    })
    //获取详情页
    getRecommend().then(res=>{
      this.recommend=res.data.list
       //console.log(this.recommend);
    })
    //图片加载完成后执行获取数据函数
    this.getthemeTopY=debounce(()=>{
      this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comments.$el.offsetTop)
      this.themeTopY.push(this.$refs.goods.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)
      //console.log(this.themeTopY); 
    },100)
  },
  mounted(){
   /* const newrefresh=debounce(this.$refs.scroll.refresh,100)
    //监听item图片加载完成
    this.itemimageListener = () =>{ 
      newrefresh();
    } */
    //加载完成后重新刷新 bscroll的高度 
    //this.$bus.$on("goodsimgLoad",this.itemimageListener)
    //这个用mixin混入 因为用的地方很多
    //this.$bus.$on("itemImageLoad",this.itemimageListener)
    
  },
  updated() {
     /*  this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comments.$el.offsetTop)
      this.themeTopY.push(this.$refs.goods.$el.offsetTop)
      console.log(this.themeTopY); */
      
  },
  deactivated() {
    //this.$bus.$off()
  },
  destroyed() {
    //console.log("-----");
  },
}

</script>
<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  height: 44px;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
  position: relative;
}
</style>