<template>
  <div id="register" :style="'padding-top:'+ top +'px'">
    <van-nav-bar :border="false" @click-left="$router.push('/')">
      <template slot="left">
        <van-icon class-prefix="icon" name="bigclose" color="#333" />
      </template>
    </van-nav-bar>
    <div class="register">
      <div class="main">
        <h1>填写资料</h1>
        <p>提升自身魅力</p>
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="$store.state.register.nickname"
            clearable
            placeholder="填写昵称"
            class="field"
            type="text"
            :border="false"
          ></van-field>
          <van-field
            :value="$METHOD.format($store.state.register.birthday || Number(new Date().getTime()),'yyyy-MM-dd')"
            clearable
            placeholder="选择出生日期"
            class="field"
            type="text"
            :border="false"
            readonly
            @click="pickerPopupShow = true"
          ></van-field>
        </van-cell-group>
        <div class="selectSex">
          <div class="item" @click="selectSex(0)">
            <img src="../../assets/images/imgirl-active.png" v-if="$store.state.register.sex==0" />
            <img src="../../assets/images/imgirl.png" v-else />
          </div>
          <div class="item" @click="selectSex(1)">
            <img src="../../assets/images/imboy-active.png" v-if="$store.state.register.sex == 1" />
            <img src="../../assets/images/imboy.png" v-else />
          </div>
        </div>
        <div class="again">注册成功后，性别不可修改</div>
        <van-button
          type="primary"
          size="large"
          :loading="loading"
          loading-type="spinner"
          @click="setinfo"
          class="btn"
          :hairline="false"
        >下一步</van-button>
      </div>
    </div>
    <van-popup v-model="pickerPopupShow" position="bottom" get-container="body">
      <van-datetime-picker
        v-model="dateTime"
        type="date"
        :min-date="new Date(1900, 10, 1)"
        :max-date="new Date()"
        @cancel="pickerPopupShow = false"
        @confirm="pickerOnConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "register4",
  data() {
    return {
      top:0,
      loading: false,
      pickerPopupShow: false,
      dateTime: new Date()
    };
  },
  watch: {
    dateTime(newval) {
      this.$store.state.register.birthday = Number(newval.getTime());
    }
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
    selectSex(val) {
      this.$store.state.register.sex = val;
      console.log(this.$store.state.register.sex);
    },
    pickerOnConfirm(val) {
      var that = this;
      console.log(val);
      that.dateTime = val;
      that.pickerPopupShow = false;
    },
    setinfo() {
      if (!this.$store.state.register.nickname) {
        this.$toast.fail("请填写昵称");
        return;
      }
      if (!this.$store.state.register.birthday) {
        this.$toast.fail("请选择生日");
        return;
      }
      if (!this.$store.state.register.sex) {
        this.$toast.fail("请选择性别");
        return;
      }
      if (this.$store.state.register.nickname.length > 6) {
        this.$toast.fail("昵称不能超过6字");
        return;
      }
      this.$router.push('/register/5')
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
}
</style>
