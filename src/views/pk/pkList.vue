<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-pull-refresh
        v-model="refreshLoading"
        @refresh="getList(true)"
        :disabled="disabledPullRefresh"
      >
        <gameList @tabs="tabsFn" :activeTabs="activeTabs" :tab="false"/>
        <div class="box">
          <van-dropdown-menu class="filter">
            <van-dropdown-item
              v-model="filterActive"
              :options="sortOption"
              @open="dropdownOpenFn"
              @close="dropdownCloseFn"
            />
            <van-dropdown-item
              title="筛选"
              ref="item"
              @open="dropdownOpenFn"
              @close="dropdownCloseFn"
            >
              <van-switch-cell v-model="filter.switch1" title="包邮" />
              <van-switch-cell v-model="filter.switch2" title="团购" />
              <van-button block type="info" @click="onFilter">确认</van-button>
            </van-dropdown-item>
          </van-dropdown-menu>
          <van-list
            v-model="listLoading"
            :finished="finished"
            finished-text="没有更多了"
            @load="getList"
          >
          <div class="pk-list">
            <pkItem
              v-for="(item,index) in pkList"
              :key="index"
              :id="item.id"
              :image="item.image"
              :nickName="item.nickName"
              :count="item.count"
              :successCount="item.successCount"
              :userId="item.userId"
              :startTime="item.startTime"
              :endTime="item.endTime"
              :amount="item.amount"
              :gameName="item.gameName"
            /></div>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import gameList from "@/components/gameList.vue";
import pkItem from "@/components/pk/pkItem.vue";
export default {
  name: "pkList",
  components: {
    navBar,
    gameList,
    pkItem
  },
  data() {
    return {
      activeTabs: 0,
      pageNum: 1,
      pageSize: 10,
      hasNextPage: true,
      pkList: [],
      disabledPullRefresh: false,
      filterActive: 0,
      sortOption: [
        { text: "智能排序", value: 0 },
        { text: "人气最高", value: 1 },
        { text: "距离最近", value: 2 }
      ],
      refreshLoading: false,
      listLoading: false,
      finished: false,
      filter: {
        switch1: true,
        switch2: true
      }
    };
  },
  methods: {
    getList(isClear) {
      if (isClear) {
        this.pageNum = 1;
        this.hasNextPage = true;
      }
      if (!this.hasNextPage) {
        this.refreshLoading = false;
        this.listLoading = false;
        this.finished = true;
        return;
      }
      this.$SERVER
        .getListBattles({
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.pageNum = res.data.nextPage;
          this.hasNextPage = res.data.hasNextPage;
          this.finished = !res.data.hasNextPage;
          if (isClear) {
            this.pkList = res.data.list;
            this.refreshLoading = false;
          } else {
            this.pkList = [...this.pkList, ...res.data.list];
            this.listLoading = false;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
  .pk-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .item {
        border:1px solid #eee;
    }
  }
</style>