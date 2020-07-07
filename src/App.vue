<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getUserInfo } from "@/api/index.js";
export default {
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(res => {
        if (res) {
          this.$store.dispatch("saveUserName", res.username);
          this.$store.dispatch("saveCartCount", res.cartCnt);
        } else {
          this.$cookies.remove("userId");
        }
      });
    }
  }
};
</script>
<style>
@import "./assets/css/reset.scss";
@import "./assets/css/base.scss";
</style>
