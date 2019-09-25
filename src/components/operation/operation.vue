<template>
  <div class="operation">
    <div class="operation-item" v-if="forward != -1">
      <van-icon class-prefix="icon" name="zhuanfa" :size="size" color="rgba(153,153,153,1)" class="icon" />
      <span :style="'font-size:'+(size-4)+'px'">{{forwardC}}</span>
    </div>
    <div class="operation-item" v-if="comment != -1" @click.stop="commentFn">
      <van-icon class-prefix="icon" name="pinglun" :size="size" color="rgba(153,153,153,1)" class="icon" />
      <span :style="'font-size:'+(size-4)+'px'">{{commentC}}</span>
    </div>
    <div class="operation-item" v-if="zan != -1" @click.stop="zanFn">
      <van-icon name="like" :color="$store.state.color" :size="size" v-if="activeZan" />
      <van-icon name="like-o" color="rgba(153,153,153,1)" :size="size" v-else />
      <span :style="'font-size:'+(size-4)+'px'">{{zanNumC}}</span>
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
  computed:{
    forwardC(){
      if(this.forward===0) {
        return ''
      }else{
        return this.forward
      }
    },
    
    commentC(){
      if(this.comment===0) {
        return ''
      }else{
        return this.comment
      }
    },
    
    zanNumC(){
      if(this.zanNum===0) {
        return ''
      }else{
        return this.zanNum
      }
    }
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
      default() {
        return 0;
      },
      required: false
    },
    size: {
      type: Number,
      default() {
        return 16;
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
        this.$emit('zanFn',res.count)
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
    span {
      margin-left: 5px;
    }
  }
}
</style>
