<template>
    <!-- 样式绑定 -->
    <div class="nav-bar" :class="{ 'is_fixed': isFixed }">
        <div class="container">
            <div class="pro-title">
                {{ title }}
            </div>
            <div class="pro-param">
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>
<script>
import {ref,onMounted,onUnmounted} from 'vue'
export default {
    name: 'nav-bar',
    props: {
        title: String
    },
    setup(){
        let isFixed=ref(false)
        // 组件吸顶
        let initHeight=()=>{
            let scrollTop = document.documentElement.scrollTop 
            isFixed.value = scrollTop >= 152 ? true : false;
        }
        onMounted(()=>{
            window.addEventListener('scroll', initHeight)
        })
        onUnmounted(()=>{
            // 路由跳转时，组件会被销毁，需要移除事件，第三个参数为事件冒泡
            window.removeEventListener('scroll', initHeight, false)
        })
        return{
            isFixed
        }

    }
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';

.nav-bar {
    height: 70px;
    line-height: 70px;
    border-top:1px solid $colorH;
    background-color:$colorG;
    &.is_fixed{
      position:fixed;
      top:0;
      width:100%;
      //添加盒子阴影   
      box-shadow: 0 5px 5px $colorE;
    }
    .container {
        @include flex();

        .pro-title {
            font-size: $fontH;
            color: $colorB;
            font-weight: bold;
        }

        .pro-param {
            font-size: $fontJ;

            span {
                margin: 0 10px;
            }

            a {
                color: $colorC;
            }
        }
    }
}</style>
