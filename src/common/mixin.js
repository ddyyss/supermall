import {debounce} from './utils'
import BackTop from 'components/content/backtop/BackTop'
export const itemListenerMixin={
  data() {
    return {
      itemimageListener:null,
      newrefresh:null
    }
  },
  mounted() {
     this.newrefresh=debounce(this.$refs.scroll.refresh,100)
    //监听item图片加载完成
    this.itemimageListener = () =>{ 
      this.newrefresh();
    }
    this.$bus.$on("itemImageLoad",this.itemimageListener)
  },
}
export const backTopMixin={
  data() {
    return {
      isShow:false
    }
  },
  methods: {
    backClick(){
      //回到顶部
      this.$refs.scroll.scrollTo(0,0)
    },
    listenerShow(position){
      this.isShow = -position.y > 800
    }
  },
  components:{
    BackTop
  } 
}