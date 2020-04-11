import axios from 'axios'
export function request(config){
  //创建axios实例
  const instnce=axios.create({
    baseURL:"http://123.207.32.32:8000/api/h8",
    timeout:5000
  })
  //axios拦截器
  //请求拦截的作用
  /* 
    1.比如config中的一些信息不符合服务器的要求
    2.比如每次发送网络请求的时候都希望在界面中显示一个正在请求中的图标
    3.某些网络请求 比如登陆（token）  必须携带一些特殊的信息
  */
  instnce.interceptors.request.use(config=>{
    
    return config
  },err=>{
    console.log(err);
  });
  //响应拦截
  instnce.interceptors.response.use(res=>{
    
    return res.data
  },err=>{
    console.log(err);  
  });
  //返回网络请求
  return instnce(config)
   
}