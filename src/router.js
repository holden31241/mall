
import Home from './pages/home'
import Index from './pages/index'
// import Login from './pages/login'
// import Product from './pages/product'
// import Detail from './pages/detail'
// import Cart from './pages/cart'
// import Order from './pages/order'
// import OrderList from './pages/orderList'
// import OrderConfirm from './pages/orderConfirm'
// import OrderPay from './pages/orderPay'
// import AliPay from './pages/aliPay'

import { createRouter, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            redirect:'/index',
            children: [
                {
                    path: 'index',
                    name: 'index',
                    component: Index,
                },
                {
                    path: 'product/:id',
                    name: 'product',
                    // 路由按需加载
                    component: () => import('./pages/product.vue')
                },
                {
                    path: 'detail/:id',
                    name: 'detail',
                    component: () => import('./pages/detail.vue')
                }

            ]



        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./pages/login.vue'),
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('./pages/cart.vue'),
        },
        {
            path: '/order',
            name: 'order',
            component: () => import('./pages/order.vue'),
            children: [
                {
                    path: 'list',
                    name: 'order-list',
                    component: () => import('./pages/orderList.vue'),

                },
                {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: () => import('./pages/orderConfirm.vue'),
                },
                {
                    path: 'pay',
                    name: 'order-pay',
                    component: () => import('./pages/orderPay.vue'),
                },
                {
                    path: 'alipay',
                    name: 'alipay',
                    component: () => import('./pages/aliPay.vue'),
                }
            ]
        }
    ]

})
export default router




