<template>
  <van-action-sheet v-model="showShare" title="分享到">
    <van-grid square>
      <van-grid-item text="微信">
          <template slot="icon"><van-icon class-prefix="icon" name="weixin" /></template>
      </van-grid-item>
      <van-grid-item text="朋友圈">
          <template slot="icon"><van-icon class-prefix="icon" name="pengyouquan" /></template>
      </van-grid-item>
    </van-grid>
    <div class="footer-empty" :style="'padding-top:'+bottom+'px'"></div>
  </van-action-sheet>
</template>

<script>
export default {
  data() {
    return {
      showShare: false,
      bottom: 0
    };
  },
  created(){
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.bottom = api.safeArea.bottom;
    }
  },
  methods: {
      open(){
          this.showShare = true
      }
  }
};
</script>

<style lang="less" scoped>
</style>