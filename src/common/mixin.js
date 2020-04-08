import {debounce} from './utils'
export const itemListenerMixin={
  data() {
    return {
      itemimageListener:null
    }
  },
  mounted() {
    const newrefresh=debounce(this.$refs.scroll.refresh,100)
    //监听item图片加载完成
    this.itemimageListener = () =>{ 
      newrefresh();
    }
    this.$bus.$on("itemImageLoad",this.itemimageListener)
  },
}