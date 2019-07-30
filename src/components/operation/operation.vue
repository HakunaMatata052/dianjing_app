<template>
  <div class="operation">
    <div class="operation-item" v-if="forward">
      <van-icon class-prefix="icon" name="zhuanfa" color="rgba(153,153,153,1)" class="icon" />
      <span>{{forward}}</span>
    </div>
    <div class="operation-item" v-if="comment">
      <van-icon class-prefix="icon" name="pinglun" color="rgba(153,153,153,1)"  class="icon"/>
      <span>{{comment}}</span>
    </div>
    <div class="operation-item" v-if="zan" @click="zanFn">
      <van-icon name="like" :color="$store.state.color" size="16px" v-if="iszan"/>
      <van-icon name="like-o" color="rgba(153,153,153,1)" size="16px" v-else/>
      <span>{{zan}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
      default() {
        return 0;
      },
      required: false
    },
    forward: {
      type: Number,
      default() {
        return 0;
      },
      required: false
    },
    comment: {
      type: Number,
      default() {
        return 0;
      },
      required: false
    },
    zan: {
      type: Number,
      default() {
        return 0;
      },
      required: false
    },
    iszan: {
      type: Boolean,
      default() {
        return false;
      },
      required: false
    }
  },methods:{
      zanFn(){
          console.log(this.id)
          this.iszan = !this.iszan
      }
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
