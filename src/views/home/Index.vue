<template>
  <div class="index">
    <div class="container">
      <!-- 轮播 -->
      <div class="swiper-box">
        <!--左侧分类栏 -->
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li
              class="menu-item"
              v-for="(cate,index) in cateList"
              :key="index"
              @mouseover="selectCateItem(index)"
              @mouseleave="catePaneVisible = false"
            >
              <a href="javascript:;">
                {{cate.cateName}}
                <i class="el-icon-arrow-right"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- 隐藏分类项具体列表 -->
        <div
          v-show="catePaneVisible"
          class="tab-pane"
          @mouseover="catePaneVisible = true"
          @mouseleave="catePaneVisible = false"
        >
          <div class="tab-pane-items" v-for="(item, index) in curCateList" :key="index">
            <a :href="`/#/product/${item.id}`">
              <img :src="item.img" />
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- 轮播图 -->
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(banner, index) in bannerList" :key="index">
            <a :href="`/#/product/${banner.productId}`">
              <img :src="banner.img" />
            </a>
          </swiper-slide>
          <!-- 分页器 -->
          <div class="swiper-pagination" slot="pagination"></div>
          <!-- 前进后退按钮 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="`/#/product/${item.id}`" v-for="(item,index) in absList" :key="index">
          <img v-lazy="item.img" />
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="`/imgs/banner-1.png`" />
        </a>
      </div>
    </div>
    <!-- 产品 -->
    <div class="product-box" v-for="(pro,index) in productList" :key="index">
      <div class="container">
        <h2>{{pro.cateType}}</h2>
        <div class="wrapper">
          <!-- 左侧大图 -->
          <div class="banner-left">
            <div v-for="(banner, index) in pro.advert" :key="index">
              <a :href="`/#/product/houseEle`">
                <img v-lazy="banner"  />
              </a>
            </div>
          </div>
          <!-- 右侧 -->
          <div class="list-box">
            <div class="item" v-for="(proItem, j) in pro.content[0].children" :key="j">
              <a :href="`/#/detail/${proItem.productId}`">
                <div class="item-img">
                  <img v-lazy="proItem.img" />
                </div>
                <div class="item-info">
                  <h3>{{ proItem.name }}</h3>
                  <p>{{ proItem.brief }}</p>
                  <p class="price">{{ proItem.price }}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from "@/components/ServiceBar";
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import { getCateList, getBanners, getHomeProductList } from "@/api/index.js";

export default {
  name: "index",
  components: {
    Swiper,
    SwiperSlide,
    ServiceBar
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOptions: {
        loop: true, // 循环
        effect: "cube", //切换效果
        cubeEffect: {
          shadowOffset: 100, //投影距离。默认 20，单位px。
          shadowScale: 0.6 //投影缩放比例。默认0.94。
        },
        autoplay: {
          delay: 2000, // 自动播放
          stopOnLastSlide: false, //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）。
          disableOnInteraction: false // 触摸滑动后是否继续轮播
        },
        // 分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true //点击可切换
        },
        // 前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      bannerList: [],
      cateList: [],
      curCateList: [],
      catePaneVisible: false,
      absList: [
        {
          id: 33,
          img: "/imgs/ads/ads-1.png"
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png"
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg"
        }
      ],
      productList: []
    };
  },
  created() {
    this.getBannerList();
    this.getCateList();
    this.getProductList();
  },
  methods: {
    // 获取轮播图列表
    getBannerList() {
      getBanners().then(res => {
        this.bannerList = res;
      });
    },
    //获取分类
    getCateList() {
      getCateList().then(res => {

        res.forEach(cate => {
          cate.children.forEach(product => {
            product.id = cate.cateId;
          });
        });

        this.cateList = res;
        this.curCateList = res[0].childredn;
      });
    },
    // 选择分类项
    selectCateItem(index) {
      this.curCateList = this.cateList[index].children;
      this.catePaneVisible = true;
    },
    //获取商品
    getProductList() {
      getHomeProductList().then(res => {
        this.productList = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/css/mixin.scss";
@import "~assets/css/config.scss";
.index {
  .swiper-box {
    position: relative;
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0px;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 40px;
          line-height: 40px;
          a {
            font-size: 16px;
            color: #ffffff;
            padding-left: 30px;
            position: relative;
            display: block;
            i {
              position: absolute;
              right: 22px;
              top: 12.5px;
            }
          }
          &:hover {
            background-color: $colorA;
          }
        }
      }
    }
    .tab-pane {
      height: 451x;
      position: absolute;
      left: 264px;
      z-index: 99;
      border: 1px solid #e0e0e0;
      border-left: 0;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18);
      background-color: #fff;
      writing-mode: vertical-lr; //垂直方向，从左向右
      .tab-pane-items {
        display: inline-block;
        writing-mode: horizontal-tb;
        width: 248px;
        height: 72px;
        a {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: 14px;
          padding: 18px 20px;
          color: #333;
          transition: color 0.2s;
          &:hover {
            color: #ff6700;
          }
          img {
            margin-right: 15px;
          }
        }
      }
    }

    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .banner {
    margin-bottom: 50px;
    a {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .product-box {
    margin-top: 20px;
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
    }
    .wrapper {
      display: flex;
      height: 614px;
      .banner-left {
        display: flex;
        flex-flow: column nowrap;
        margin-right: 16px;
        width: 234px;
        height: 614px;
        div {
          a {
            display: block;
            img {
              width: 234px;
            }
          }
          &:nth-child(1) {
            margin-bottom: 16px;
          }
        }
      }
      .list-box {
        width: 986px;
        height: 614px;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        .item {
          width: 236px;
          height: 302px;
          background-color: $colorG;
          text-align: center;
          &:nth-child(-n + 4) {
            //选中从第1个到第4个子元素
            margin-bottom: 14px;
          }
          .item-img {
            img {
              margin: 10px 0;
              height: 195px;
            }
          }
          .item-info {
            h3 {
              font-size: $fontJ;
              color: $colorB;
              line-height: $fontJ;
              font-weight: bold;
            }
            p {
              color: $colorD;
              line-height: 13px;
              margin: 6px auto 13px;
            }
            .price {
              color: #f20a0a;
              font-size: $fontJ;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>
