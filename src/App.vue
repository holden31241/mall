<template>
  <div id="app">
    
    <router-view ></router-view>
  </div>
  
</template>

<script>
import storage from './storage';
import jsonp from 'jsonp'
import { onMounted,ref } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'App',
  
  setup(){
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const getUser=()=>{
      axios.get('/user').then((res={}) => {
        // to-do 保存到vuex里面
        // console.log(res)
        if(res){
          store.dispatch('saveUserName', res.username)
        }
        
      })
    }
    const getCartCount = () => {
      axios.get('/carts/products/sum').then((res=0) => {
        // to-do 保存到vuex里面
        if(res){
          store.dispatch('saveCartCount', res)
        }
      
      })
  }
  onMounted(()=>{
    //vuex中数据在刷新页面时，会恢复初始数据，所以需要页面挂载时，重新通过ajax请求返回数据
    //ajax请求是异步的，而mounted是同步的，因此页面会在ajax请求完成之前渲染完页面，所以页面刚渲染好时，ajax还没有返回数据，vuex中数据没有更新，
    //需要computed对数据进行监视，保证ajax返回数据后即时重新渲染面板(ref不能实现)，
    //因为computed会在mounted之前执行一次，而data数据是在mouted时渲染，所以computed可以捕获到vuex中数据变换，而ref不能
    getUser()
    getCartCount()
  })
  return{
    getUser,
    getCartCount
  }
}
 
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';

</style>
