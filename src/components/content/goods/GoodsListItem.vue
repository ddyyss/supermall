<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad"><!--  @load 监听图片加载完成 -->
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">￥{{goodsItem.prcie}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>


<script>
export default {
  name:'GoodsListItem',
  components:{},
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{
    showImage(){
      return  this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    //原生js监听图片加载完 img.onload=function(){}
    //vue 监听图片加载完  @load =xxx
    //$bus事件总线 this.$bus.$emit发射  this.$bus.on监听到
    imageLoad(){
      this.$bus.$emit('itemImageLoad')
    },
    itemClick(){
      
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  },
  created(){
    //console.log(this.goodsItem.length);
    
  },
  mounted(){}
}

</script>
<style scoped>
.goods-item{
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>