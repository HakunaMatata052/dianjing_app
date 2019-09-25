<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="box2">
        <div class="box2-top" @click="showPopup = true">
          <h3>储蓄卡</h3>
          <div class="bank-info">
            <img :src="form.bgimg" />
            <div class="bankname">
              {{form.bankName}}
              <span>（尾号{{form.bankCardEnd}}）</span>
              <p>24小时内到账</p>
            </div>
          </div>
        </div>
        <div class="con">
          <h4>提现金币数量</h4>
          <div class="field">
            <input v-model.number="form.amount" placeholder="请输入要提现的金币数量" type="number" 
            pattern="[0-9]*"/>
            <span>=</span>
            <input type="text" :value="amount" class="amount" disabled/>元
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
            v-if="withdrawInfo.statue == 0 "
            class="submit"
          >确认提现</van-button>
          <van-button
            type="info"
            size="large"
            :loading="loading"
            class="nosubmit"
            v-else-if="withdrawInfo.statue == 1"
          >您有一笔款正在提现</van-button>
        </div>
      </div>
      <van-list v-model="listLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <table border="0" class="table">
          <tr>
            <th>申请提现时间</th>
            <th width="28%">提现金额</th>
            <th width="28%">提现进度</th>
          </tr>
          <tr v-for="(item,index) in withdrawList" :key="index">
            <td>{{$METHOD.format(item.currenttime,'yyyy/MM/dd')}}</td>
            <td>{{item.amount}}</td>
            <td v-if="item.status == 0">审核中</td>
            <td v-else-if="item.status == 1">通过</td>
            <td v-else-if="item.status == 2">拒绝</td>
          </tr>
        </table>
      </van-list>
    </div>
    <van-popup v-model="showPopup" class="popup">
      <bankCard
        :item="item"
        :setting="false"
        v-for="(item,index) in bankList"
        :key="index"
        @click.native="selectBankCard(index)"
      />
    </van-popup>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import bankCard from "@/components/user/bankCard.vue";
export default {
  name: "withdraw",
  components: {
    navBar,
    bankCard
  },
  computed: {
    amount() {
      return this.form.amount * Number(this.withdrawInfo.rate);
    }
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
      pageNum: 1,
      pageSize: 20,
      finished: false,
      listLoading: false,
      hasNextPage: true,
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
    this.getBankCardList();
  },
  mounted() {
    this.$toast.loading({
      duration: 0,
      mask: true,
      message: "加载中..."
    });
  },
  methods: {
    getBankCardList() {
      this.$SERVER
        .getBankCardList({
          userId: this.$store.state.userInfo.userid
        })
        .then(res => {
          this.bankList = res.data;
          this.form.bankName = res.data[0].bankName;
          this.form.bankCardEnd = res.data[0].bankCardEnd;
          this.form.bankCardId = res.data[0].bankCardId;
          this.form.bgimg = res.data[0].bgimg;
        });
    },
    submit() {
      if (this.form.amount <= 0) {
        this.$toast.fail("请填写正确的提现金额！");
        return;
      }
      if (this.form.amount > this.withdrawInfo.balance) {
        this.$toast.fail("没有足够的余额！");
        return;
      }
      this.loading = true;
      this.$SERVER
        .withdraw({
          ...this.form,
          ...{
            userId: this.$store.state.userInfo.userid
          }
        })
        .then(res => {
          this.$toast.success(res.data);
          this.$router.go(-1);
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    onLoad() {
      this.$SERVER
        .withdrawList({
          userId: this.$store.state.userInfo.userid,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.pageNum = res.data.nextPage;
          this.hasNextPage = res.data.hasNextPage;
          this.finished = !res.data.hasNextPage;
          this.listLoading = false;
          this.withdrawList = res.data.list;
        });
    },
    selectBankCard(index) {
      this.form.bankName = this.bankList[index].bankName;
      this.form.bankCardEnd = this.bankList[index].bankCardEnd;
      this.form.bankCardId = this.bankList[index].bankCardId;
      this.form.bgimg = this.bankList[index].bgimg;
      this.showPopup = false;
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
    .bank-info {
      flex-grow: 1;
      display: flex;
      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        margin-right: 10px;
        line-height: 25px;
      }
      .bankname {
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        span,
        p {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
      }
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
      }
      input {
        width: 130px;
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