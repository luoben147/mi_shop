import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home'
import Index from '@/views/home/Index'
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
        component: () => import('@/views/home/Product.vue'),
      }, {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('@/views/home/Detail'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component:  () => import('@/views/Login'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/cart/Cart'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/order/Order'),
    children: [
      {
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/OrderList'),
      },
      {
        path: 'confirm',
        name: 'OrderConfirm',
        component:() => import('@/views/order/OrderConfirm'),
      },
      {
        path: 'pay',
        name: 'OrderPay',
        component:() => import('@/views/pay/OrderPay'),
      },
      {
        path: 'alipay',
        name: 'alipay',
        component: () => import('@/views/pay/Alipay'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
