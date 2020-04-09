<template>
  <div class="check-button" :class="{active:isActive}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>


<script>
export default {
  name:'CheckButton',
  components:{},
  props:{
    isActive:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}

</script>
<style scoped>
.check-button{
  /* background-color: red; */
  border-radius: 50%;
  border: 1px solid #aaa;
}
.active{
  background-color: var(--color-tint);
}
</style>