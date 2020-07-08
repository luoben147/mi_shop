<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getUserInfo } from "@/api/index.js";
export default {
  mounted() {
    if (this.$cookie.get("userId")) {
      this.getUserInfo();
    }
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
<style lang="scss">
@import "./assets/css/reset.scss";
@import "./assets/css/base.scss";
</style>
