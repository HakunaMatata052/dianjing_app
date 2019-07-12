<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="pulling" loosing-text="loosing" loading-text="loading" success-text="success">
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>

<script>
import Vue from "vue";
import { PullRefresh } from 'vant'
Vue.use(PullRefresh)
export default {
  name: "page02",
  data() {
    return {
      count: 0,
      isLoading: false
    }
  },

  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
        this.count++;
      }, 500);
    }
  }
};
</script>

<style></style>
