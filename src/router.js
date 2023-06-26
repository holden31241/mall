
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Detail from './pages/detail'
import Cart from './pages/cart'
import Order from './pages/order'
import OrderList from './pages/orderList'
import OrderConfirm from './pages/orderConfirm'
import OrderPay from './pages/orderPay'

import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()

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
                    component: Product,
                },
                {
                    path: 'detail',
                    name: 'detail',
                    component: Detail,
                }

            ]



        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            children: [
                {
                    path: 'list',
                    name: 'order-list',
                    component: OrderList,
                },
                {
                    path: 'confirm',
                    name: 'order-confirm',
                    component: OrderConfirm,
                },
                {
                    path: 'pay',
                    name: 'order-pay',
                    component: OrderPay,
                }
            ]
        }
    ]

})
export default router




