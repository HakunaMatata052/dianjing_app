<template>
  <div id="login">
    <navBar :stl="'nobg'" />
    <div class="login">
      <div class="main">
        <h1>电竞</h1>
        <van-cell-group class="cell-group" :border="false">
          <van-field
            v-model="form.telephone"
            clearable
            placeholder="请输入手机号"
            class="field"
            :border="false"
          >
            <template slot="left-icon">
              <van-icon class-prefix="icon" name="user" color="#fff" />
            </template>
          </van-field>
          <van-field
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            class="field"
            :border="false"
          >
            <template slot="left-icon">
              <van-icon class-prefix="icon" name="pwd" color="#fff" />
            </template>
          </van-field>
        </van-cell-group>
        <van-button
          type="primary"
          size="large"
          :loading="loginLoading"
          loading-type="spinner"
          @click="loginFn"
          class="loginbtn"
          :hairline="false"
        >立即登录</van-button>
        <p>
          <span>忘记密码</span>
          <span @click="$router.push('/register')">用户注册</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "login",
  components: {
    navBar
  },
  data() {
    return {
      form: {
        telephone: "",
        password: ""
      },
      loginLoading: false
    };
  },
  methods: {
    loginFn() {
      this.loginLoading = true;
      this.$SERVER.login(this.form).then((res) => {
        this.$toast.success("登录成功");
        this.$METHOD.setStore('token',res.token)
        this.$METHOD.setStore('userInfo',res.userinfo)
        this.$store.state.token = res.token
        this.$store.state.userInfo = res.userinfo
        this.loginLoading = false;
        this.$router.push('/')
      }).catch(res=>{
        this.loginLoading = false;
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
#login {
  width: 100%;
  height: 100%;
  background: url(/img/loginbg.png) no-repeat center center;
  background-size: cover;
  .login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main {
    width: 80%;
  }
  h1 {
    font-size: 25px;
    font-weight: 800;
    color: rgba(254, 196, 58, 1);
    margin-bottom: 20%;
    text-align: center;
  }
  .cell-group,
  .field {
    background: none;
    border: 0;
  }
  .field {
    margin-bottom: 30px;
    border: 1px solid #fff;
    border-radius: 50px;
  }
  .loginbtn {
    background: rgba(254, 196, 58, 1);
    border-radius: 100px;
    margin-top: 30px;
    font-size: 17px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    border: 0;
  }
  p {
    display: flex;
    margin-top: 30px;
    color: #fff;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 400;
    color: rgba(232, 232, 232, 1);
  }
}
</style>
