<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item.id" :title="item.title" />
      </van-list>
    </van-pull-refresh>
    <p @click="$router.push('/about')">点我</p>
  </div>
</template>

<script>
import { timeSwitchString } from "@/common/js/mixin.js";
export default {
  data() {
    return {
      list: [],
      pageSize: 20,
      pageNum: 1,
      loading: false,
      finished: false,
      isLoading: false,
    };
  },
  components: {
  },
  created() {
    // 接口调用
  },
  mounted() {
    // console.log(timeSwitchString(1562561357000));
  },
  methods: {
    getList(isClear) {
      var that = this;
      that.$SERVER
        .getData2({ pagesize: that.pageSize, pagenum: that.pageNum })
        .then(res => {
          console.log(res);
          if (isClear) {
            that.list = res.expressList.list;
            that.$toast("刷新成功");
            that.isLoading = false;
          } else {
            for (let i = 0; i < res.expressList.list.length; i++) {
              that.list.push(res.expressList.list[i]);
            }
            that.loading = false;
            if (!res.expressList.hasNextPage) {
              that.finished = true;
            }
          }
          that.pageNum = res.expressList.nextPage;
        });
    },
    onLoad() {
      this.getList();
    },
    onRefresh() {
      this.pageNum = 1;
      this.getList(true);
    }
  }
};
</script>

<style>
</style>
