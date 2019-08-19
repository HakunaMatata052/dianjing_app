<template>
  <div class="container">
    <navBar stl="nobg" />
    <div class="main">
      <div class="top">
        <h1>{{balance}}</h1>
        <span>账户余额</span>
        <div class="btn-group">
          <div class="btn" @click="$router.push('/recharge')">
            <van-icon class-prefix="icon" name="chongzhi" class="icon" />充值
          </div>
          <div class="btn" @click="$router.push('/withdraw')">
            <van-icon class-prefix="icon" name="tixian" class="icon" />提现
          </div>
        </div>
      </div>
      <van-cell-group>
        <!-- <van-cell title="地址管理" icon="play" is-link to /> -->
        <van-cell title="收支明细" icon="play" is-link to />
        <van-cell title="银行卡绑定" icon="play" is-link to="/bankCardList" />
        <!-- <van-cell title="安全管理" icon="play" is-link to /> -->
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "wallet",
  components: {
    navBar
  },
  data() {
    return {
      balance: 0
    };
  },
  created() {
    this.$SERVER
      .getBalanceByUserId({
        userid: this.$store.state.userInfo.userid
      })
      .then(res => {
        this.balance = res.data.balance;
      });
  }
};
</script>
<style lang="less" scoped>
.top {
  padding: 60px 0 15px;
  background: linear-gradient(
    -35deg,
    rgba(253, 191, 37, 1),
    rgba(255, 217, 72, 1)
  );
  text-align: center;
  margin-bottom: 20px;
  h1 {
    font-size: 30px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 15px 0;
  }
  span {
    font-size: 14px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .btn-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 35px;
    .btn {
      width: 150px;
      height: 40px;
      background: rgba(255, 230, 135, 1);
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .icon {
      padding-right: 10px;
    }
  }
}
</style>
