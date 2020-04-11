<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>

    <cart-button-bar></cart-button-bar>
  </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartButtonBar from './childComps/CartButtonBar'
import {mapGetters} from 'vuex'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartButtonBar
  },
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{
     /* cartLength(){
       return this.$store.getters.cartLength
     } */
     //两种
      ...mapGetters(["cartLength"])
     /* ...mapGetters({
       length:"cartLength"
     }) */
  },
  methods:{},
  created(){},
  mounted(){}
}

</script>
<style scoped>
.cart{
  height: 100%;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  
}
</style>