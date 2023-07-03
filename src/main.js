import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'


let mock=false
if(mock){
    require('./mock/api')
}

axios.defaults.baseURL = '/api'//api即vue.config.js 中配置的地址，作为前缀，调用axios时只需要写部分url与前缀拼接在一起
axios.defaults.timeout=8000//超时时间设置

axios.interceptors.response.use(function (response) {//响应拦截
    let res = response.data;
    if (res.status == 0) {
        return res.data;
    } else if (res.status == 10) {//拦截未登录错误 
        window.location.href = '/#/login'

    }else{
        alert(res.msg)
    }

})
createApp(App).use(store).use(router).mount('#app')

