<template>
  <div id="register">
    <navBar />
    <div class="register">
      <div class="main">
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="form.telephone"
            clearable
            placeholder="请输入手机号"
            class="field"
            type="tel"
            :border="false"
            :readonly="readonly"
          ></van-field>
          <van-cell-group>
            <van-field
              v-model="form.checknum"
              center
              clearable
              class="field"
              placeholder="请输入短信验证码"
            >
              <van-button
                slot="button"
                size="small"
                type="primary"
                class="checknumbtn"
                @click="sendchecknum"
                :disabled="checkNumDisabled"
                :hairline="false"
              >
                <span v-if="checkNumDisabled">{{countDown}}秒后重试</span>
                <span v-else>发送验证码</span>
              </van-button>
            </van-field>
          </van-cell-group>
          <van-field
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            class="field"
          ></van-field>
          <van-field
            v-model="form.password2"
            type="password"
            placeholder="请再次输入密码"
            class="field"
          ></van-field>
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="regLoading"
          loading-type="spinner"
          @click="regFn"
          class="regbtn"
          :hairline="false"
        >确认修改</van-button>
        <p>
        </p>
        <div class="gologin">
          已有账号？
          <span @click="$router.push('/login')">立即登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import regexUtil from "regex-util";
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "resetPassword",
  components: {
    navBar
  },
  data() {
    return {
      regLoading: false,
      checkNumDisabled: false,
      readonly: false,
      form: {
        telephone: "",
        password: "",
        checknum: ""
      },
      countDown: 60,
      checked: true,
      timer: null
    };
  },
  created(){
      if(this.$METHOD.getStore('token')){
          this.form.telephone = this.$store.state.userInfo.telephone
          this.readonly = true
      }
  },
  methods: {
    sendchecknum() {
      if (this.form.telephone.length > 0) {
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
            telephone: this.form.telephone
          })
          .then(res => {
            this.$toast.success("验证码发送成功！");
          })
          .catch(res => {
            this.checkNumDisabled = false;
            clearInterval(this.timer);
            this.timer = null;
          });
      } else {
        this.$toast.fail("请输入手机号码");
      }
    },
    regFn() {
      if (!regexUtil.isPhone(this.form.telephone)) {
        this.$toast.fail("请输入正确的手机号码");
        return;
      }
      if (this.form.checknum == "") {
        this.$toast.fail("请输入验证码");
        return;
      }

      if (!regexUtil.isPassword(this.form.password)) {
        this.$toast.fail("请输入6-11位字母数字组合密码");
        return;
      }
      if (!this.checked) {
        this.$toast.fail("请阅读并同意《用户注册协议》");
        return;
      }
      if(this.form.password!==this.form.password2){
        this.$toast.fail("两次密码不一致");
        return;
      }
      this.regLoading = true;
      this.$SERVER
        .resetPassword(this.form)
        .then(res => {
          this.$toast.success(res.data);
          this.regLoading = false;
          this.$router.push("/login");
        })
        .catch(res => {
          this.regLoading = false;
        });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="less" scoped>
#register {
  width: 100%;
    height: 100%;
  background-color: #fff;
  .register {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  .main {
    width: 90%;
  }
  .field {
  }
  .checknumbtn {
    background: rgba(254, 196, 58, 1);
    border: 0;
  }
  .regbtn {
    background: rgba(254, 196, 58, 1);
    border-radius: 100px;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    border: 0;
  }
  p {
    margin-top: 30px;
    color: #fff;
    font-size: 14px;
    span {
      color: rgba(254, 196, 58, 1);
      margin-left: 5px;
    }
  }
  .gologin {
    text-align: center;
    margin-top: 50px;
    color: #999;
    span {
      text-decoration: underline;
    }
  }
}
</style>
