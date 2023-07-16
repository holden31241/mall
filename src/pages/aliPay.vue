<template>
    <div class="ali-pay">
        <!-- 设置加载页面 -->
        <loading v-if="loading"></loading>
        <!-- v-html 设置元素的innerHTML -->
        <div class="form" v-html="content"></div>
    </div>
</template>
<script>
import Loading from './../components/Loading'
import { computed, onMounted, ref, reactive, onUpdated } from "vue"
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
    name: 'alipay',
    setup(){
        const router = useRouter()
        let orderId=router.currentRoute.value.query.orderId
        let content=ref('')
        let loading=ref(true)

        let paySubmit=()=>{
            axios.post('/pay', {
                orderId: orderId,
                orderName: 'Vue高仿小米商城',
                amount: 0.01,//单位元
                payType: 1 //1支付宝，2微信
            }).then((res) => {
                content.value = res.content;
                setTimeout(() => {
                    // 提交表单
                    document.forms.submit();
                }, 100)
            })
        }

        onMounted(()=>{
            paySubmit()
        })

        return{
            loading,
            content

        }

    },
    components: {
        Loading
    }
}

</script>