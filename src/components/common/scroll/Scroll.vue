<template>
  <!-- ref如果绑定的是一个组件对象 那么通过this.$refs.refname获取到的是一个组件对象 -->
   <!-- ref如果绑定的在普通的元素中 那么通过this.$refs.refname获取到的是一个元素对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import BScroll from 'better-scroll'
export default {
  name:'',
  components:{},
  props:{
    probeType:{
      type:Number,
      default:0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  watch:{},
  computed:{},
  methods:{
    scrollTo(x,y,time=300){
     this.scroll && this.scroll.scrollTo(x,y,time)
    },
    refresh(){
     this.scroll && this.scroll.refresh();
    },
    finishPullUp(){
    this.scroll && this.scroll.finishPullUp();
    },
    /* getScrollY(){
      return this.scroll ? this.scroll.y :0
    } */
    
  },
  created(){},
  mounted(){
    //probe侦测
    //0和1都是不侦测实时位置
    //2.在手指滚动的过程中侦测 在手指离开后的惯性中不侦测
    //3.只要是滚动就侦测
    this.scroll=new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
     
    })
    
    //实时监听滚动的位置
    this.scroll.on("scroll",(position)=>{
        this.$emit("scroll",position)
    })

    //监听滚动到底部
    if(this.pullUpLoad){
      this.scroll.on("pullingUp",()=>{
        this.$emit("pullingUp")
      })
    }
    
  }
}

</script>
<style scoped>

</style>