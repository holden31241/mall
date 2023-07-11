<template>
    <div class="order-header">
        <div class="container clearfix">
            <div class="header-logo">
                <a href="/#/index"></a>
            </div>
            <div class="title">
                <!-- 子组件slot和props的使用 -->
                <h2>{{ title }}<slot name="tip"></slot>
                </h2>
            </div>
            <div class="username">
                <a href="javascript:;">{{ username }}</a>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    
    name: 'order-header',
    props: {
        title: String
    },
    computed: {
        // mapState用法
        ...mapState(['username'])
    }
}
</script>
<style lang="scss">
.order-header {
    padding: 30px 0;
    border-bottom:2px solid #FF6600;
    // 通过浮动实现

    .header-logo {
        float: left;
    }

    .title,
    .username {
        display: inline-block;
        height: 55px;
        line-height: 55px;
    }

    .title {
       
        float: left;
        color: #333333;
        margin-left: 54px;
        //h2标签优先级高于类样式，所以需要将样式放在h2标签内
        h2{
            font-size: 28px;
            color: #333333;
        }
        span {
            font-size: 14px;
            margin-left: 17px;
            color: #999999;
            font-weight: 200;
        }
    }

    .username {
        float: right;
        //a标签优先级高于类样式，所以需要将样式放在a标签内
        a {
            color: #666666;
            font-size: 16px;
        }
    }
}</style>