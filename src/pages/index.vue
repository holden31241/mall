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
                                        <img v-bind:src="sub ? sub.img : '/imgs/item-box-1.png'" alt="">
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
                <swiper class="swiper-container"
                    :modules="modules"
                    :loop="true"
                    
                
                    :navigation="true"
                    :pagination="{ clickable: true }">
                    <swiper-slide v-for="(item, index) in slideList" v-bind:key="index">
                    <a v-bind:href="'/#/product/' + item.id"><img v-bind:src="item.img"></a>
                    </swiper-slide>
                    
                </swiper>
    
            </div>
                <div class="ads-box">
                    <a v-bind:href="'/#/product/' + item.id" v-for="(item, index) in adsList" v-bind:key="index">
                        <img v-bind:src="item.img" alt="">
                    </a>
                </div>
                <div class="banner">
                    <a href="/#/product/30">
                        <img src="/imgs/banner-1.png" alt="">
                    </a>
                </div>
                <div class="product-box"></div>       
        </div>
    
    <service-bar></service-bar>
        
    </div>
</template>
<script>
import ServiceBar from './../components/ServiceBar'
import { Swiper, SwiperSlide } from 'swiper/vue'; 
import { Pagination, Navigation } from 'swiper/modules';
import { getCurrentInstance, computed, onMounted, ref, reactive } from "vue";
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export default {
    name: 'index',
   setup(){
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
        return{
            
           slideList,
           menuList,
           adsList,
           modules: [Navigation, Pagination]
           
        } 
   },
    components: {
       
        Swiper,
        SwiperSlide,
        ServiceBar
    }
    
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/base.scss';
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
                transition:all 0.2s;
              }
            }
            .children{
            //   display:block;
            //   width:962px;
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
}
</style>