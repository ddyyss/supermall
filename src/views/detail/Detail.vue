<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <goods-list :goods="recommend"></goods-list>
    </scroll>
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
import {itemListenerMixin} from '../../common/mixin'

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
    GoodsList
  },
  props:{},
  mixins:[itemListenerMixin],
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
      
      
      
    }
  },
  watch:{},
  computed:{
    
  },
  methods:{  
   /* goodsimgLoad(){
     debounce(this.$refs.scroll.refresh,200)();
     //this.$refs.scroll.refresh();
   } */
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
    })
    //获取详情页
    getRecommend().then(res=>{
     
      
      this.recommend=res.data.list
       //console.log(this.recommend);
    })
    
    
  },
  mounted(){
   /* const newrefresh=debounce(this.$refs.scroll.refresh,100)
    //监听item图片加载完成
    this.itemimageListener = () =>{ 
      newrefresh();
    } */
    //加载完成后重新刷新 bscroll的高度 
    this.$bus.$on("goodsimgLoad",this.itemimageListener)
    console.log("---");
    
    //这个用mixin混入 因为用的地方很多
    //this.$bus.$on("itemImageLoad",this.itemimageListener)
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
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px);
}
</style>