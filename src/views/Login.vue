<template>
  <div class="login">
    <div class="container">
      <a href="/#/index">
        <img src="/imgs/login-logo.png" alt />
      </a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
            <span class="sep-line"></span>
            <span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="loginForm.username" />
          </div>
          <div class="input">
            <input type="password" placeholder="请输入密码" v-model="loginForm.password" />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">
              立即注册
              <span>|</span>忘记密码？
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postLogin, getUserInfo } from "@/api/index.js";
export default {
  data() {
    return {
      username: '',
      password: '',
      userId: "",
      loginForm: {
        username: 'rzcoding',
        password: 'rzcoding'
      },
    };
  },
  methods: {
    login() {
      let { username, password } = this;
      new Promise((resolve, reject) => {
        postLogin(this.loginForm).then(res => {
          let token = res;
          this.$cookies.set('mi-session-id', token, 60 * 60 * 24 * 7);
          resolve();
        });
      }).then(() => {
        getUserInfo().then(res => {
          this.$cookies.set("userId", res.userId, 60 * 60 * 24 * 7);
          //TODO  保存用户信息
          this.$store.dispatch('saveUserName', res.username)
          this.$store.dispatch('saveCartCount', res.cartCnt)
          // 通过编程式导航跳转到后台主页
          this.$router.push("/index");
        });
      });

      


    },
    register() {}
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/css/config.scss";
@import "~assets/css/botton.scss";
.login {
  height: 686px;
  margin: 0 auto;
  .container {
    height: 98px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 588px;
      position: relative;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 20px;
        h3 {
          padding: 27px 0 24px;
          text-align: center;
          font-size: 24px;
          color: #666;
          .sep-line {
            width: 1px;
            height: 24px;
            margin: 0 42px;
            border: 1px solid #e0e0e0;
          }
          .checked {
            color: #f56600;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
            box-sizing: border-box;
          }
        }
        .btn {
          width: 100%;
          height: 50px;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
}
</style>