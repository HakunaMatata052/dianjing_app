<template>
  <div id="register" :style="'padding-top:'+ top +'px'">
    <van-nav-bar :border="false" @click-left="$router.push('/')">
      <template slot="left">
        <van-icon class-prefix="icon" name="bigclose" color="#333" />
      </template>
    </van-nav-bar>
    <div class="register">
      <div class="main">
        <h1>填写验证码</h1>
        <p>
          验证码已通过短信发送至
          <br />
          {{$store.state.register.telephone}}
        </p>
        <van-password-input
          :value="$store.state.register.checknum"
          :mask="false"
          @focus="inputCheck"
          :length="5"
        />
        <div class="again">
          {{countDown}}s后
          <span @click="sendchecknum">再次发送</span>
        </div>
        <van-button
          type="primary"
          size="large"
          :loading="loading"
          loading-type="spinner"
          @click="checknum"
          class="btn"
          :hairline="false"
        >下一步</van-button>
      </div>
    </div>
    <van-number-keyboard
      :show="keyboardShow"
      v-model="$store.state.register.checknum"
      :maxlength="5"
      @blur="keyboardShow = false"
    />
  </div>
</template>
<script>
export default {
  name: "register2",
  data() {
    return {
      top:0,
      loading: false,
      keyboardShow: false,
      countDown: 60,
      checkNumDisabled: false,
      timer: null
    };
  },
  created() {
    if (this.$METHOD.getStore("token")) {
      this.$router.push("/");
    }
    if (window.navigator.userAgent.match(/APICloud/i)) {
      api.setStatusBarStyle({
        style: "light",
        color: "rgba(255,255,255,0)"
      });
      var systemType = this.$store.state.systemType;
      if (systemType == "android") {
        this.top = 25;
      }
      if (systemType == "ios") {
        this.top = 40;
      }
    }
  },
  mounted() {
    const timer_COUNT = 60;
    if (!this.timer) {
      this.countDown = timer_COUNT;
      this.checkNumDisabled = true;
      this.timer = setInterval(() => {
        if (this.countDown > 0 && this.countDown <= timer_COUNT) {
          this.countDown--;
        } else {
          this.checkNumDisabled = false;
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    if (window.navigator.userAgent.match(/APICloud/i)) {
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(255,255,255,0)"
      });
    }
  },
  methods: {
    sendchecknum() {
      if (!this.checkNumDisabled) {
        const timer_COUNT = 60;
        if (!this.timer) {
          this.countDown = timer_COUNT;
          this.checkNumDisabled = true;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= timer_COUNT) {
              this.countDown--;
            } else {
              this.checkNumDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.$SERVER
          .sendchecknum({
            telephone: this.$store.state.register.telephone
          })
          .then(res => {
            this.$toast.success("验证码发送成功！");
          })
          .catch(res => {
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      }
    },
    inputCheck() {
      this.keyboardShow = true;
    },
    checknum() {
      this.$SERVER
        .checknum({
          telephone: this.$store.state.register.telephone,
          checknum: this.$store.state.register.checknum
        })
        .then(res => {
          this.$router.push("/register/3");
        })
        .catch(err => {
          this.checkNumDisabled = false;
          clearInterval(this.timer);
          this.timer = null;
        });
    }
  }
};
</script>
<style lang="less">
#login .van-field__control {
  color: #fff;
}
</style>

<style lang="less" scoped>
#register {
  width: 100%;
  height: 100%;
  background: #fff;
      overflow: hidden;
  .register {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .main {
    width: 90%;
  }
  h1 {
    font-size: 30px;
    font-weight: 800;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    padding: 10px 0;
    margin-top: 55px;
  }
  p {
    font-size: 15px;
    font-weight: 400;
    color: rgba(179, 179, 179, 1);
    line-height: 20px;
    text-align: center;
    margin-bottom: 60px;
    span {
      color: #333;
    }
  }
  .cell-group,
  .field {
    background: none;
    border: 0;
  }
  .field {
    margin-bottom: 14px;
    border: 1px solid #333;
    border-radius: 50px;
  }
  .btn {
    background: rgba(254, 196, 58, 1);
    border-radius: 100px;
    margin-top: 40px;
    margin-bottom: 26px;
    font-size: 17px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    border: 0;
  }
  .again {
    font-size: 15px;
    font-weight: 400;
    color: rgba(255, 217, 72, 1);
    line-height: 20px;
    text-align: center;
    margin: 37px 0 22px;
    span {
      color: #999;
    }
  }
}
</style>
