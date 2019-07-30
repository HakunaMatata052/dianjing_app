<template>
  <div class="container" id="orderlist">
    <navBar title>
      <van-tabs
        class="title-tabs"
        v-model="activeType"
        :color="$store.state.color"
        :title-active-color="$store.state.color"
        animated
        @click="getList(true)"
        slot="title"
      >
        <van-tab title="我的订单" :name="1"></van-tab>
        <van-tab title="我的接单" :name="2"></van-tab>
      </van-tabs>
    </navBar>
    <div class="main">
      <van-tabs
        v-model="activeState"
        :color="$store.state.color"
        :title-active-color="$store.state.color"
        animated
        @click="getList(true)"
        :swipe-threshold="5"
      >
        <van-tab title="全部" :name="0"></van-tab>
        <van-tab title="未接单" :name="1"></van-tab>
        <van-tab title="进行中" :name="2"></van-tab>
        <van-tab title="已完成" :name="3"></van-tab>
        <van-tab title="已取消" :name="4"></van-tab>
      </van-tabs>

      <van-pull-refresh v-model="refreshLoading" @refresh="getList(true)">
        <van-list
          v-model="listLoading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getList"
        >
          <orderItem :list="list" :type="activeType" :state="activeState" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import orderItem from "@/components/order/orderItem.vue";
export default {
  name: "orderList",
  components: {
    navBar,
    orderItem
  },
  data() {
    return {
      activeType: 0,
      activeState: 0,
      top: "",
      searchShow: false,
      value: "",
      list: [],
      refreshLoading: false,
      listLoading: false,
      finished: false,
      pageSize: 20,
      pageNum: 1,
      hasNextPage: true
    };
  },
  created() {},
  methods: {
    getList(isClear) {
      var that = this;
      if (isClear) {
        that.pageNum = 1;
        that.hasNextPage = true;
      }
      if (!that.hasNextPage) {
        that.refreshLoading = false;
        that.listLoading = false;
        this.finished = true;
        return;
      }
      that.$SERVER
        .getOrders({
          userid: that.$store.state.userInfo.userid,
          pageSize: that.pageSize,
          pageNum: that.pageNum,
          status: that.activeState,
          type: that.activeType
        })
        .then(res => {
            that.pageNum = res.data.nextPage;
            that.hasNextPage = res.data.hasNextPage;
            that.finished = !res.data.hasNextPage
          if (isClear) {
            that.list = res.data.list;
            that.refreshLoading = false;
          } else {
            that.list = [...that.list, ...res.data.list];
            that.listLoading = false;
          }
        });
    }
  }
};
</script>
<style lang="less">
</style>
