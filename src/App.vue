<template>
  <div id="app">
    
    <router-view ></router-view>
  </div>
  
</template>

<script>
import storage from './storage';
import jsonp from 'jsonp'
import { onMounted } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'App',
  
  setup(){
    const router = useRouter()
    const route = useRoute()
    const getUser=()=>{
      axios.get('/user').then(() => {
        // to-do 保存到vuex里面
      })
    }
    const getCartCount = () => {
      axios.get('/carts/products/sum').then(() => {
        // to-do 保存到vuex里面
      })
  }
  onMounted(()=>{
    
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
