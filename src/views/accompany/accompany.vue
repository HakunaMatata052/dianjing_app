<template>
  <div id="accompany">
    <navBar :search="true"/>
    <div class="main">
    <van-pull-refresh v-model="isLoading" @refresh="getList" :disabled="disabledPullRefresh">
      <gameList />
      <div class="box accompany">
        <van-dropdown-menu>
          <van-dropdown-item v-model="filterActive" :options="sortOption"  @open="dropdownOpenFn" @close="dropdownCloseFn" />
          <van-dropdown-item title="筛选" ref="item"  @open="dropdownOpenFn" @close="dropdownCloseFn">
            <van-switch-cell v-model="switch1" title="包邮" />
            <van-switch-cell v-model="switch2" title="团购" />
            <van-button block type="info" @click="onConfirm">确认</van-button>
          </van-dropdown-item>
        </van-dropdown-menu>
        <accompanyList :accompanyList="AccompanyList" />
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
      AccompanyList: [],
      disabledPullRefresh: false,
      filterActive: 0,
      sortOption:  [
        { text: '智能排序', value: 0 },
        { text: '人气最高', value: 1 },
        { text: '距离最近', value: 2 }
      ],
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
    dropdownOpenFn(){
      this.disabledPullRefresh = true
    },
    dropdownCloseFn(){
      this.disabledPullRefresh = false
    }
  }
};
</script>
<style lang="less">
</style>

<style lang="less" scoped>
.accompany {
  background-image: url(/img/mzdj_room_user_ds.png);
  background-repeat: no-repeat;
  background-position: left 10px;
  background-size: 20px;
}
</style>

