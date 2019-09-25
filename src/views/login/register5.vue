<template>
  <div id="register" :style="'padding-top:'+ top +'px'">
    <van-nav-bar :border="false" @click-left="$router.push('/')">
      <template slot="left">
        <van-icon class-prefix="icon" name="bigclose" color="#333" />
      </template>
    </van-nav-bar>
    <div class="register">
      <div class="main">
        <h1>上传头像</h1>
        <p>五官清晰的照片，获得青睐的概率更高</p>
        <div class="avatar" @click="$refs.upload.openLoadPopup()">
          <img :src="$store.state.register.image" v-if="$store.state.register.image" />
          <van-icon class-prefix="icon" name="xiangji" size="80px" color="#fff" v-else />
        </div>
        <div class="again">点击上传头像</div>
        <van-button
          type="primary"
          size="large"
          :loading="loading"
          loading-type="spinner"
          @click="regFn"
          class="btn"
          :hairline="false"
        >完成进入</van-button>
      </div>
    </div>
    <!-- 上传头像层 -->
    <uploadAvatar ref="upload" @uploadSuccess="uploadSuccess" appearance="circular" mode="image" />
  </div>
</template>
<script>
import uploadAvatar from "@/components/upload/uploadAvatar.vue";
export default {
  name: "register5",
  components: {
    uploadAvatar
  },
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
    uploadSuccess(val) {
      this.$store.state.register.image = val;
    },
    regFn() {
      var that = this;
      if (!that.$store.state.register.image) {
        that.$toast.fail("请上传头像！");
        return;
      }
      that.$SERVER
        .register(that.$store.state.register)
        .then(res => {
          that.$toast.success("注册成功");
          that.loading = false;
          that.$SERVER.login({
            telephone: that.$store.state.register.telephone,
            password: that.$store.state.register.password
          }).then(res => {
            that.$toast.success("登录成功");
            that.$METHOD.setStore("token", res.data.token);
            that.$METHOD.setStore("userInfo", res.data);
            that.$store.state.token = res.data.token;
            that.$store.state.userInfo = res.data;
            that.loginLoading = false;
            if (window.navigator.userAgent.match(/APICloud/i)) {
              that.$RONGYUN.initRongyun(); //初始化融云
            }
            that.$router.push("/");
          });
          
        })
        .catch(res => {
          this.loading = false;
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
    color: #999;
    line-height: 20px;
    text-align: center;
    margin: 37px 0 22px;
  }
  .selectSex {
    display: flex;
    justify-content: space-between;
    .item {
      img {
        width: 151px;
        height: 50px;
      }
    }
  }
  .avatar {
    width: 110px;
    height: 110px;
    line-height: 110px;
    text-align: center;
    border-radius: 50%;
    overflow: hidden;
    background: #999;
    margin: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
