<template>
    <div class="header">
        
          <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">商城</a>
                    <!--a href="javascript:;" 点击链接后，页面不会刷新 -->
                    <a href="javascript:;">{{ UI }}</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username" >{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="!username">注册</a>
                    <a href="/#/order/list" v-if="username">我的订单</a>
                    <a href="javascript:;" v-if="username" @click="logout">退出</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart">
                        <span class="icon-cart"></span>
                        购物车({{ cartCount }})
                    </a>
                </div>
            </div>
          </div>  
          <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>手机</span>
                        <div class="children">
                          <ul>
                            <li
                              class="product"
                              v-for="(item, index) in phoneList"
                              :key="index"
                            >
                            <!-- v-bind绑定的""内必须为js表达式 -->
                              <a v-bind:href="'/#/product/' + item.id" target="_blank">
                                <div class="pro-img">
                                  <img :src="item.mainImage" :alt="item.subtitle" />
                                </div>
                                <div class="pro-name">{{ item.name }}</div>
                                <div class="pro-price">{{ item.price }}</div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    <div class="item-menu">
                        <span>红米</span>
                        <div class="childen"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children">
                          <ul>
                            <li class="product">
                              <a href="" target="_blank">
                                <div class="pro-img">
                                  <img src="../../public/imgs/nav-img/nav-3-1.jpg" alt="">
                                </div>
                                <div class="pro-name">小米壁画电视 65英寸</div>
                                <div class="pro-price">6999元</div>
                              </a>
                            </li>
                            <li class="product">
                              <a href="" target="_blank">
                                <div class="pro-img">
                                  <img src="../../public/imgs/nav-img/nav-3-2.jpg" alt="">
                                </div>
                                <div class="pro-name">小米全面屏电视E55A</div>
                                <div class="pro-price">1999元</div>
                              </a>
                            </li>
                            <li class="product">
                              <a href="" target="_blank">
                                <div class="pro-img">
                                  <img src="../../public/imgs/nav-img/nav-3-3.png" alt="">
                                </div>
                                <div class="pro-name">小米电视4A 32英寸</div>
                                <div class="pro-price">699元</div>
                              </a>
                            </li>
                            <li class="product">
                              <a href="" target="_blank">
                                <div class="pro-img">
                                  <img src="../../public/imgs/nav-img/nav-3-4.jpg" alt="">
                                </div>
                                <div class="pro-name">小米电视4A 55英寸</div>
                                <div class="pro-price">1799元</div>
                              </a>
                            </li>
                            <li class="product">
                              <a href="" target="_blank">
                                <div class="pro-img">
                                  <img src="../../public/imgs/nav-img/nav-3-5.jpg" alt="">
                                </div>
                                <div class="pro-name">小米电视4A 65英寸</div>
                                <div class="pro-price">2699元</div>
                              </a>
                            </li>
                            <li class="product">
                              <a href="" target="_blank">
                                <div class="pro-img">
                                  <img src="../../public/imgs/nav-img/nav-3-6.png" alt="">
                                </div>
                                <div class="pro-name">查看全部</div>
                                <div class="pro-price">查看全部</div>
                              </a>
                            </li>
                          </ul>
                        </div>
                    </div>
                </div>
                <div class="header-search">
                    <!-- 习惯上 wrapper表示封装单个对象，赋予其更多的功能和接口,container包含多个元素的结构 -->
                    <div class="wrapper">
                        <input type="text" name="keyword">
                        <a href="javascript:;"></a>
                    </div>
                </div>
            </div>
          </div>  
        

    </div>
