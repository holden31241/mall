<template>
    <div class="order-pay">
        <div class="wrapper">
            <div class="container">
                <div class="order-wrap">
                    <div class="item-order">
                        <div class="icon-succ"></div>
                        <div class="order-info">
                            <h2>订单提交成功！去付款咯～</h2>
                            <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
                            <p>收货信息：{{ addressInfo }}</p>
                        </div>
                        <div class="order-total">
                            <p>应付总额：<span>{{ payment }}</span>元</p>
                            <!-- 样式绑定 -->
                            <p>订单详情<em class="icon-down" :class="{ 'up': showDetail }" @click="showDetail = !showDetail"></em>
                            </p>
                        </div>
                    </div>
                    <div class="item-detail" v-if="showDetail">
                        <div class="item">
                            <div class="detail-title">订单号：</div>
                            <div class="detail-info theme-color">{{  orderId }}</div>
                        </div>
                        <div class="item">
                            <div class="detail-title">收货信息：</div>
                            <div class="detail-info">{{ addressInfo }}</div>
                        </div>
                        <div class="item good">
                            <div class="detail-title">商品名称：</div>
                            <div class="detail-info">
                                <ul>
                                    <li v-for="(item, index) in orderDetail" :key="index">
                                        <img v-lazy="item.productImage" />{{ item.productName }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="item">
                            <div class="detail-title">发票信息：</div>
                            <div class="detail-info">电子发票 个人</div>
                        </div>
                    </div>
                </div>
                <div class="item-pay">
                    <h3>选择以下支付方式付款</h3>
                    <div class="pay-way">
                        <p>支付平台</p>
                        <!-- 样式绑定 -->
                        <div class="pay pay-ali" :class="{ 'checked': payType == 1 }" @click="paySubmit(1)"></div>
                        <div class="pay pay-wechat" :class="{ 'checked': payType == 2 }" @click="paySubmit(2)"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 父组件定义emit方法 -->
        <scan-pay-code v-if="showPay" @close="closePayModal" :img="payImg"></scan-pay-code>
        <modal
          title="支付确认"
          btnType="3"
          :showModal="showPayModal"
          sureText="查看订单"
          cancelText="未支付"
          @cancel="showPayModal = false"
          @submit="goOrderList"
        >
          <template v-slot:body>
            <p>您确认是否完成支付？</p>
          </template>
        </modal>
    </div>
</template>
<script>
import { getCurrentInstance, computed, onMounted, ref, reactive, onUpdated } from "vue";
import { useRouter } from 'vue-router'
import axios from 'axios'
import QRCode from 'qrcode'
import { ElMessage } from 'element-plus'
import ScanPayCode from './../components/ScanPayCode'
import Modal from './../components/Modal'
import 'element-plus/theme-chalk/index.css'
export default {
    name: 'order-pay',
    setup(){
        const router = useRouter()
        let orderId=router.currentRoute.value.query.orderNo
        let addressInfo=ref('')//收货人地址
        let orderDetail=ref([])//订单详情，包含商品列表
        let showDetail=ref(false)//是否显示订单详情
        let payType=ref('')//支付类型
        let showPay=ref(false)//是否显示微信支付弹框
        let payImg=ref('')//微信支付的二维码地址
        let showPayModal=ref(false)//是否显示二次支付确认弹框
        let payment=ref(0)//订单总金额
        let T=''//定时器ID

        let getOrderDetail=()=>{
           axios.get(`/orders/${orderId}`).then((res) => {
                let item = res.shippingVo;
                addressInfo.value = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
                orderDetail.value = res.orderItemVoList;
                payment.value = res.payment
            })
        }

        let paySubmit=(type)=>{
            payType.value = type
           
            if (type == 1) {
                
                // '_blank' 打开新页面
                window.open('/#/order/alipay?orderId=' + orderId, '_blank')
            }else if(type==2){
                 axios.post('/pay', {
                    orderId: orderId,
                    orderName: 'Vue高仿小米商城',
                    amount: 0.01,//单位元
                    payType: 2 //1支付宝，2微信
                }).then((res) => {
                    QRCode.toDataURL(res.content)
                        .then(url => {
                            showPay.value = true;
                            payImg.value = url;
                            loopOrderState()
                        })
                        .catch(() => {
                            ElMessage.error('微信二维码生成失败，请稍后重试');
                        })
                })
            }
           
        }

        let closePayModal=()=>{
            showPay.value = false;
            showPayModal.value = true;
            clearInterval(T)
        }
        // 轮询查询

        let loopOrderState=()=>{
            T = setInterval(() => {
                axios.get(`/orders/${orderId}`).then((res) => {
                    if (res.status == 20) {
                        clearInterval(T);
                        goOrderList();
                    }
                })
            }, 1000);
        }
        let goOrderList=()=>{
           router.push('/order/list');
        }

        onMounted(()=>{
            // console.log(orderId)
            
            getOrderDetail()
        })

        return{
            orderId,
            addressInfo,
            orderDetail,
            showDetail,
            payType,
            showPay,
            payImg,
            payment,
            showPayModal,
            paySubmit,
            closePayModal
        }

    },
    components: {
        ScanPayCode,
        Modal
    }

}
</script>
<style lang="scss">
.order-pay {
    .wrapper {
        background-color: #F5F5F5;
        padding-top: 30px;
        padding-bottom: 61px;

        .order-wrap {
            padding: 62px 50px;
            background-color: #fff;
            font-size: 14px;
            margin-bottom: 30px;

            .item-order {
                display: flex;
                align-items: center;

                .icon-succ {
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    background: url('../../public/imgs/icon-gou.png') #80c58a no-repeat center;
                    background-size: 60px;
                    margin-right: 40px;
                }

                .order-info {
                    margin-right: 248px;

                    h2 {
                        font-size: 24px;
                        color: #333333;
                        margin-bottom: 20px;
                    }

                    p {
                        color: #666666;

                        span {
                            color: #FF6700;
                        }
                    }
                }

                .order-total {
                    //选择父标签内所以最近一级p标签的第一个子标签
                    &>p:first-child {
                        margin-bottom: 30px;
                    }

                    span {
                        font-size: 28px;
                        color: #FF6700;
                    }

                    .icon-down {
                        display: inline-block;
                        width: 14px;
                        height: 10px;
                        background: url('../../public/imgs/icon-down.png') no-repeat center;
                        background-size: contain;
                        margin-left: 9px;
                        transition: all .5s;
                        cursor: pointer;

                        &.up {
                            transform: rotate(180deg);
                        }
                    }

                    .icon-up {
                        transform: rotate(180deg);
                    }
                }
            }

            .item-detail {
                border-top: 1px solid #D7D7D7;
                padding-top: 47px;
                padding-left: 130px;
                font-size: 14px;
                margin-top: 45px;

                .item {
                    margin-bottom: 19px;

                    .detail-title {
                        float: left;
                        width: 100px;
                    }

                    .detail-info {
                        display: inline-block;

                        img {
                            width: 30px;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        .item-pay {
            padding: 26px 50px 72px;
            background-color: #ffffff;
            color: #333333;

            h3 {
                font-size: 20px;
                font-weight: 200;
                color: #333333;
                padding-bottom: 24px;
                border-bottom: 1px solid #D7D7D7;
                margin-bottom: 26px;
            }

            .pay-way {
                font-size: 18px;

                .pay {
                    display: inline-block;
                    width: 188px;
                    height: 64px;
                    border: 1px solid #D7D7D7;
                    cursor: pointer;

                    &:last-child {
                        margin-left: 20px;
                    }

                    &.checked {
                        border: 1px solid #FF6700;
                    }
                }

                .pay-ali {
                    background: url('../../public/imgs/pay/icon-ali.png') no-repeat center;
                    background-size: 103px 38px;
                    margin-top: 19px;
                }

                .pay-wechat {
                    background: url('../../public/imgs/pay/icon-wechat.png') no-repeat center;
                    background-size: 103px 38px;
                }
            }
        }
    }
}</style>