<template>
  <div class="container">
    <navBar />
    <div class="main">
      <p>
        <span>温馨提示：</span>为了您的账户资金安全，银行卡绑定仅限实名认证本人的银行账号。
      </p>
      <van-cell-group>
        <van-field v-model="form.accountname" required clearable label="账户名" placeholder="请输入姓名" />
        <van-field
          v-model="form.bankname"
          required
          label="开户银行"
          placeholder="请输入开户银行"
          readonly
          @click="getBankList"
        />
        <van-field
          v-model="form.cardaddress"
          required
          clearable
          label="银行所在地"
          placeholder="请输入开户银行所在地"
        />
        <van-field
          v-model="form.cardno"
          required
          clearable
          label="银行卡号"
          placeholder="请输入银行卡号"
          type="number"
        />
      </van-cell-group>
    </div>
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="bankList"
        value-key="bankname"
        @cancel="showPopup = false"
        :loading="loading"
        @confirm="OnConfirm"
      />
    </van-popup>
    <div class="bottom-btn" @click="submit">添加银行卡</div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "addBankCard",
  components: {
    navBar
  },
  data() {
    return {
      showPopup: false,
      bankList: [],
      loading: true,
      form: {
        accountname: "",
        bankId: null,
        bankname: "",
        cardaddress: "",
        cardno: null
      }
    };
  },
  methods: {
    getBankList() {
      this.showPopup = true;
      this.$SERVER.getBankList().then(res => {
        this.loading = false;
        this.bankList = res.data;
      });
    },
    OnConfirm(val) {
      this.form.bankname = val.bankname;
      this.form.bankId = val.bankid;
      this.showPopup = false;
    },
    submit() {
      if (this.form.accountname.length == 0) {
        this.$toast.fail("请填写姓名");
        return;
      }
      if (!this.form.bankId) {
        this.$toast.fail("请选择开户行");
        return;
      }
      if (this.form.cardaddress.length == 0) {
        this.$toast.fail("请填写开户银行所在地");
        return;
      }
      if (!this.form.cardno) {
        this.$toast.fail("银行卡号");
        return;
      }
      if (!/^([1-9]{1})(\d{14}|\d{18})$/.test(this.form.cardno)) {
        this.$toast.fail("银行卡号不正确");
        return;
      }
      this.$SERVER
        .addCardBank({
          ...this.form,
          ...{
            userId: this.$store.state.userInfo.userid
          }
        })
        .then(res => {
          this.$toast.success("添加成功！");          
          this.$router.go(-1)
        });
    }
  }
};
</script>

<style lang="less" scoped>
p {
    padding: 15px;
  font-size: 12px;
  font-weight: 500;
  color: #999;
  line-height: 19px;
  span {
    color: #fdbf25;
  }
}
</style>