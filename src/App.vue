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
  }
 
}
</script>

<style>
@import './assets/scss/reset.scss'

</style>
