<template>
    <div class="login">
        <div class="container">
            <a href="/#/index"><img src="../../public/imgs/login-logo.png" alt=""></a>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
                    </h3>
                    <div class="input">
                        <input type="text" placeholder="请输入帐号" v-model="username">
                    </div>
                    <div class="input">
                        <input type="password" placeholder="请输入密码" v-model="password">
                    </div>
                    <div class="btn-box">
                        <a href="javascript:;" class="btn" @click="login">登录</a>
                    </div>
                    <div class="tips">
                        <div class="sms" @click="register">手机短信登录/注册</div>
                        <div class="reg">立即注册<span>|</span>忘记密码？</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer-link">
                <a href="" target="_blank">主页1</a><span>|</span>
                <a href="" target="_blank">主页2</a><span>|</span>
                <a href="" target="_blank">主页3</a><span>|</span>
                <a href="" target="_blank">主页4</a>
            </div>
            <p class="copyright">Copyright ©2023 mi.futurefe.com All Rights Reserved.</p>
        </div>
    </div>
</template>
<script>

import cookies from 'vue-cookies'
import axios from 'axios'
import { useRouter } from 'vue-router'
import {  ref } from "vue";
export default {
    name: 'login',
    setup(){
        let username=ref('')
        let password=ref('')
        let userId=ref('')
        const router = ref(useRouter());
        // res = response.data
        //response:{status,data}
        const login=()=>{
            axios.post('/user/login', {
            username,
            password
        }).then((res) => {
            // cookies用法，expires: '1M'表示保存日期
            cookies.set('userId', res.id, { expires: '1M' });
           
            router.value.push('/index');
        })
        }
        const register=()=>{
                    // axios.post('/user/register', {
                    //     username: 'holden',
                    //     password: '123456',
                    //     email: 'holden@163.com'
                    // }).then(() => {
                    //     alert('注册成功');
                    // })
                }
            
        return{
            username,
            password,
            login,
            register
        }
    }
    
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
.login {
    // > 选择父标签内所以最近一级container子标签
    &>.container {
        height: 113px;

        img {
            width: auto;
            height: 100%;
        }
    }

    .wrapper {
        background: url('../../public/imgs/login-bg.jpg') no-repeat center;

        .container {
            height: 576px;

            .login-form {
                box-sizing: border-box;
                padding-left: 31px;
                padding-right: 31px;
                width: 410px;
                height: 510px;
                background-color: $colorG;
                position: absolute;
                bottom: 29px;
                right: 0;

                h3 {
                    line-height: 23px;
                    font-size: 24px;
                    text-align: center;
                    margin: 40px auto 49px;

                    .checked {
                        color: $colorA;
                    }

                    .sep-line {
                        margin: 0 32px;
                    }
                }

                .input {
                    display: inline-block;
                    width: 348px;
                    height: 50px;
                    border: 1px solid $colorH;
                    margin-bottom: 20px;

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        padding: 18px;
                    }
                }

                .btn {
                    width: 100%;
                    line-height: 50px;
                    margin-top: 10px;
                    font-size: 16px;
                }

                .tips {
                    margin-top: 14px;
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    cursor: pointer;

                    .sms {
                        color: $colorA;
                    }

                    .reg {
                        color: $colorD;

                        span {
                            margin: 0 7px;
                        }
                    }
                }
            }
        }
    }

    .footer {
        height: 100px;
        padding-top: 60px;
        color: $colorD;
        font-size: 16px;
        text-align: center;

        .footer-link {
            a {
                color: $colorD;
                display: inline-block;
            }

            span {
                margin: 0 10px;
            }
        }

        .copyright {
            margin-top: 13px;
        }
    }
}
</style>