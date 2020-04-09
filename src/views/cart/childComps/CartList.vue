<template>
  <div class="cart-list">
     <scroll class="content" ref="content">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
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
  methods:{},
  created(){},
  mounted(){},
  activated() {
    this.$refs.content.refresh()
  },
}

</script>
<style scoped>
.content{
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>