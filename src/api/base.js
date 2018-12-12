import axios from 'axios';
import qs from 'qs'
import {baseHost} from '../utils/config.js'

const instance = axios.create({
  baseURL:baseHost,
  timeout:5000,
})
instance.defaults.withCredentials  = true // 每次请求携带cookie信息 ：目的为了保持session一致

//处理表单post请求
instance.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
})


// 接口错误拦截
instance.interceptors.response.use(response => {
  console.log(response)
  console.log("~~~~~~~~~~~~~~~~")
  if(response.data.code === 6){
    app.$message.warning("权限不足")
    return false
  }
  return response
}, err => {
  app.$confirm('用户过期,返回登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    app.$router.push({name: 'login'})
  }).catch(()=>{
    app.$router.push({name: 'login'})
  })
  return Promise.reject(err)
})

export {instance}
