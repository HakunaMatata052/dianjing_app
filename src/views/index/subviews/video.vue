<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" pulling-text="pulling" loosing-text="loosing" loading-text="loading" success-text="success">
      <p>刷新次数: {{ count }}</p>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "video",
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
