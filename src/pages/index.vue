<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="nav-menu">
                    <ul class="menu-wrap">
                        <li class="menu-item">
                            <a href="javascript:;">手机 电话卡</a>
                            <div class="children">
                                <!-- v-for必须有key -->
                                <ul v-for="(item, i) in menuList" v-bind:key="i">
                                    <li v-for="(sub, j) in item" v-bind:key="j">
                                        <a v-bind:href="sub ? '/#/product/' + sub.id : ''">
                                        <!-- 图片懒加载用法 -->
                                        <img v-lazy="sub ? sub.img : '/imgs/item-box-1.png'" alt="">
                                        {{ sub ? sub.name : '小米9' }}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电视 盒子</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">笔记本 平板</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">家电 插线板</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">出行 穿戴</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">智能 路由器</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电源 配件</a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">生活 箱包</a>
                        </li>
                    </ul>
                </div>
                <!-- swiper插件用法 -->
                <swiper class="swiper-container"
                    :modules="modules"
                    :loop="true"
                    
                
                    :navigation="true"
                    :pagination="{ clickable: true }">
                    <swiper-slide v-for="(item, index) in slideList" v-bind:key="index">
                    <a v-bind:href="'/#/product/' + item.id"><img v-lazy="item.img"></a>
                    </swiper-slide>
                    
                </swiper>
    
            </div>
                <div class="ads-box">
                    <a v-bind:href="'/#/product/' + item.id" v-for="(item, index) in adsList" v-bind:key="index">
                        <img v-lazy="item.img" alt="">
                    </a>
                </div>
                <div class="banner">
                    <a href="/#/product/30">
                        <img v-lazy="'/imgs/banner-1.png'" alt="">
                    </a>
                </div>
                  
        </div>
     <div class="product-box">
        <div class="container">
            <h2>手机</h2>
            <div class="wrapper">
                <div class="banner-left">
                    <a href="/#/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
                </div>
                <div class="list-box">
                    <div class="list" v-for="(arr, i) in phoneList" v-bind:key="i">
                        <div class="item" v-for="(item, j) in arr" v-bind:key="j">
                            <!-- 绑定样式 -->
                            <span v-bind:class="{ 'new-pro': j % 2 == 0 }">新品</span>
                            <div class="item-img">
                                <img v-lazy="item.mainImage" alt="">
                            </div>
                            <div class="item-info">
                                <h3>{{ item.name }}</h3>
                                <p>{{ item.subtitle }}</p>
                                <p class="price" @click="addCart(item.id)">{{ item.price }}元</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    <service-bar></service-bar>
    <!-- pros 为子组件传入参数 -->
    <!-- emit 绑定子组件自定义事件 -->
    <modal 
       
        title="提示" 
        sureText="查看购物车" 
        btnType="1" 
        modalType="middle" 
        v-bind:showModal="showModal"
        v-on:submit="goToCart"
        v-on:cancel="showModal = false">
        <!-- 父组件使用插槽 -->
        <template v-slot:body>
            <p>商品添加成功！</p>
        </template>
    </modal>
        
    </div>
