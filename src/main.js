import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookies from 'vue-cookies'
import { ElMessage } from 'element-plus'
// import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/scss';



let mock=false
if(mock){
    require('./mock/api')
}



axios.defaults.baseURL = '/api'//api即vue.config.js 中配置的地址，作为前缀，调用axios时只需要写部分url与前缀拼接在一起
axios.defaults.timeout=8000//超时时间设置

axios.interceptors.response.use(function (response) {//响应拦截
    let res = response.data;
    let path = location.hash;
    // 业务问题拦截


    //当前页面为index时，不跳转
    if (res.status == 0) {
        
        return res.data;
    } else if (res.status == 10) {//拦截未登录错误 
        if (path != '#/index' ) {
           
           
            window.location.href = '/#/login'
            
           
            
        }
        //防止返回错误结果
        return Promise.reject(res)
        
    }else{
        alert(res.msg)
        // Message.warning(res.msg)
        return Promise.reject(res)
    }
    // 服务器问题拦截
}, (error) => {
    let res = error.response;
    ElMessage.error(res.data.message);
    return Promise.reject(error)

})

// window.addEventListener('unhandledrejection', function browserRejectionHandler(event) { // 禁用Promise reject输出控制台
//     event && event.preventDefault()
// })

// 图片懒加载，loading：未加载出图片时的动画
const app=createApp(App).use(store).use(router).use(VueCookies)
    .use(VueLazyLoad, {loading: '/imgs/loading-svg/loading-bars.svg'
}).mount('#app')
// app.config.globalProperties.$cookies = VueCookie

