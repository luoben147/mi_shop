import http from '@/util/request'

// 获取导航栏数据
export function getNavItem() {
    return http.get('navItem')
  }
  
  // 获取首页分类列表
  export function getCateList() {
    return http.get('leftCategory')
  }
  
  // 获取首页轮播图
  export function getBanners() {
    return http.get('banners')
  }
  
  // 获取首页产品列表
  export function getHomeProductList() {
    return http.get('homeProduct')
  }
  
  // 获取产品详情
  export function getProductDetail(id) {
    return http.get(`product/${id}`)
  }
  
  // 登录
  export function postLogin(param) {
    return http.post('login', param)
  }
  
  // 退出
  export function postLogout() {
    return http.post('logout')
  }
  
  // 获取用户详情
  export function getUserInfo() {
    return http.get(`user`)
  }
  
  // 添加购物车
  export function addCart(goodsId) {
    return http.post(`cart?goodsId=${goodsId}`)
  }
  
  // 获取购物车数量
  export function getCartCnt() {
    return http.get(`cart/count`)
  }
  
  // 获取购物车列表
  export function getCartList(param) {
    return http.get(`cart/list`, { params: param })
  }
  
  // 购物车全选
  export function cartSelectAll(selectAll) {
    return http.put(`cart/selectAll/${selectAll}`)
  }
  
  // 修改购物车数量
  export function updCartCnt(id, param) {
    return http.put(`cart/${id}`, param)
  }
  
  // 删除购物车
  export function delCart(id) {
    return http.delete(`cart/${id}`)
  }
  
  // 收货地址列表
  export function getAddrList() {
    return http.get(`address/list`)
  }
  
  // 新增收货地址列表
  export function addAddress(param) {
    return http.post('address', param)
  }
  
  // 修改收货地址
  export function updAddress(id, param) {
    return http.put(`address/${id}`, param)
  }
  
  // 删除收货地址
  export function delAddress(id) {
    return http.delete(`address/${id}`)
  }
  
  // 创建订单
  export function addOrder(param) {
    return http.post('order', param)
  }
  
  // 订单详情
  export function getOrder(orderId) {
    return http.get(`order/${orderId}`)
  }
  
  // 订单列表
  export function getOrderList(param) {
    return http.get(`order/list`, { params: param })
  }
  
  // 支付
  export function pay(param) {
    return http.post(`pay/submit`, param)
  }