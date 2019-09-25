<template>
  <div class="container" id="order">
    <navBar />
    <div class="main">
      <div class="userinfo">
        <div class="avatar">
          <van-image fit="cover" width="100%" height="100%" :src="userInfo.image" />
        </div>
        <div class="userinfo-right">
          <h3>
            {{userInfo.nickname}}
            <div class="authentication" v-if="userInfo.level"></div>
            <span>ID:{{userInfo.userid}}</span>
          </h3>
          <p>{{userInfo.signname}}</p>
        </div>
      </div>
      <van-cell-group class="cell-group">
        <van-cell title="类型" size="large" is-link :value="form.type" @click="showPopupFn(0)" title-class="duan-cell"/>
        <van-cell
          title="时间"
          size="large"
          is-link
          :value="$METHOD.format(form.publishDate,'MM月dd日 hh:mm')"
          @click="showPopupFn(1)"
        />
        <van-cell title="局数" size="large">
          <van-stepper v-model="form.playCount" integer min="1" max="30" />
        </van-cell>
        <van-cell title="价格" size="large" :value="price+'金币'" />
        <van-coupon-cell
          currency
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showCoupons = true"
          size="large"
        />
        <van-field
          v-model="form.remark"
          label="备注"
          type="textarea"
          placeholder="请输入备注"
          rows="1"
          autosize
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell size="large" :value="form.type" to="/" class="balance" value-class="duan-cell">
          <template slot="default">
            <div class="btn" @click="$router.push('/recharge')">立即充值</div>
          </template>
          <template slot="title">
            <span>
              钱包支付
              <small>（余额 {{balance}}金币）</small>
            </span>
          </template>
        </van-cell>
      </van-cell-group>
      <p class="tips">
        交易提示：
        <br />此交易仅为娱乐陪玩，不承诺包赢
      </p>
    </div>

    <van-submit-bar button-text="确认支付" @submit="onSubmit" :loading="loading">
      <template slot="default">
        <span class="price">{{price}}金币</span>
      </template>
    </van-submit-bar>
    <!-- 选择器弹窗 -->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPopup = false"
        @confirm="typeOnConfirm"
        v-if="activePopupId==0"
      />
      <van-datetime-picker
        v-model="datetime"
        :min-date="new Date()"
        v-if="activePopupId==1"
        @confirm="timeOnConfirm"
      />
    </van-popup>
    <!-- 优惠券弹窗 -->
    <van-popup v-model="showCoupons" position="bottom">
      <van-coupon-list
        currency
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChangeCoupons"
        @exchange="onExchangeCoupons"
      />
    </van-popup>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "金币"
};
export default {
  name: "downOrder",
  components: {
    navBar
  },
  computed: {
    dateTime: {
      get() {
        return new Date(this.form.publishDate);
      },
      set(val) {
        this.form.publishDate = val;
      }
    }
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        this.loading = true;
        this.$SERVER.getTotalMoney(newValue).then(res => {
          this.loading = false;
          this.price = res.data;
        });
      },
      deep: true
    }
  },
  data() {
    return {
      activePopupId: 0,
      showPopup: false,
      showCoupons: false,
      datetime: new Date(),
      price: 0,
      balance: 0,
      userInfo: {},
      form: {
        type: "请选择",
        abilityId: "",
        publishDate: new Date().getTime(),
        playCount: 0,
        remark: ""
      },
      columns: [
        {
          text: "请选择",
          id: 0,
          disabled: true
        }
      ],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      loading: false
    };
  },
  created() {
    // 获取用户信息
    this.$SERVER
      .getUserInforById({
        userid: this.$route.params.userid
      })
      .then(res => {
        this.userInfo = res.data;
      });
    // 获取服务列表
    this.$SERVER
      .userAbilityList({
        userid: this.$route.params.userid,
        pageNum: 1,
        pageSize: 9999
      })
      .then(res => {
        let columns = [];
        res.data.list.forEach(val => {
          if (this.$route.params.id == val.abilityId) {
            this.form.abilityId = this.$route.params.id;
            this.form.type = val.name + "-" + val.server + "-" + val.area;
          }
          columns.push({
            text: val.name + "-" + val.server + "-" + val.area,
            id: val.abilityId
          });
        });
        this.columns = [...this.columns, ...columns];
      });
    // 查询余额
    this.$SERVER
      .getBalanceByUserId({
        userid: this.$store.state.userInfo.userid
      })
      .then(res => {
        this.balance = res.data.balance;
      });
  },
  methods: {
    showPopupFn(id) {
      this.activePopupId = id;
      this.showPopup = true;
    },
    typeOnConfirm(val) {
      this.form.abilityId = val.id;
      this.form.type = val.text;
      this.showPopup = false;
    },
    timeOnConfirm(val) {
      var time = val.getTime();
      this.form.publishDate = time;
      this.showPopup = false;
    },
    time(val) {
      return this.$METHOD.format(val, "MM月dd日 hh:mm");
    },
    onChangeCoupons(index) {
      this.showCoupons = false;
      this.chosenCoupon = index;
    },
    onExchangeCoupons(code) {
      this.coupons.push(coupon);
    },
    onSubmit() {
      if (!this.form.abilityId || this.form.abilityId.length == 0) {
        this.$toast.fail("请选择游戏品类");
        return;
      }
      if (!this.form.publishDate || this.form.publishDate.length == 0) {
        this.$toast.fail("请选择开始时间");
        return;
      }
      if (!this.form.playCount || this.form.playCount.length == 0) {
        this.$toast.fail("请选择游戏局数");
        return;
      }
      if (this.price > this.balance) {
        this.$toast.fail("余额不足，请先充值！");
        return;
      }
      this.$SERVER
        .bookOrder({
          userid: this.$store.state.userInfo.userid,
          ...this.form
        })
        .then(res => {
          this.$toast.success(res.data);
          this.$router.push("/orderlist");
        });
    }
  }
};
</script>
<style lang="less" scoped>
.userinfo {
  padding: 15px;
  display: flex;
  align-items: center;
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50px;
    overflow: hidden;
    margin-right: 10px;
    flex-shrink: 0;
  }
  h3 {
    font-size: 18px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    img {
      width: 12px;
      height: 13px;
    }
    span {
      font-size: 10px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  p {
    font-size: 12px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    padding: 5px 0;
  }
}
.btn {
  border-radius: 30px;
  height: 100%;
  padding: 0 10px;
  background: #ffc21c;
  display: inline-block;
  color: #333;
}
small {
  color: rgba(153, 153, 153, 1);
  font-size: 14px;
}
.cell-group {
  margin-bottom: 10px;
}
.tips {
  font-size: 13px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
  padding: 15px;
  margin-bottom: 1rem;
}
.price {
  font-size: 17px;
  font-weight: bold;
  color: rgba(255, 78, 77, 1);
  line-height: 35px;
  flex-grow: 1;
  padding: 0 15px;
}
.balance {
  justify-content: space-between;
}
.duan-cell {
  flex: inherit;
}
</style>
