import Toast from './Toast.vue'

const obj={}
obj.install=function(Vue){
  /* console.log("执行了函数");
  console.log(Toast.$el);//undefined */
  //1.创建组件构造器
  const toastContrustor =Vue.extend(Toast)
  //2.new的方式 根据组件构造器 可以创建出来一个组件对象
  const toast =new toastContrustor()
  //3.将组件对象，手动挂载到摸一个元素上
  toast.$mount(document.createElement("div"))
  //4.toast.$el对应的就是div
  //console.log(toast.$el);
  
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast=toast;
}

export default obj