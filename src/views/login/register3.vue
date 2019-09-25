<template>
  <div id="register" :style="'padding-top:'+ top +'px'">
    <van-nav-bar :border="false" @click-left="$router.push('/')">
      <template slot="left">
        <van-icon class-prefix="icon" name="bigclose" color="#333" />
      </template>
    </van-nav-bar>
    <div class="register">
      <div class="main">
        <h1>设置密码</h1>
        <p>请设置一个安全好记的密码</p>
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="$store.state.register.password"
            clearable
            placeholder="请输入密码，6位以上"
            class="field"
            type="password"
            :border="false"
          ></van-field>
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="loading"
          loading-type="spinner"
          @click="setPassword"
          class="btn"
          :hairline="false"
        >下一步</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import regexUtil from "regex-util";
export default {
  name: "register3",
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
    setPassword() {
      if (!regexUtil.isPassword(this.$store.state.register.password)) {
        this.$toast.fail("请输入6-11位字母数字组合密码");
        return;
      }
      this.$router.push("/register/4");
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
