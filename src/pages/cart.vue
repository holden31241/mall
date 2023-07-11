<template>
    <div class="cart">
        <!-- 父组件slot和props的使用 -->
        <order-header title="我的购物车">
          <template v-slot:tip>
            <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
          </template>
        </order-header>
         <div class="wrapper">
          <div class="container">
            <div class="cart-box">
              <ul class="cart-item-head">
                <!-- class样式绑定 -->
                <li class="col-1"><span class="checkbox" v-bind:class="{ 'checked': allChecked }" @click="toggleAll"></span>全选</li>
                <li class="col-3">商品名称</li>
                <li class="col-1">单价</li>
                <li class="col-2">数量</li>
                <li class="col-1">小计</li>
                <li class="col-1">操作</li>
              </ul>
              <ul class="cart-item-list">
                <li class="cart-item" v-for="(item, index) in list" v-bind:key="index">
                  <div class="item-check">
                    <span class="checkbox" v-bind:class="{ 'checked': item.productSelected }" @click="updateCart(item)"></span>
                  </div>
                  <div class="item-name">
                    <!-- 图片懒加载 -->
                    <img v-lazy="item.productMainImage" alt="">
                    <span>{{ item.productName + ' , ' + item.productSubtitle }}</span>
                  </div>
                  <div class="item-price">{{ item.productPrice }}</div>
                  <div class="item-num">
                    <div class="num-box">
                      <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                      <span>{{ item.quantity }}</span>
                      <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                    </div>
                  </div>
                  <div class="item-total">{{ item.productTotalPrice }}</div>
                  <div class="item-del" @click="delProduct(item)"></div>
                </li>
              </ul>
            </div>
            <div class="order-wrap clearfix">
              <div class="cart-tip fl">
                <a href="/#/index">继续购物</a>
                共<span>{{ list.length }}</span>件商品，已选择<span>{{ checkedNum }}</span>件
              </div>
              <div class="total fr">
                合计：<span>{{ cartTotalPrice }}</span>元
                <a href="javascript:;" class="btn" @click="order">去结算</a>
              </div>
            </div>
          </div>
        </div>
        <service-bar></service-bar>
        <order-footer></order-footer>
      </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader.vue'
import OrderFooter from './../components/OrderFooter.vue'
import ServiceBar from './../components/ServiceBar'
import {  computed, onMounted, ref, reactive, onUpdated } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
    name: 'cart',
    setup(){
        const router = ref(useRouter())
        const store = useStore()

        let list=ref([])//商品列表
        let allChecked=ref(false)//是否全选
        let cartTotalPrice=ref(0)//商品总金额
        let checkedNum=ref(0) //选中商品数量
        // 获取购物车列表
        let getCartList=()=>{
            axios.get('/carts').then((res) => {
            renderData(res);
            })
        }
        // 控制全选功能
        let toggleAll=()=>{
            //通过后台判断是否全选，put请求用于更新数据，更新数据后需要重新获取数据
            let url = allChecked.value ? '/carts/unSelectAll' : '/carts/selectAll';
            axios.put(url).then((res) => {
                renderData(res);
            })
        }
         // 公共赋值
        let renderData=(res)=>{
            list.value = res.cartProductVoList || [];
            allChecked.value = res.selectedAll;
            cartTotalPrice.value = res.cartTotalPrice;
            //数组过滤器，返回过滤后的数组
            checkedNum.value = list.value.filter(item => item.productSelected).length;
        }
        // 更新购物车数量和购物车单选状态
        let updateCart=(item, type)=>{
            let quantity = item.quantity
            let selected = item.productSelected
            if (type == '-') {
                if (quantity == 1) {
                    alert('商品至少保留一件');
                    return;
                }
                --quantity;
            } else if (type == '+') {
                if (quantity > item.productStock) {
                    alert('购买数量不能超过库存数量');
                    return;
                }
                ++quantity;
            } else {
                selected = !item.productSelected;
            }
            // 更新商品数量与是否选中，并重新从后端获取数据
            axios.put(`/carts/${item.productId}`, {
                quantity,
                selected
            }).then((res) => {
                renderData(res);
            })
        }
         // delete请求用于删除数据，删除购物车商品，并重新从后端获取数据
        let  delProduct=(item)=>{
            axios.delete(`/carts/${item.productId}`).then((res) => {
                renderData(res);
            });
        }
        let order=()=>{
            //判断数组中每一项是否满足条件，返回布尔值
            let isCheck = list.value.every(item => !item.productSelected);
            if (isCheck) {
                alert('请选择一件商品');
            } else {
                router.value.push('/order/confirm');
            }
        }


        onMounted(()=>{
            getCartList()
        })

        return{
            list,
            allChecked,
            cartTotalPrice,
            checkedNum,
            toggleAll,
            updateCart,
            delProduct,
            order

        }

    },
    components: {
        ServiceBar,
        OrderHeader,
        OrderFooter

    }
}

