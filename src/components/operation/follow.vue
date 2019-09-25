<template>
  <div
    :class="fanStatueId==0 ? 'btn follow' : 'btn'"
    @click="follow"
    v-if="toUserid!=$store.state.userInfo.userid && $METHOD.getStore('token')"
  >
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
.btn {
  width: 55px;
  height: 25px;
  line-height: 25px;
  background: rgba(191, 191, 191, 1);
  border-radius: 13px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  margin-right: 12px;
  &.follow {
    background: #ffd948!important;
  }
}
</style>
