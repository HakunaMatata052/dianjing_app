<template>
  <div id="accompany">
    <navBar :search="true" :goback="true" />
    <van-pull-refresh v-model="isLoading" @refresh="getList">
      <gameList />
      <div class="box accompany">
        <van-tabs
          v-model="filterActive"
          background="none"
          :line-height="0"
          :title-active-color="$store.state.color"
          class="tabs"
          sticky
        >
          <van-tab title="智能排序" :name="1"></van-tab>
          <van-tab title="人气最高" :name="2"></van-tab>
          <van-tab title="距离最近" :name="3"></van-tab>
          <van-tab title="高级筛选" :name="4">
            <van-dropdown-menu
              slot="title"
              class="accompany-filter"
              :active-color="$store.state.color"
            >
              <van-dropdown-item title="高级筛选" ref="filter" :z-index="9999">
                <van-switch-cell v-model="switch1" title="包邮" />
                <van-switch-cell v-model="switch2" title="团购" />
                <van-button block type="info" @click="filterFn">确认</van-button>
              </van-dropdown-item>
            </van-dropdown-menu>
          </van-tab>
        </van-tabs>
        <accompanyList :accompanyList="AccompanyList" />
      </div>
    </van-pull-refresh>
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
      AccompanyList: [],
      filterActive: "",
      value2: "a",
      isLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$SERVER.getGameList().then(res => {
        this.AccompanyList = res;
        this.isLoading = false;
      });
    },
    filterFn(){
      this.$refs.filter.toggle()
    }
  }
};
</script>
<style lang="less">
.tabs {
  .van-tabs__wrap {
    overflow: auto;
  }
  margin-bottom: 20px;
}
.accompany-filter {
  height: 44px;
  .van-dropdown-menu__title {
    font-size: 14px;
  }
  .van-cell {
    text-align: left;
  }
}
</style>

<style lang="less" scoped>
.accompany {
  background-image: url(/img/mzdj_room_user_ds.png);
  background-repeat: no-repeat;
  background-position: left 10px;
  background-size: 20px;
}
</style>

