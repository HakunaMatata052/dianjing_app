<template>
  <div>
    <div class="navbar" id="navbar">
      <div class="top" :style="'padding-top:'+ top +'px'"></div>
      <van-nav-bar @click-left="onClickLeft()" @click-right="openSearchFn()" :z-index="999">
        <span slot="title" v-if="title">{{title}}</span>
        <span slot="title" v-else>{{$route.meta.title}}</span>
        <van-icon name="arrow-left" slot="left"  v-if="goback" />
        <svg-icon icon-class="filter" slot="left"  v-if="filter && !goback" />
        <svg-icon icon-class="search" slot="right" v-if="search" />
      </van-nav-bar>
    </div>
    <div class="navbar-empty" :style="'padding-top:'+ top +'px'"></div>
    <van-popup v-model="searchShow" position="top" get-container="body">
      <div class="navbar-empty" v-if="searchEmptyShow"></div>
      <van-search placeholder="请输入搜索关键词" v-model="value" @blur="searchFn"/>
    </van-popup>
  </div>
</template>
<script>
export default {
  name:"navbar",
  data() {
    return {
      top: "",
      searchShow: false,
      value: "",
      searchEmptyShow: false,
    };
  },
  props: ["title","goback" ,"search", "filter"],
  components: {},
  mounted() {
    var systemType = api.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
      this.searchEmptyShow = true
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    openSearchFn() {
      this.searchShow = true;
    },
    searchFn(){
      console.log('搜索')
    }
  }
};
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
}
span {
  font-weight: bold;
}
.navbar-empty {
  height: 46px;
}
</style>