</template>
<script>
import ServiceBar from './../components/ServiceBar'
import Modal from './../components/Modal'
import { Swiper, SwiperSlide } from 'swiper/vue'; 
import { Pagination, Navigation } from 'swiper/modules';
import { getCurrentInstance, computed, onMounted, ref, reactive } from "vue";
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export default {
    name: 'index',
   setup(){
    let showModal=ref(false)
    const router = useRouter()
    const store = useStore()
    let menuList=[
            [
                {
                    id: 30,
                    img: '/imgs/item-box-1.png',
                    name: '小米CC9',
                }, {
                    id: 31,
                    img: '/imgs/item-box-2.png',
                    name: '小米8青春版',
                }, {
                    id: 32,
                    img: '/imgs/item-box-3.jpg',
                    name: 'Redmi K20 Pro',
                }, {
                    id: 33,
                    img: '/imgs/item-box-4.jpg',
                    name: '移动4G专区',
                }
            ],
            [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
        ]
    let slideList=[
            {
                id: '42',
                img: '/imgs/slider/slide-1.jpg'
            },
            {
                id: '45',
                img: '/imgs/slider/slide-2.jpg'
            },
            {
                id: '46',
                img: '/imgs/slider/slide-3.jpg'
            },
            {
                id: '',
                img: '/imgs/slider/slide-4.jpg'
            },
            {
                id: '',
                img: '/imgs/slider/slide-5.jpg'
            }
            
        ]

    let adsList=[
            {
                id: 33,
                img: '/imgs/ads/ads-1.png'
            }, {
                id: 48,
                img: '/imgs/ads/ads-2.jpg'
            }, {
                id: 45,
                img: '/imgs/ads/ads-3.png'
            }, {
                id: 47,
                img: '/imgs/ads/ads-4.jpg'
            }
        ] 
    let  phoneList= ref([])
  
    const getPhoneList = () => {
            //get使用params，post使用data
            axios.get('/products', {
                params: {
                    categoryId: '100012',
                    pageSize: 14
                }
            }).then((res) => {
                    res.list=res.list.slice(6,14)
                    //ref需要.value
                    phoneList.value = [res.list.slice(0, 4), res.list.slice(4, 8)];
                
            })

        }; 
    const goToCart=()=>{
            router.push('/cart');
        }
    const addCart=(id)=>{
        //通过请求获得的商品信息获得id
            axios.post('/carts', {
                productId: id,
                selected: true
            }).then((res) => {
                showModal.value = true;
                store.dispatch('saveCartCount', res.cartTotalQuantity);
            }).catch(() => {
                showModal.value = true;
            });
        }   
        onMounted(() => {
           getPhoneList() 
        })    
        return{
           goToCart,
           getPhoneList,
           addCart,
           showModal,
           phoneList, 
           slideList,
           menuList,
           adsList,
           modules: [Navigation, Pagination]
           
        } 
   },
    components: {
       
        Swiper,
        SwiperSlide,
        ServiceBar,
        Modal
    }
    
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';

.index {
    .swiper-box {
         .nav-menu{
        position:absolute;
        width:264px;
        height:451px;
        // 定位叠放次序
        z-index:9;
        padding:26px 0;
        background-color:#55585a7a;
        //盒模型
        box-sizing:border-box;
        .menu-wrap{
          .menu-item{
            height:50px;
            line-height:50px;
            a{
              position:relative;
              display:block;
              font-size:16px;
              color:$colorG;
              padding-left:30px;
              &:after{
                position:absolute;
                right:30px;
                top:17.5px;
                content:' ';
                @include bgImg(10px,15px,'../../public/imgs/icon-arrow.png');
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                // display:block;
                width:962px;
                
              }
            }
            .children{
            //   display:block;
            //   width:962px;
              transition:all 0.2s;
              width: 0;
              height:451px;
              background-color:$colorG;
              position:absolute;
              top:0;
              left:264px;
              border:1px solid $colorH;
              //清除溢出，否则子盒子会显示出来
              overflow: hidden;
              ul{
                display:flex;
                justify-content:space-between;
                height:75px;
                li{
                  border-left:1px solid $colorF;
                  height:75px;
                  line-height:75px;
                  flex:1;
                  padding-left:23px;
                }
                a{
                  color:$colorB;
                  font-size:14px;
                }
                img{
                  width:42px;
                  height:35px;
                  vertical-align:middle;
                  margin-right:15px;
                }
              }
            }
          }
        }
      }
        .swiper-container {
            height: 451px;

            img {
                width: 100%;
                height: 100%;
            }
            .swiper-pagination {
                .swiper-pagination-bullet {
                background: $colorG;
                }
                .swiper-pagination-bullet-active {
                background: $colorG;
                }
            }
            .swiper-button-prev {
                left:274px;
                color: $colorD;

            }
            .swiper-button-next {
               
                color: $colorD;

            }

        }
        
    }
    .ads-box{
      @include flex();
      margin-top:14px;
      margin-bottom:31px;
      a{
        width:296px;
        height:167px;
      }
    }
    .banner{
      margin-bottom:50px;
    }
    .product-box{
      background-color:$colorJ;
      padding:30px 0 50px;
        h2{
            font-size:$fontF;
            height:21px;
            line-height:21px;
            color:$colorB;
            margin-bottom:20px;
        }
        .wrapper{
            display:flex;
            .banner-left{
            margin-right:16px;
                img{
                    width:224px;
                    height:619px;
                }
            }
        .list-box{
            .list{
                @include flex();
                width:986px;
                margin-bottom:14px;
                &:last-child{
                margin-bottom:0;
                }
                .item{
                width:236px;
                height:302px;
                background-color:$colorG;
                text-align:center;
                    span{
                        display:inline-block;
                        width:67px;
                        height:24px;
                        font-size:14px;
                        line-height:24px;
                        color:$colorG;
                        &.new-pro{
                        background-color:#7ECF68;
                        }
                        &.kill-pro{
                        background-color:#E82626;
                        }

                    }
                    .item-img{
                        img{
                        width:100%;
                        height:195px;
                        }
                    }
                    .item-info{
                        h3{
                        font-size:$fontJ;
                        color:$colorB;
                        line-height:$fontJ;
                        font-weight:bold;
                        }
                        p{
                        color:$colorD;
                        line-height:13px;
                        margin:6px auto 13px;
                        }
                        .price{
                        color:#F20A0A;
                        font-size:$fontJ;
                        font-weight:bold;
                        cursor:pointer;
                        //& 表示父选择器
                        &:after{
                            @include bgImg(22px,22px,'../../public/imgs/icon-cart-hover.png');
                            content:' ';
                            margin-left:5px;
                            vertical-align: middle;
                            }
                        }
                    }
                  }
                }
            }
        }
    }    
}
</style>