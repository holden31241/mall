<template>
    <div>

        <order-header v-bind:title="title">
            <template v-slot:tip>
                <span>{{ tip }}</span>
            </template>
        </order-header>
        <router-view></router-view>
        <service-bar></service-bar>
        <order-footer></order-footer>
    </div>
</template>
<script>
import ServiceBar from './../components/ServiceBar.vue'
import OrderHeader from './../components/OrderHeader.vue'
import OrderFooter from './../components/OrderFooter.vue'
import { computed, onMounted, ref, reactive, onUpdated } from "vue";
import { useRouter } from 'vue-router'

export default {
    name: 'order',
    setup(){
        let title=ref('')
        let tip=ref('')
        const router = useRouter()
        let path = ref(router.currentRoute.value.path)
        onMounted(() => {
            console.log(path.value)
            if (path.value == '/order/confirm') {
                title.value = '订单确认';
                tip.value = '请认真填写收货地址';
            } else if (path.value == '/order/list') {
                title.value = '订单列表';
                tip.value = '请谨防钓鱼链接或诈骗电话，了解更多>';
            } else if (path.value == '/order/pay') {
                title.value = '订单支付';
                tip.value = '请谨防钓鱼链接或诈骗电话，了解更多>';
            }else if(path.value == '/order/alipay'){
                title.value = '订单支付';
                tip.value = '请谨防钓鱼链接或诈骗电话，了解更多>';
            }
        })
       
        return{
            title,
            tip
        }

    },
    components: {
        ServiceBar,
        OrderHeader,
        OrderFooter

    }
}

</script>