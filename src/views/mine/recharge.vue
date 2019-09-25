<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="box2">
        <div class="con">
          <h4>充值金额</h4>
          <div class="field">
            <span>￥</span>
            <input v-model.number="form.amount" placeholder="请输入要提现的金币数量" type="number" 
            pattern="[0-9]*"/>
          </div>
          <div class="tips">
            1金币={{withdrawInfo.rate}}元
            <p>金币余额：{{withdrawInfo.balance}}个</p>
          </div>
          <van-button
            type="info"
            size="large"
            :loading="loading"
            @click="submit"
            class="submit"
          >确认提现</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import bankCard from "@/components/user/bankCard.vue";
export default {
  name: "recharge",
  components: {
    navBar,
    bankCard
  },
  data() {
    return {
      bankList: [],
      withdrawInfo: {},
      form: {
        bgimg: "",
        bankName: "",
        bankCardEnd: "",
        channel: 0,
        amount: null
      },
      withdrawList: [],
      loading: false,
      showPopup: false
    };
  },
  created() {
    this.$SERVER
      .withdrawInfo({
        userId: this.$store.state.userInfo.userid
      })
      .then(res => {
        this.withdrawInfo = { ...this.withdrawInfo, ...res.data };
      });
  },
  methods: {
    submit() {
      if (this.form.amount <= 0) {
        this.$toast.fail("请填写正确的提现金额！");
        return;
      }
      this.loading = true;
      this.$SERVER
        .wxprepayment({
          amount: this.form.amount,
          channel: 2,
          userId: this.$store.state.userInfo.userid
        })
        .then(res => {
          var that = this;
          if (window.navigator.userAgent.match(/APICloud/i)) {
            var wxPay = api.require("wxPay");
            wxPay.config(
              {
                apiKey: "wxc7c08b65a6d1df06",
                mchId: "1508221791",
                partnerKey: "TkVOr4zdDowHxqHPV2MPm0arHfQetRyT",
                notifyUrl: that.$store.state.wxcallback
              },
              function(ret, err) {
                if (ret.status) {
                  wxPay.pay(
                    {
                      description: "充值",
                      totalFee: that.form.amount * 100,
                      tradeNo: res.data,
                      deviceInfo: api.deviceId,
                      feeType: "CNY",
                      attach: "WXPREPAYMENT" + res.data
                    },
                    function(payret, payerr) {
                      if (payret.status) {
                        that.$toast.success("支付成功！");
                        that.$router.go(-1);
                        that.loading = false;
                      } else {
                        that.$toast.fail(
                          "支付失败!！" + payerr.code + payerr.msg
                        );
                        that.loading = false;
                      }
                    }
                  );
                } else {
                  this.$toast.fail("支付失败！" + err.code);
                  this.loading = false;
                }
              }
            );
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 30px 15px;
}
.box2 {
  border-radius: 5px;
  overflow: hidden;
  .box2-top {
    background: #ffd948;
    padding: 25px;
    display: flex;
    h3 {
      font-size: 17px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin-right: 30px;
    }
  }
  .con {
    padding: 30px;
    background: #fff;
    h4 {
      font-size: 15px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 40px;
    }
    .field {
      font-size: 13px;
      font-weight: 400;
      color: rgba(179, 179, 179, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: rgba(51, 51, 51, 1);
        font-size: 45px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      input {
        flex-grow: 1;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid rgba(230, 230, 230, 1);
      }
      .amount {
        width: 90px;
      }
    }
  }
  .tips {
    margin: 25px 0;
    font-size: 15px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    p {
      font-size: 15px;
      font-weight: 500;
      color: rgba(255, 217, 72, 1);
    }
  }
}
.submit {
  background: #ffd948;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #333;
  border: 0;
}
.nosubmit {
  background: rgba(230, 230, 230, 1);
  font-size: 15px;
  font-weight: 500;
  color: rgba(165, 165, 165, 1);
  border: 0;
}
.table {
  width: 100%;
  margin-top: 45px;
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
  th {
    background: rgba(255, 217, 72, 1);
    height: 42px;
    line-height: 42px;
  }
  td {
    background: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
}
.popup {
  width: 80%;
  height: 80%;
  padding: 15px;
  border-radius: 5px;
  overflow: scroll;
}
</style>