</script>

<style lang="scss">
.cart {
    .wrapper {
        background-color: #F5F5F5;
        padding-top: 30px;
        padding-bottom: 114px;

        .cart-box {
            background-color: #fff;
            font-size: 14px;
            color: #999999;
            text-align: center;

            .checkbox {
                display: inline-block;
                width: 22px;
                height: 22px;
                border: 1px solid #E5E5E5;
                vertical-align: middle;
                margin-right: 17px;
                cursor: pointer;

                &.checked {
                    background: url('../../public/imgs/icon-gou.png') #FF6600 no-repeat center;
                    background-size: 16px 12px;
                    border: none;
                }
            }

            .cart-item-head {
                display: flex;
                height: 79px;
                line-height: 79px;

                .col-1 {
                    flex: 1;
                }

                .col-2 {
                    flex: 2;
                }

                .col-3 {
                    flex: 3;
                }
            }

            .cart-item-list {
                .cart-item {
                    display: flex;
                    align-items: center;
                    height: 125px;
                    border-top: 1px solid #E5E5E5;
                    font-size: 16px;

                    .item-check {
                        flex: 1;
                    }

                    .item-name {
                        flex: 3;
                        font-size: 18px;
                        color: #333333;
                        display: flex;
                        align-items: center;

                        img {
                            width: 80px;
                            height: 80px;
                            vertical-align: middle;
                        }

                        span {
                            margin-left: 30px;
                        }
                    }

                    .item-price {
                        flex: 1;
                        color: #333333;
                    }

                    .item-num {
                        flex: 2;

                        .num-box {
                            display: inline-block;
                            width: 150px;
                            height: 40px;
                            line-height: 40px;
                            border: 1px solid #E5E5E5;
                            font-size: 14px;

                            a {
                                display: inline-block;
                                width: 50px;
                                color: #333333;
                            }

                            span {
                                display: inline-block;
                                width: 50px;
                                color: #333333;
                            }
                        }
                    }

                    .item-total {
                        flex: 1;
                        color: #FF6600;
                    }

                    .item-del {
                        flex: 1;
                        width: 14px;
                        height: 12px;
                        background: url('../../public/imgs/icon-close.png') no-repeat center;
                        background-size: contain;
                        cursor: pointer;
                    }
                }
            }
        }

        .order-wrap {
            font-size: 14px;
            color: #666666;
            margin-top: 20px;
            height: 50px;
            line-height: 50px;

            .cart-tip {
                margin-left: 29px;
                //a标签优先级高于类样式，所以需要将样式放在a标签内
                a {
                    color: #666666;
                    margin-right: 37px;
                }

                span {
                    color: #FF6600;
                    margin: 0 5px;
                }
            }

            .total {
                font-size: 14px;
                color: #FF6600;

                span {
                    font-size: 24px;
                }
                //a标签优先级高于类样式，所以需要将样式放在a标签内
                a {
                    width: 202px;
                    height: 50px;
                    line-height: 50px;
                    font-size: 18px;
                    margin-left: 37px;
                }
            }
        }
    }
}</style>