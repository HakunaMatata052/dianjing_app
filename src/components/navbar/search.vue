<template>
  <van-popup v-model="searchShow" position="top" get-container="body">
    <div class="navbar-empty" v-if="searchEmptyShow"></div>
    <van-search placeholder="请输入搜索关键词" v-model="value" @blur="searchFn" />
  </van-popup>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      searchShow: false,
      searchEmptyShow: false
    };
  },
  methods: {
    searchFn() {
      console.log("搜索");
    }
  }
};
</script>
<style lang="less" scoped>
</style>

