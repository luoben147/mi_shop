<template>
  <div class="detail">
    <product-param :title="productInfo.name"></product-param>
    <div class="wrapper">
      <div class="container clearfix">
        <div class="swiper">
          <swiper :options="swiperOption">
            <swiper-slide>
              <img src="/imgs/detail/phone-1.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-2.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-3.jpg" alt />
            </swiper-slide>
            <swiper-slide>
              <img src="/imgs/detail/phone-4.jpg" alt />
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="content">
          <h2 class="item-title">{{productInfo.name}}</h2>
          <p class="item-info" v-html="productInfo.desc">
            相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
            <br />外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
          </p>
          <div class="delivery">小米自营</div>
          <div class="item-price">
            1699元
            <span class="del">1999元</span>
          </div>
          <div class="line"></div>
          <!-- 收货地址 -->
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <!-- 商品属性 -->
          <div class="item-attr-info">
            <div
              class="item-attr"
              v-for="(item, index) in productInfo.productAttrList"
              :key="index"
            >
              <h2>选择{{ item.attrName }}</h2>
              <ul class="product-attrs">
                <li
                  class="product-attr"
                  :class="{ checked: attrIds.includes(attr.propId) }"
                  v-for="(attr, attrIndex) in item.attrVals"
                  :key="attrIndex"
                  @click="selectAttr(item.attrName, attr.propId)"
                >{{ attr.attrVal }}-{{attr.propId}}</li>
              </ul>
            </div>
          </div>
          <!--价格  -->
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl">{{ goodsInfo.name }}</div>
              <div class="fr">{{ goodsInfo.price }}元</div>
            </div>
            <div class="phone-total">总计：{{goodsInfo.price}}元</div>
          </div>
          <!--  -->
          <div class="btn-group">
            <a href="javascript:;" class="btn btn-huge fl" @click="addCart">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" alt />
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import ProductParam from "@/components/ProductParam.vue";
import ServiceBar from "@/components/ServiceBar";
import { getProductDetail, addCart } from "@/api/index.js";

export default {
  name: "detail",
  components: {
    Swiper,
    SwiperSlide,
    ProductParam,
    ServiceBar
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000, // 自动播放
          stopOnLastSlide: false,
          disableOnInteraction: false // 触摸滑动后是否继续轮播
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // 前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      productInfo: {},
      goodsInfo: {},
      goodsAttrs: [],
      attrIds: [],
      illegalClick: false
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      let proId = this.$route.params.id;
      getProductDetail(proId).then(res => {
        this.productInfo = res;
        this.goodsInfo = res.goodsList[0];
        this.goodsAttrs = this.goodsInfo.goodsAttrs;
        this.goodsAttrs.forEach(e => {
          this.attrIds.push(e.attrId);
        });
      });
    },
    //选择属性
    selectAttr(attrName, propId) {
      if (this.illegalClick || this.attrIds.includes(propId)) {
        return ;
      }
      // 构建选择的商品属性
      let selGoodsAttrs = [];
      this.goodsAttrs.forEach(e => {
        let goodsAttr = {};
        goodsAttr.attrName = e.attrName;
        goodsAttr.attrId = e.attrId;
        if (e.attrName === attrName) {
          goodsAttr.attrId = propId;
        }
        selGoodsAttrs.push(goodsAttr);
      });

      let notMatch = true;
      this.productInfo.goodsList.forEach(goods => {
        // 遍历匹配商品属性
        let cnt = 0;
        goods.goodsAttrs.forEach(attr => {
          selGoodsAttrs.forEach(selAttr => {
            if (
              attr.attrName === selAttr.attrName &&
              attr.attrId === selAttr.attrId
            ) {
              cnt = cnt + 1;
            }
          });
        });

        // 所有属性都匹配成功 替换具体商品
        if (cnt === selGoodsAttrs.length) {
          this.goodsInfo = goods;
          this.goodsAttrs = this.goodsInfo.goodsAttrs;
          this.attrIds.splice(0, this.attrIds.length);
          this.goodsAttrs.forEach(e => {
            this.attrIds.push(e.attrId);
          });
          notMatch = false;
          return;
        }
      });
      if (notMatch) {
        this.illegalClick = true;
        this.$message.warning({
          message: "没货!",
          center: true,
          duration: 800,
          onClose: () => {
            this.illegalClick = false;
          }
        });
      }
    },
    addCart() {
      addCart(this.goodsInfo.goodsId).then(() => {
        this.$router.push("/cart");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/css/config.scss";
@import "~assets/css/mixin.scss";
@import "~assets/css/botton.scss";
.detail {
  .wrapper {
    .swiper {
      float: left;
      width: 560px;
      height: 560px;
      margin-top: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      float: right;
      width: 584px;
      //height: 870px;
      .item-title {
        font-size: 28px;
        padding-top: 30px;
        padding-bottom: 16px;
        height: 26px;
      }
      .item-info {
        font-size: 14px;
        height: 36px;
      }
      .delivery {
        font-size: 16px;
        color: #ff6700;
        margin-top: 26px;
        margin-bottom: 14px;
        height: 15px;
      }
      .item-price {
        font-size: 20px;
        color: #ff6700;
        height: 19px;
        .del {
          font-size: 16px;
          color: #999999;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .line {
        height: 0;
        margin-top: 25px;
        margin-bottom: 28px;
        border-top: 1px solid #e5e5e5;
      }
      .item-addr {
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        padding-top: 31px;
        padding-left: 64px;
        font-size: 14px;
        line-height: 14px;
        position: relative;
        .icon-loc {
          position: absolute;
          top: 27px;
          left: 34px;
          @include bgImg(20px, 20px, "/imgs/detail/icon-loc.png");
        }
        .addr {
          color: #666666;
        }
        .stock {
          margin-top: 15px;
          color: #ff6700;
        }
      }
      .item-attr-info {
        margin-top: 30px;
        .item-attr {
          margin-bottom: 10px;
          h2 {
            font-size: 18px;
            margin-bottom: 12px;
          }
          .product-attrs {
            display: flex;
            justify-content: space-between;
            flex-flow: row wrap;
            .product-attr {
              width: 287px;
              height: 50px;
              line-height: 50px;
              font-size: 16px;
              margin-bottom: 12px;
              color: #333;
              border: 1px solid #e5e5e5;
              box-sizing: border-box;
              text-align: center;
              cursor: pointer;
              &.checked {
                border: 1px solid #ff6600;
                color: #ff6600;
              }
            }
          }
        }
      }
      .item-total {
        height: 108px;
        background: #fafafa;
        padding: 24px 33px 29px 30px;
        font-size: 14px;

        margin-top: 50px;
        margin-bottom: 30px;
        box-sizing: border-box;
        .phone-total {
          font-size: 24px;
          color: #ff6600;
          margin-top: 18px;
        }
      }
      .btn-group {
        padding-bottom: 80px;
      }
    }
  }
  .price-info {
    background-color: #f3f3f3;
    height: 340px;
    h2 {
      font-size: 24px;
      color: #333333;
      padding-top: 38px;
      margin-bottom: 30px;
    }
  }
}
</style>