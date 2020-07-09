import http from '@/util/request'

// 获取首页分类列表
export function getProductList(params) {
  return http.get('/products',{params})
}

// 获取产品详情
export function getProductDetail(id) {
  return http.get(`/products/${id}`)
}

// 登录
export function postLogin(param) {
  return http.post('/user/login', param)
}

// 注册
export function register(param) {
  return http.post('/user/register', param)
}

// 退出
export function postLogout() {
  return http.post('/user/logout')
}

// 获取用户详情
export function getUserInfo() {
  return http.get(`/user`)
}

// 添加购物车
export function addCart(params) {
  return http.post(`/carts`,params)
}

// 获取购物车数量
export function getCartCount() {
  return http.get(`/carts/products/sum`)
}

// 获取购物车列表
export function getCartList() {
  return http.get(`/carts`)
}

// 购物车全选
export function cartSelectAll(url) {
  return http.put(url)
}

// 修改购物车数量
export function updateCartCount(id, param) {
  return http.put(`/carts/${id}`, param)
}

// 删除购物车
export function delCart(id) {
  return http.delete(`/carts/${id}`)
}

// 收货地址列表
export function getAddrList() {
  return http.get(`/shippings`)
}

// 新增收货地址列表
export function addAddress(param) {
  return http.post('/shippings', param)
}

// 修改收货地址
export function updAddress(id, param) {
  return http.put(`/shippings/${id}`, param)
}

// 删除收货地址
export function delAddress(id) {
  return http.delete(`/shippings/${id}`)
}

// 创建订单
export function addOrder(param) {
  return http.post('/orders', param)
}

// 订单详情
export function getOrder(orderId) {
  return http.get(`/orders//${orderId}`)
}

// 订单列表
export function getOrderList(param) {
  return http.get(`order/list`, { params: param })
}

// 支付
export function pay(param) {
  return http.post(`/pay`, param)
}