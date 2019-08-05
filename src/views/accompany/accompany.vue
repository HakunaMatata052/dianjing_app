<template>
  <div class="container" id="accompany">
    <navBar :search="true" />
    <div class="main">
      <van-pull-refresh
        v-model="refreshLoading"
        @refresh="getList(true)"
        :disabled="disabledPullRefresh"
      >
        <gameList @tabs="tabsFn" :activeTabs="activeTabs" />
        <div class="box accompany">
          <van-dropdown-menu>
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
            <accompanyList :accompanyList="AccompanyList" />
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import gameList from "@/components/gameList.vue";
import accompanyList from "@/components/accompany/accompanyList.vue";
export default {
  name: "accompany",
  components: {
    navBar,
    gameList,
    accompanyList
  },
  data() {
    return {
      activeTabs: 0,
      pageNum: 1,
      pageSize: 3,
      hasNextPage: true,
      AccompanyList: [],
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
  watch: {
    activeTabs() {
      this.getList(true);
    }
  },
  created() {
    // this.getList();
  },
  methods: {
    getList(isClear) {
       if (isClear) {
        this.pageNum = 1;
        this.hasNextPage = true
      }
      if (!this.hasNextPage) {
        this.refreshLoading = false;
        this.listLoading = false;
        this.finished = true;
        return;
      }
      this.$SERVER
        .getUserList({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          userType: this.activeTabs,
        ...this.$store.state.position
        })
        .then(res => {
            this.pageNum = res.data.nextPage
            this.hasNextPage = res.data.hasNextPage
            this.finished = !res.data.hasNextPage
          if (isClear) {
            this.AccompanyList = res.data.list;
            this.refreshLoading = false;
          } else {
            this.AccompanyList = [...this.AccompanyList, ...res.data.list];
            this.listLoading = false;
          }
        });
    },
    dropdownOpenFn() {
      this.disabledPullRefresh = true;
    },
    dropdownCloseFn() {
      this.disabledPullRefresh = false;
    },
    onFilter() {},
    // 监听 速配/大神 切换
    tabsFn(val) {
      this.activeTabs = val;
    }
  }
};
</script>
<style lang="less">
</style>

<style lang="less" scoped>
.accompany {
  background-image: url(../../assets/images/mzdj_room_user_ds.png);
  background-repeat: no-repeat;
  background-position: left 10px;
  background-size: 20px;
}
</style>

