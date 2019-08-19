<template>
  <div class="operation">
    <div class="operation-item" v-if="forward != -1">
      <van-icon class-prefix="icon" name="zhuanfa" color="rgba(153,153,153,1)" class="icon" />
      <span>{{forward}}</span>
    </div>
    <div class="operation-item" v-if="comment != -1" @click.stop="commentFn">
      <van-icon class-prefix="icon" name="pinglun" color="rgba(153,153,153,1)" class="icon" />
      <span>{{comment}}</span>
    </div>
    <div class="operation-item" v-if="zan != -1" @click.stop="zanFn">
      <van-icon name="like" :color="$store.state.color" size="16px" v-if="activeZan" />
      <van-icon name="like-o" color="rgba(153,153,153,1)" size="16px" v-else />
      <span>{{zanNum}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeZan: this.iszan,
      overlayShow: false,
      UIChatBox: null,
      popupShow: false,
      zanNum : this.zan
    };
  },
  props: {
    id: {
      default() {
        return "";
      },
      required: true
    },
    forward: {
      type: Number,
      default() {
        return -1;
      },
      required: false
    },
    comment: {
      type: Number,
      default() {
        return -1;
      },
      required: false
    },
    zan: {
      type: Number,
      default() {
        return -1;
      },
      required: false
    },
    iszan: {
      type: Number,
      default() {
        return false;
      },
      required: false
    }
  },
  methods: {
    zanFn() {
      this.activeZan = !this.activeZan;
      this.$SERVER.agree({
        sourceId: this.id,
        userId: this.$store.state.userInfo.userid
      }).then(res=>{
        this.zanNum = res.count
      }).catch(err=>{
        this.activeZan = !this.activeZan;
      })
    },
    commentFn() {
      var that = this;
      that.$emit('commentFn')
    },
  }
};
</script>
<style lang="less" scoped>
.operation {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  .operation-item {
    font-size: 12px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    display: flex;
    align-content: center;
    .icon {
      font-size: 16px;
    }
    span {
      margin-left: 5px;
    }
  }
}
</style>
