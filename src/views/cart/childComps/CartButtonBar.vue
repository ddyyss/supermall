<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isActive="isSlectAll" @click.native="checkClick" ></check-button>
      <span @click="totalsel">全选</span>
    </div>

    <div class="price">
      合计{{totalPrice}}
    </div>

    <div class="calculate" @click="calcuClick">
      去结算({{checkLength}})
    </div>
  </div>
</template>


<script>
import CheckButton from 'content/checkbutton/CheckButton'
import {mapGetters} from 'vuex'
export default {
  name:'',
  components:{
    CheckButton
  },
  props:{
    
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return "￥" + this.cartList.filter(item=>{
        return item.isChecked
      }).reduce((pre,item)=>{
        return  pre+item.price * item.count
      },0).toFixed(2)
    },
    checkLength(){
      return this.cartList.filter( item =>{
        return item.isChecked
      }).length;
    },
    isSlectAll(){
      if(this.cartList.length == 0){
        return false
      }else{
      //如果有未选中的 全选按钮为false
      //return !(this.cartList.filter(item=> !item.isChecked).length)
      return !(this.cartList.find(item=> !item.isChecked))
      }
      
    }
  },
  methods:{
    totalsel(){
      this.cartList.forEach((item,index) => {
        item.isChecked=true
      });
    },
    checkClick(){
      if(this.isSlectAll){
        this.cartList.forEach(item=>{
          item.isChecked=false
        })
      }else{
        this.cartList.forEach(item=>{
          item.isChecked=true
        })
      }
    },
    calcuClick(){
      if(!this.isSlectAll){
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
  created(){},
  mounted(){}
}

</script>
<style scoped>
.bottom-bar{
  position: relative;
  display: flex;
   height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}
.check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price{
  margin-left: 20px;
  flex: 1;
}
.calculate{
  margin-left: 30px;
  width: 90px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>