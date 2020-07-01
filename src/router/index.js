import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'
import Index from '@/views/home/Index'
import Product from '@/views/home/Product'
import Detail from '@/views/home/Detail'
import Cart from '@/views/cart/Cart'
import Order from '@/views/order/Order'
import OrderConfirm from '@/views/order/OrderConfirm'
import OrderList from '@/views/order/OrderList'
import OrderPay from '@/views/pay/OrderPay'
import Alipay from '@/views/pay/Alipay'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect:'/index',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: Index,
      }, {
        path: '/product/:id',
        name: 'Product',
        component: Product,
      }, {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail,
      }
    ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: OrderList,
      },
      {
        path: 'confirm',
        name: 'OrderConfirm',
        component: OrderConfirm,
      },
      {
        path: 'pay',
        name: 'OrderPay',
        component: OrderPay,
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: Alipay,
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
