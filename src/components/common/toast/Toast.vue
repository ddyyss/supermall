<template>
  <div class="toast" v-show="isshow">
    <div >{{message}}</div>
  </div>
</template>


<script>
export default {
  name:'Toast',
  components:{},
  props:{
    
  },
  data(){
    return {
      message:"",
      isshow:false
    }
  },
  watch:{},
  computed:{},
  methods:{
    show(message="默认文字",delay=1000){
      this.isshow=true;
      this.message=message;

      setTimeout(()=>{
         this.isshow=false;
      this.message="";
      },delay)
    }
  },
  created(){},
  mounted(){}
}

</script>
<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 8px 10px;
  transform: translate(-50%,-50%);
  color: #fff;
  background-color:rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>