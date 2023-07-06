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

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';

</style>
