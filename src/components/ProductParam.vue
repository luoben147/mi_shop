<template>
  <div class="nav-bar" :class="{'is_fixed':isFixed}">
    <div class="container">
      <div class="pro-title">{{title}}</div>
      <div class="pro-param">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  props:{
    title:String
  },
  data() {
    return {
        //是否浮动
      isFixed: false
    };
  },
  mounted() {
    // 绑定监听滚动事件
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.isFixed = scrollTop > 152 ? true : false;
    }
  },
  destroyed(){
      window.removeEventListener('scroll',this.initHeight, false)
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/css/config.scss";
@import "~assets/css/mixin.scss";
.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
   z-index:10;
  &.is_fixed{
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      span {
        margin: 0px 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>