<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell
          title="选择游戏"
          size="large"
          is-link
          :value="form.gamename"
          @click="showPopupFn()"
          title-class="duan-cell"
        />
        <van-field v-model="form.server" type="text" placeholder="输入服务器" class="cell" size="large" />
        <van-field v-model="form.area" type="text" placeholder="输入大区" class="cell" size="large" />
        <van-field v-model="form.grade" type="text" placeholder="输入段位" class="cell" size="large" />
        <van-field
          v-model.number="form.price"
          type="number"
          pattern="[0-9]*"
          placeholder="输入价格（金币）"
          class="cell"
          size="large"
        />
        <van-field
          v-model="form.remark"
          type="textarea"
          placeholder="备注"
          rows="3"
          autosize
          class="cell"
          size="large"
        />
        <van-cell class="submit-cell">
          <van-button class="submit" size="large" :hairline="false" @click="releaseFn">发布</van-button>
        </van-cell>
      </van-cell-group>
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
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "release-ability",
  components: {
    navBar
  },
  data() {
    return {
      showPopup: false,
      form: {
        gamename: null,
        gameid: null,
        server: "",
        area: "",
        price: null,
        remark: ""
      },
      columns: []
    };
  },
  created() {
    this.columns = JSON.parse(this.$METHOD.getStore("games"));
  },
  methods: {
    showPopupFn() {
      this.showPopup = true;
    },
    typeOnConfirm(val) {
      this.form.gamename = val.name;
      this.form.gameid = val.gameid;
      this.showPopup = false;
    },
    releaseFn() {
      if(!this.form.gameid){
        this.$toast.fail('请选择游戏！')
        return
      }
      if(this.form.server.length==0){
        this.$toast.fail('请输入游戏服务器！')
        return
      }
      if(this.form.area.length==0){
        this.$toast.fail('请输入游戏大区！')
        return
      }
      if(!this.form.price && this.form.price!=0){
        this.$toast.fail('请输入价格！')
        return
      }
      this.$SERVER
        .addUserAbility({
          ...this.form,
          ...{ userid: this.$store.state.userInfo.userid }
        })
        .then(res => {
          this.$toast.success('发布成功！')
          this.$router.push(`/accompanyDetail/${this.$store.state.userInfo.userid}`)
        });
    }
  }
};
</script>

<style lang="less" scoped>
.cell-group {
  background: none;
  .submit-cell {
    background: none;
    padding: 20px;
  }
  .cell {
    margin-top: 5px;
  }
  .tag-cell {
    flex-wrap: wrap;
  }
  .submit {
    background: #ffd948;
  }
  .friends-list {
    color: #ffd948;
    margin-right: 10px;
  }
}
</style>