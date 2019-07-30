<template>
  <div @click="follow">
    <slot></slot>
    {{fanStatue}}
  </div>
</template>
<script>
export default {
  props: {
    toUserid: {
      type: String,
      default() {
        return "";
      },
      required: false
    }
  },
  data() {
    return {
      fanStatueId: 0,
      fanStatue: "关注"
    };
  },
  created() {
    this.inFans(0);
  },
  methods: {
    follow() {
      if (this.fanStatueId == 0) {
        this.inFans(1);
      } else {
        this.inFans(2);
      }
    },
    inFans(type) {
      this.$SERVER
        .fans({
          loginUserId: this.$store.state.userInfo.userid,
          toUserId: this.toUserid,
          type: type
        })
        .then(res => {
          if (res.data == 0) {
            this.fanStatueId = res.data;
            this.fanStatue = "关注";
          }

          if (res.data == 1) {
            this.fanStatueId = res.data;
            this.fanStatue = "已关注";
          }

          if (res.data == 2) {
            this.fanStatue = "互相关注";
            this.fanStatueId = res.data;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
