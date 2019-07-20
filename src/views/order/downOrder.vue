<template>
  <div class="order">
    <navBar />
    <div class="main">
      <div class="userinfo">
        <div class="avatar">
          <van-image fit="cover" width="100%" height="100%" src="https://picsum.photos/60/60" />
        </div>
        <div class="userinfo-right">
          <h3>
            仲喵_MG
            <img src="/img/authentication.png" />
            <span>ID:19901220</span>
          </h3>
          <p>首单返12元上车找主播加群</p>
        </div>
      </div>
      <van-cell-group class="cell-group">
        <van-cell title="类型" size="large" is-link :value="form.type" @click="showPopupFn(0)" />
        <van-cell title="时间" size="large" is-link :value="time(form.time)" @click="showPopupFn(1)" />
        <van-cell title="局数" size="large" :value="form.games+'局'" @click="showKeyboard=true" />
        <van-cell title="价格" size="large" :value="price+'元'" />
        <van-coupon-cell
        currency=""
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showCoupons = true"
          size="large"
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell size="large" :value="form.type" to="/">
          <template slot="default">
            <div class="btn">立即充值</div>
          </template>
          <template slot="title">
            <span>
              钱包支付
              <small>（余额 0金币）</small>
            </span>
          </template>
        </van-cell>
      </van-cell-group>
      <p class="tips">
        交易提示：
        <br />此交易仅为娱乐陪玩，不承诺包赢
      </p>
      <van-submit-bar button-text="确认支付" @submit="onSubmit">
        <template slot="default">
          <span class="price">{{price}}金币</span>
        </template>
      </van-submit-bar>
    </div>
    <!-- 选择器弹窗 -->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
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
        currency=""
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChangeCoupons"
        @exchange="onExchangeCoupons"
      />
    </van-popup>
    <!-- 数字键盘弹窗 -->
    <van-number-keyboard
      v-model="form.games"
      maxlength="3"
      :show="showKeyboard"
      close-button-text="完成"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '金币'
};
export default {
  name: "downOrder",
  components: {
    navBar
  },
  data() {
    return {
      activePopupId: 0,
      showPopup: false,
      showKeyboard: false,
      showCoupons: false,
      datetime: new Date(),
      price: 6,
      form: {
        type: "",
        typeid: "",
        time: "1563416695080",
        games: ""
      },
      columns: [
        {
          text: "王者荣耀",
          id: 1
        },
        {
          text: "吃鸡",
          id: 2
        }
      ],
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon]
    };
  },
  methods: {
    showPopupFn(id) {
      this.activePopupId = id;
      this.showPopup = true;
    },
    typeOnConfirm(val) {
      this.form.type = val.text;
      this.form.typeid = val.id;
      this.showPopup = false;
    },
    timeOnConfirm(val) {
      var time = val.getTime();
      this.form.time = time;
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
    onSubmit(){

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
</style>
