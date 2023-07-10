<template>
    <div class="product">
        <product-param  v-bind:title="product.name">
          <template v-slot:buy>
            <button class="btn" @click="buy">立即购买</button>
          </template>
        </product-param>
        <!-- <div class="test">

        </div> -->
         <div class="content">
        <div class="item-bg">
            <h2>{{ product.name }}</h2>
            <h3>{{ product.subtitle }}</h3>
            <p>
            <a href="" id="">全球首款双频 GP</a>
            <span>|</span>
            <a href="" id="">骁龙845</a>
            <span>|</span>
            <a href="" id="">AI 变焦双摄</a>
            <span>|</span>
            <a href="" id="">红外人脸识别</a>
            </p>
            <div class="price">
            <span>￥<em>{{ product.price }}</em></span>
            </div>
        </div>
        <div class="item-bg-2"></div>
        <div class="item-bg-3"></div>
        <div class="item-swiper">
          <!-- slides-per-view与loop冲突，需要设置looped-slides-->
        <swiper class="swiper-container"
            :modules="modules"
            
            :slides-per-view="3"
            :looped-slides="2"
            :space-between="30"
            
            :loop="true"
            :navigation="true"
            :pagination="{ clickable: true }">
            <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
             
        
        </swiper>
        <!-- <swiper :options="swiperOption">
            <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
            
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper> -->
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>
      <div class="item-video">
        <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg" @click="openVideo"></div>
        <div class="video-box" v-show="showSlide">
          <div class="overlay"></div>
          <div class="video" v-bind:class="showSlide" >
            <span class="icon-close" @click="closeVideo"></span>
            <!-- muted 静音播放，解决谷歌的自动播放冲突问题 -->
            <video :src="str" muted autoplay controls="controls"></video>
          </div>
        </div>
      </div>
    </div>

      </div>
</template>
<script>
import ProductParam from './../components/ProductParam'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';
import {ref,reactive,onMounted} from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
export default {
    name: 'product',
    setup(){
      const router = ref(useRouter())
      let product= ref({})
      let showSlide=ref('')
      // let vi = document.getElementsByTagName('video')
      let str=ref('')
      let openVideo =()=>{
        //关闭视频后，地址置空，防止后台播放
        showSlide.value = 'slideDown'
        str.value= '/imgs/product/video.mp4'
      }
      let closeVideo=()=>{
        showSlide.value = 'slideUp'
        str.value=''
        // 设置定时器，否则在样式动画播放完之前，组件就会消失
        setTimeout(() => {
          showSlide.value = ''
      }, 600)
      }
      let getProductInfo=()=>{
      //获取路由参数params  
      let id = router.value.currentRoute.params.id;
        axios.get(`/products/${id}`).then((res) => {
        product.value = res;
      })
    }
      let buy = () => {
        let id = router.value.currentRoute.params.id;
        router.value.push(`/detail/${id}`);
      }
      onMounted(()=>{
        getProductInfo()
      })
        return{
          showSlide,
          str,
          product,
          getProductInfo,
          buy,
          closeVideo,
          openVideo,
          modules: [Navigation, Pagination]
        }

    },
    components: {
        Swiper,
        SwiperSlide,
        ProductParam
    }
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.product {
       .content{
      .item-bg{
        background:url('../../public/imgs/product/product-bg-1.png') no-repeat center;
        height:718px;
        text-align:center;
        h2{
          font-size:80px;
          padding-top:55px;
        }
        h3{
          font-size:24px;
          letter-spacing: 10px;
        }
        p{
          margin-top:21px;
          margin-bottom:40px;
          a{
            font-size:16px;
            color:#333333;
          }
          span{
            margin:0 15px;
          }
        }
        .price{
          font-size:30px;
          color:#333333;
          em{
            font-style:normal;
            font-size:38px;
          }
        }
      }
      .item-bg-2{
        background:url(../../public/imgs/product/product-bg-2.png) no-repeat center;
        height:480px;
        background-size:1226px 397px;
      }
      .item-bg-3{
        background:url(../../public/imgs/product/product-bg-3.png) no-repeat center;
        height:638px;
        background-size:cover;
      }
      .item-swiper {
        margin:36px auto 52px;
        img {
                width: 100%;
                
            }
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
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
                
                color: $colorD;

            }
            .swiper-button-next {
               
                color: $colorD;

            }
            

        }
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        }
        p{
          font-size:24px;
          margin-bottom:58px;
        }
        .video-bg{
          background:url('../../public/imgs/product/gallery-1.png') no-repeat center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        }
        .video-box{
          
          .overlay{
            @include position(fixed);
            background-color:#333333;
            opacity:.4;
            z-index:10;
          }
          //动画实现 
          @keyframes slideDown{
            from{
              top:-50%;
              opacity:0;
            }
            to{
              top:50%;
              opacity:1;
            }
          }
          @keyframes slideUp{
            from{
              top:50%;
              opacity:1;
            }
            to{
              top:-50%;
              opacity:0;
            }
          }
          .video{
            position:fixed;
            top:-50%;
            left:50%;
            transform:translate(-50%,-50%);
            z-index:10;
            width:1000px;
            height:536px;
             &.slideDown{
              animation:slideDown .6s linear;
              //animation动画结束后css样式保留最后状态
              animation-fill-mode: forwards
            }
            &.slideUp{
              animation:slideUp .6s linear;
              animation-fill-mode: forwards
            }
            .icon-close{
              position:absolute;
              top:20px;
              right:20px;
              @include bgImg(20px,20px,'../../public/imgs/icon-close.png');
              cursor:pointer;
              // 需要将错误图标设置更高index
              z-index:11;
            }
            video{
              width:100%;
              height:100%;
              object-fit:cover;
              outline:none;
            }
          }
        }
      }
    }

    
    // 插槽样式定义在父组件
    button {
        margin-left: 10px;
    }
    // .test{
    //      height: 1100px;
    // }

    
        
}
</style>