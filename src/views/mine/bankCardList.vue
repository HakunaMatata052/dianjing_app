<template>
  <div class="container">
    <navBar />
    <div class="main">
      <div class="card-list">
        <div v-for="(item,index) in list" :key="index">
          <van-swipe-cell>
            <bankCard :item="item" @callback="getBankCardList()" />
            <template slot="right">
              <van-button
                type="danger"
                text="删除"
                class="del-btn"
                @click="delBankCard(item.bankCardId)"
              />
            </template>
          </van-swipe-cell>
        </div>
      </div>
    </div>
    <div class="bottom-btn" @click="$router.push('/addBankCard')">添加银行卡</div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import bankCard from "@/components/user/bankCard.vue";
export default {
  name: "wallet",
  components: {
    navBar,
    bankCard
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getBankCardList();
  },
  methods: {
    getBankCardList() {
      this.$SERVER
        .getBankCardList({
          userId: this.$store.state.userInfo.userid
        })
        .then(res => {
          this.list = res.data;
        });
    },
    delBankCard(bankCardId) {
      this.$dialog
        .confirm({
          title: "是否确认删除银行卡？"
        })
        .then(() => {
          this.$SERVER
            .delCardBank({
              bankCardId: bankCardId
            })
            .then(res => {
              this.$toast.success("删除成功！");
              this.getBankCardList();
            });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.card-list {
  padding: 10px;
  .del-btn {
    height: 100%;
  }
}
</style>
