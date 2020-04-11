<template>
  <div class="cart-list">
     <scroll class="content" ref="content">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item" @deleteItem="deleteItem"></cart-list-item>
     </scroll>
  </div>
</template>


<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'
export default {
  name:'CartList',
  components:{
    Scroll,
    CartListItem
  },
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{
    ...mapGetters(['cartList'])
  },
  methods:{
    //购物车删除
    deleteItem(iid){
        this.cartList.forEach((item,index) => {
            if(item.iid===iid){
              if(item.count>1){
                item.count-=1
              }else{
                this.cartList.splice(index,1)
              }
            }
        });
        
    }
  },
  created(){},
  mounted(){},
  activated() {
    this.$refs.content.refresh()
  },
}

</script>
<style scoped>
.content{
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>