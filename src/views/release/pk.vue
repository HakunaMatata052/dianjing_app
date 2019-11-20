<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell title="类型" size="large" is-link :value="type" @click="showPopup = true" />
        <van-cell size="large" title="游戏ID（昵称）">
          <input type="text" class="input" v-model="form.gameNickname" placeholder="请输入游戏ID或昵称" />
        </van-cell>
        <van-cell size="large" title="挑战金">
          <input type="text" class="input" v-model="form.amount" placeholder="请输入挑战金" />
        </van-cell>
        <van-cell size="large" title="个人/团队">
          <van-radio-group v-model="form.isGroup" class="radio">
            <van-radio :name="0" :checked-color="$store.state.color">个人</van-radio>
            <van-radio :name="1" :checked-color="$store.state.color">团队</van-radio>
          </van-radio-group>
        </van-cell>

        <van-cell title="可接受挑战时间段" size="large" is-link :value="time" @click="showPopup2 = true" />
      </van-cell-group>
      <van-cell-group class="cell-group">
        <van-field
          v-model="form.remark"
          type="textarea"
          placeholder="备注：
为了挑战赛顺利进行及结果判定，备注信息请填写完整。备注包括：游戏终端、服务器、输赢判定规则等..."
          rows="3"
          autosize
        />
      </van-cell-group>
      <van-button type="primary" class="btn" :hairline="false" block @click="publishBattle">发布</van-button>
      <p>发布即同意《XXX用户协议》</p>
    </div>
    <!-- 选择器弹窗 -->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        value-key="name"
        @cancel="showPopup = false"
        @confirm="typeOnConfirm"
      />
    </van-popup>

    <van-popup v-model="showPopup2" position="bottom">
      <van-datetime-picker :title="title" v-model="currentTime" type="time" @confirm="selectTime" />
    </van-popup>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "pk",
  components: {
    navBar
  },
  computed: {
    time() {
      if (this.form.startTimeStr != "" && this.form.endTimeStr != "") {
        return `${this.form.startTimeStr}-${this.form.endTimeStr}`;
      }
    }
  },
  data() {
    return {
      type: "",
      form: {
        isGroup: 0,
        startTimeStr: "",
        endTimeStr: ""
      },
      showPopup: false,
      showPopup2: false,
      columns: [],
      title: "请输入起始时间",
      currentTime: "00:00",
      state: 1
    };
  },
  created() {
    this.columns = JSON.parse(this.$METHOD.getStore("games"));
  },
  methods: {
    typeOnConfirm(val) {
      console.log(val);
      this.form.gameid = val.gameid;
      this.type = val.name;
      this.showPopup = false;
    },
    selectTime(val) {
      if (this.state == 1) {
        this.state = 2;
        this.form.startTimeStr = val;
        this.title = "请输入结束时间";
        this.$toast("请输入结束时间");
      } else {
        this.state = 1;
        this.form.endTimeStr = val;
        this.showPopup2 = false;
        this.title = "请输入起始时间";
      }
    },
    publishBattle() {
      this.$SERVER
        .publishBattle({
          ...this.form,
          ...{ fromUserId: this.$store.state.userInfo.userid }
        })
        .then(res => {});
    }
  }
};
</script>
<style lang="less" scoped>
.cell-group {
  margin-top: 20px;
}
.radio {
  display: flex;
  justify-content: space-around;
}
.input {
  text-align: right;
}
.btn {
  width: 270px;
  height: 44px;
  line-height: 44px;
  background: rgba(255, 217, 72, 1);
  border-radius: 5px;
  font-size: 17px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  margin: 40px auto 20px;
  border: 0;
}
p {
  font-size: 13px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
  text-align: center;
}
</style>
