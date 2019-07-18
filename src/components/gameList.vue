<template>
  <div class="box">
    <van-tabs :color="$store.state.color" :title-active-color="$store.state.color" animated>
      <van-tab title="速配"></van-tab>
      <van-tab title="大神"></van-tab>
    </van-tabs>
    <div class="wrapper" ref="wrapper">
      <div class="gamelist">
        <div class="gamelist-item" v-for="(image, index) in list" :key="index">
          <img :src="image.icon" />
          <span>{{image.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  components: {},
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      this.$SERVER.getGames({
        pageNum:1,
        pageSize:20
      }).then(res => {
        this.list = res.data.list;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollX: true,
            scrollY: false,
            eventPassthrough: "vertical",
            freeScroll: true
          });
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  overflow: hidden;
}
.gamelist {
  width: fit-content;
  display: flex;
  padding: 10px 0;
  .gamelist-item {
    margin-right: 15px;
    img {
      border-radius: 5px;
      width: 80px;
      height: 80px;
    }
    span {
      width: 80px;
      display: block;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
    }
  }
}
</style>
