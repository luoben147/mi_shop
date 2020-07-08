<template>
  <div class="cart">
    <order-header title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准，请尽快结算</span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list" v-for="(item,i) in  cartList" :key="i">
            <li class="cart-item">
              <div class="item-check">
                <span
                  class="checkbox"
                  :class="{ 'checked': item.selected === 1 }"
                  @click="updateCart(item)"
                ></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.img + '?thumb=1&w=320&h=320'" alt />
                <span>{{ item.name }}</span>
              </div>
              <div class="item-price">{{ item.price }}元</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="updateCart(item, '-')">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;" @click="updateCart(item, '+')">+</a>
                </div>
              </div>
              <!-- 应该由后台返回价格，不应前端计算 -->
              <div class="item-total">{{ item.price*item.quantity }}元</div>
              <div class="item-del" @click="delProduct(item.id)"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/">继续购物</a>
            共
            <span>{{cartList.length}}</span>件商品，已选择
            <span>{{selectedCartCount}}</span>件
          </div>
          <div class="total fr">
            合计：
            <span>{{totalPrice}}</span>元
            <a href="javascript:;" class="btn" @click="order">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader";
import NavFooter from "@/components/NavFooter";
import ServiceBar from "@/components/ServiceBar";
import {
  getCartList,
  cartSelectAll,
  updCartCnt,
  delCart
} from "@/api/index.js";
export default {
  name: "cart",
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      allChecked: false, //是否全选
      cartList: [], //商品列表
      totalPrice: 0, //商品总价
      selectedCartCount: 0, //选中商品数量
      totalNum: 0 //购物车里的商品总数量
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    // 获取购物车列表
    getCartList() {
      getCartList().then(res => {
        this.renderData(res);
      });
    },
    // 修改购物车数量
    updateCart(item, type) {
      let quantity = item.quantity;
      let selected = item.selected === 1 ? 1 : 0;
      if (type == "-") {
        if (quantity == 1) {
          this.$message.warning("商品至少保留1件");
          return;
        }
        --quantity;
      } else if (type == "+") {
        if (quantity > item.stock) {
          this.$message.warning("购买数量不能超过库存数量");
          return;
        }
        ++quantity;
      } else {
        selected = item.selected === 1 ? 0 : 1;
      }
      updCartCnt(item.id, { quantity, selected }).then(res => {
        this.renderData(res);
      });
    },
    //删除商品
    delProduct(id) {
      delCart(id).then(res => {
        this.renderData(res);
      });
    },
    //公共赋值
    renderData(res) {
      this.cartList = res.CartProducts;
      this.totalPrice = res.amount;
      this.selectedCartCount = res.selectedCartCnt;
      this.totalNum = res.totalCartCnt;

      if (res.selectedCartCnt === res.CartProducts.length) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    // 去结算
    order() {
      let isCheck = this.cartList.every(item => !(item.selected == 1));
      if (isCheck) {
        this.$message.warning("请选择一件商品");
        return;
      }
      this.$router.push("/order/confirm");
    },
    //全选
    toggleAll() {
      if (this.cartList.length === 0) {
        this.$message.warning("没有商品");
        return;
      }
      let selectAll = this.allChecked ? 0 : 1;
      cartSelectAll(selectAll).then(res => {
        this.renderg(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/css/config.scss";
@import "~assets/css/botton.scss";
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>
