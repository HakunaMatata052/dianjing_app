<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item,index in list" :key="index">
            <div class="cell">
            <div class="title">
                {{item.giftName}}<span>X{{item.giftNum}}</span>
            </div>
            <div class="time">
                {{$METHOD.format(item.creatTime,'MM/dd hh:mm')}}
            </div></div>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "mygift",
  components: {
    navBar
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 20,
      hasNextPage: true
    };
  },
  methods: {
    onLoad() {
      this.$SERVER
        .getUserGiftList({
          getUserId: this.$store.state.userInfo.userid,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.pageNum = res.data.nextPage;
          this.hasNextPage = res.data.hasNextPage;
          this.finished = !res.data.hasNextPage;
          this.loading = false
          this.list = res.data.list
        });
    }
  }
};
</script>
<style lang="less" scoped>
.cell {
    display: flex;
    justify-content: space-between;
    .title {
        span{
            margin-left: 10px;
            color: #FFD948;
        }
    }
    .time {
        color: #999999;
    }
}
</style>