</template>
<script>
import { getCurrentInstance, computed, onMounted, ref,reactive,onUpdated } from "vue";
import { useRouter,useRoute } from 'vue-router'
import axios from 'axios'
import cookies from 'vue-cookies'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/index.css';
export default {
    name: 'nav-header',
    setup(){
    //vue3 路由使用!!!这样设置可以避免手动刷新
    const router = useRouter();
    const route=useRoute()
    
    let phoneList = ref([]);
    const store = useStore()
    let test=ref(0)
  
    onMounted(() => {
      getProductList();
      let params= history.state.params
      //如果路由来源为login，需要重新获取购物车数量，因为路由跳转不算页面刷新，不会促发app.vue的mount，购物车数量不会直接更新
      if (params && params.from == 'login') {
        getCartCount();
      }
  
    });
   
  

    let username = computed(() => {
     
      return store.state.username
    })
    
    let cartCount=computed(()=>{
      return store.state.cartCount
    })

    const login = () => {
      //编程式路由跳转
      router.push("/login");
    };
    const getProductList = () => {
      //get使用params，post使用data
        axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 6
        }
      }).then((res) => {
        if (res.list.length >= 6) {
          //ref需要.value
          phoneList.value = res.list.slice(0, 6);
        }
      })
    
    };
    const getCartCount = () => {
      axios.get('/carts/products/sum').then((res = 0) => {
        // to-do 保存到vuex里面
        if (res) {
          store.dispatch('saveCartCount', res)
        }

      })
    }
    const goToCart = () => {
      router.push("/cart");
    };
    const logout=()=>{
      axios.post('/user/logout').then(() => {
        ElMessage.success('退出成功');
        //清空cookie
        cookies.set('userId', '', { expires: '-1' });
        store.dispatch('saveUserName', '');
        store.dispatch('saveCartCount', '0');
      })
    }
    return {
      test,
      username,
      cartCount,
      phoneList,
      login,
      getProductList,
      goToCart,
      logout
    };

    }
}
</script>
<style lang="scss">
// 引入的样式文件是全局的，除非加了scoped，否则其它文件能公用这个样式
// 但config.scss和mixin.scss不属于样式，而是定义的变量与函数，所以需要单独引入
@import './../assets/scss/base.scss';
@import './../assets/scss/mixin.scss';
@import './../assets/scss/config.scss';
  .header{
    // sass的样式嵌套
    .nav-topbar{
      // 单行文字垂直居中：令行高=文字高度
      height:39px;
      line-height:39px;
      background-color:$colorB;
      color:#B0B0B0;
      .container{
        //调用sass样式复用
        @include flex();
        a{
          display:inline-block;
          color:#B0B0B0;
          margin-right:17px;
        }
        .my-cart{
          width:110px;
          background-color:$colorA;
          text-align:center;
          color:$colorG;
          margin-right:0;
          .icon-cart{
            
            @include bgImg(16px,12px,'../../public/imgs/icon-cart-checked.png');
            margin-right:4px;
          }
        }
      }
    }
    .nav-header{
      .container{
        // 子绝父相
        position:relative;
        height:112px;
        @include flex();
       
        .header-menu{
          display:inline-block;
          width:643px;
          padding-left:209px;
          .item-menu{
            display:inline-block;
            color:$colorB;
            font-weight:bold;
            font-size:16px;
            line-height:112px;
            margin-right:20px;
            span{
              
              //定义鼠标指针
              cursor:pointer;
            //   &:hover{
            //     color:$colorA;
            //   }
            //   // 兄弟选择器：+
            //   &:hover+.children{
                
            //     height:220px;
            //     opacity: 1;
            //不能使用，鼠标一旦离开span标签，下拉菜单就会消失，但如果把hover加在父元素上，下拉菜单也算在hover区域内，不会消失    
              
              
            // }
            }
            &:hover{
                 color:$colorA;
                 .children{
                  height:220px;
                  opacity: 1;
                 }
              }

            
            .children{
              position:absolute;
              top:112px;
              left:0;
              width:1226px;
              height: 0;
              border-top:1px solid $colorH;
              //清除浮动；清除溢出，防止子盒子显示
              overflow: hidden;
              opacity: 0;
              // 盒子阴影 水平阴影 垂直阴影 阴影虚实度 阴影尺寸
              box-shadow:0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              // 定位叠放次序
              z-index: 10;
              transition: all 0.5s;
              background-color: $colorG;
             
              .product{
                position:relative;
                float:left;
                width:16.6%;
                height:220px;
                font-size:12px;
                line-height:12px;
                text-align: center;
                a{
                  display:inline-block;
                }
                img{
                  width:auto;
                  height:111px;
                  margin-top:26px;
                }
                .pro-img{
                  height:137px;
                }
                .pro-name{
                  font-weight:bold;
                  margin-top:19px;
                  margin-bottom:8px;
                  color:$colorB;
                }
                .pro-price{
                  color:$colorA;
                }
                // 竖线高度和盒子不同，用伪类实现
                &:before{
                  content:'';
                  position:absolute;
                  top:28px;
                  right:0;
                  border-left:1px solid $colorF;
                  height:100px;
                  width:1px;
                }
                // 结构伪类选择器，选取最后一个子元素
                &:last-child:before{
                  display:none;
                }
              }
            }
          }
        }
        .header-search{
          width:319px;
          .wrapper{
            height:50px;
            border:1px solid #E0E0E0;
            display:flex;
            align-items:center;
            input{
              border:none;
              //盒子模型，padding和border不会撑大盒子
              box-sizing: border-box;
              border-right:1px solid #E0E0E0;
              width:264px;
              height:50px;
              padding-left:14px;
            }
            a{
              @include bgImg(18px,18px,'../../public/imgs/icon-search.png');
              margin-left:17px;
            }
          }
        }
      }
    }
  }


</style>