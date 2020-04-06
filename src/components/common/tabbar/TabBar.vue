<template>
   <div id="tab-bar">
      <slot></slot>
    </div>
</template>


<script>
export default {
  components:{},
  props:{},
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
 #tab-bar{
  display: flex;
  background-color: #f5f0f0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  
}

</style>