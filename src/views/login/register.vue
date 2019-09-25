<template>
  <div id="register" :style="'padding-top:'+ top +'px'">
    <van-nav-bar :border="false" @click-left="$router.push('/')">
      <template slot="left">
        <van-icon class-prefix="icon" name="bigclose" color="#333" />
      </template>
    </van-nav-bar>
    <div class="register">
      <div class="main">
        <h1>手机号注册</h1>
        <p>
          已有账号，
          <span @click="$router.push('/login/home')">立即登录</span>
        </p>
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="$store.state.register.telephone"
            clearable
            placeholder="请输入手机号"
            class="field"
            type="number"
            pattern="[0-9]*"
            :border="false"
          >
            <template slot="left-icon">
              <van-icon name="phone" color="#333" />
            </template>
          </van-field>
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="loading"
          loading-type="spinner"
          @click="sendchecknum"
          class="btn"
          :hairline="false"
        >获取验证码</van-button>
        <p>注册即同意《XXX用户协议》</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      top: 0,
      loading: false
    };
  },
  created() {
    // if (this.$METHOD.getStore("token")) {
    //   this.$router.push("/");
    // }
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
  beforeDestroy() {
    if (window.navigator.userAgent.match(/APICloud/i)) {
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(255,255,255,0)"
      });
    }
  },
  methods: {
    sendchecknum() {
      var that = this;
      that.loading = true;
      if (that.$store.state.register.telephone.length > 0) {
        that.$SERVER
          .sendchecknum({
            telephone: that.$store.state.register.telephone
          })
          .then(res => {
            that.$toast.success("验证码发送成功！");
            that.$router.push("/register/2");
          })
          .catch(res => {
            that.loading = false;
          });
      } else {
        that.$toast.fail("请输入手机号码");
      }
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
}
</style>
