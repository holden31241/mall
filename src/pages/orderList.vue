<template>
    <div class="order-list">
        <div class="wrapper">
          <div class="container">
            <div class="order-box">
              <loading v-if="loading"></loading>
              <div class="order" v-for="(order, index) in list" :key="index">
                <div class="order-title">
                  <div class="item-info fl">
                    {{ order.createTime }}
                    <span>|</span>
                    {{ order.receiverName }}
                    <span>|</span>
                    订单号：{{ order.orderNo }}
                    <span>|</span>
                    {{ order.paymentTypeDesc }}
                  </div>
                  <div class="item-money fr">
                    <span>应付金额：</span>
                    <span class="money">{{ order.payment }}</span>
                    <span>元</span>
                  </div>
                </div>
                <div class="order-content clearfix">
                  <div class="good-box fl">
                    <div class="good-list" v-for="(item, i) in order.orderItemVoList" :key="i">
                      <div class="good-img">
                        <img v-lazy="item.productImage" alt="">
                      </div>
                      <div class="good-name">
                        <div class="p-name">{{ item.productName }}</div>
                        <div class="p-money">{{ item.totalPrice + 'X' + item.quantity }}元</div>
                      </div>
                    </div>
                  </div>
                  <div class="good-state fr" v-if="order.status == 20">
                    <a href="javascript:;">{{ order.statusDesc }}</a>
                  </div>
                  <div class="good-state fr" v-else>
                    <a href="javascript:;" @click="goPay(order.orderNo)">{{ order.statusDesc }}</a>
                  </div>
                </div>
              </div>
              <!-- 分页器 -->
              <el-pagination
            
                class="pagination"
                background
                layout="->,prev, pager, next"
                :page-size="pageSizes"
                
                :total="totalNum"
                @current-change="handleChange"
                >
              </el-pagination>

              <div class="load-more" v-if="false">
                  <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
              </div>

              <div class="scroll-more" v-if="false"
                v-infinite-scroll="scrollMore"
                :infinite-scroll-disabled="true"
                :infinite-scroll-distance="410"
              >
                <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
              </div>


               <!-- 如果没有数据且加载页面结束时，展示无数据页面 -->
              <no-data v-if="!loading && list.length == 0"></no-data>
            </div>
          </div>
        </div>
      </div>
</template>
<script>

import Loading from './../components/Loading'
import NoData from './../components/NoData'
import { computed, onMounted, ref, reactive, onUpdated, watch } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router'
import { ElPagination,ElButton } from 'element-plus'
import 'element-plus/theme-chalk/src/index.scss'
import infiniteScroll from 'vue3-infinite-scroll-better'
export default {
    name: 'order-list',
    components: {
        ElPagination,
        ElButton,
        Loading,
        NoData
    },
    directives: {
        infiniteScroll
    },
    setup(){
        const router = useRouter()
        let loading=ref(true)
        let list=ref([])
        let pageSizes=10
        let pageNums=ref(1)
        let totalNum =0
        let showNextPage=ref(true)//加载更多：是否显示按钮
        let busy=ref(false)//滚动加载，是否触发

        let getOrderList=()=>{
            loading.value = true
            // 数据加载出来后，就关闭加载页面
            axios.get('/orders',{
                params: {
                    
                    pageNum: pageNums.value
                }
            }).then((res) => {
                loading.value = false;
                list.value = list.value.concat(res.list);
                // totalNum = res.total
                if (res.hasNextPage) {
                    busy.value = false;
                } else {
                    busy.value = true;
                }
            }).catch(() => {
                loading.value = false;
            })
        }
        let goPay=(orderNo)=>{
            // 三种路由跳转方式
            // this.$router.push('/order/pay')
            /*this.$router.push({
              name:'order-pay',
              query:{
                orderNo
              }
            })*/
            router.push({
                path: '/order/pay',
                query: {
                    orderNo
                }
            })
        }
        // 切换页数
        let handleChange=(pageNum)=>{
            pageNums.value = pageNum
            getOrderList()
        }

        let loadMore=()=>{
            pageNums.value++;
            // console.log(pageNums.value)
            getOrderList();
        }

        let scrollMore=()=>{
            busy.value = true
            setTimeout(() => {
                pageNums.value++;
                getOrderList();
            }, 500);
        }

        onMounted(()=>{
            getOrderList()
        })

        return{
            pageSizes,
            pageNums,
            totalNum,
            loading,
            list,
            showNextPage,
            busy,
            goPay,
            handleChange,
            loadMore,
            scrollMore
        }
    }

}


</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';

.order-list {
    .wrapper {
        background-color: $colorJ;
        padding-top: 33px;
        padding-bottom: 110px;

        .order-box {
            .order {
                @include border();
                background-color: $colorG;
                margin-bottom: 31px;

                &:last-child {
                    margin-bottom: 0;
                }

                .order-title {
                    @include height(74px);
                    background-color: $colorK;
                    padding: 0 43px;
                    font-size: 16px;
                    color: $colorC;

                    .item-info {
                        span {
                            margin: 0 9px;
                        }
                    }

                    .money {
                        font-size: 26px;
                        color: $colorB;
                    }
                }

                .order-content {
                    padding: 0 43px;

                    .good-box {
                        width: 88%;

                        .good-list {
                            display: flex;
                            align-items: center;
                            height: 145px;

                            .good-img {
                                width: 112px;

                                img {
                                    width: 100%;
                                }
                            }

                            .good-name {
                                font-size: 20px;
                                color: $colorB;
                            }
                        }
                    }

                    .good-state {
                        @include height(145px);
                        font-size: 20px;
                        color: $colorA;

                        a {
                            color: $colorA;
                        }
                    }
                }
            }
             .pagination{
                
               
                }
                .el-pagination.is-background .el-pager li:not(.is-disabled).is-active{
                background-color: #FF6600;
                color: #FFF;
                }
                .el-button--primary{
                    background-color: #FF6600;
                    border-color: #FF6600;
                    }
                    .load-more,.scroll-more{
                    text-align:center;
                    }
            }
    }
}
</style>