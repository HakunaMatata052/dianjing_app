<template>
  <div class="box">
    <van-tabs
      v-model="activeTab"
      :color="$store.state.color"
      :title-active-color="$store.state.color"
      animated
      @click="tabs"
    >
      <van-tab title="速配" :name="0"></van-tab>
      <van-tab title="大神" :name="1"></van-tab>
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
  props: {
    activeTabs: {
      type: Number,
      default() {
        return 0;
      },
      required: true
    }
  },
  components: {},
  data() {
    return {
      list: [],
      activeTab: this.activeTabs
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      this.list = JSON.parse(this.$METHOD.getStore("games"));
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical",
          freeScroll: true
        });
      });
    },
    tabs() {
      this.$emit("tabs", this.activeTab);
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
    margin-right: 10px;
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
      font-size: 11px;
    }
  }
}
</style>
