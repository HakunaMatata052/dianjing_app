<template>
  <div
    class="item"
    :style="'background: linear-gradient(90deg,'+ item.bgcolor.split(':')[0]+','+ item.bgcolor.split(':')[1]+')'"
  >
    <div class="top">
      <img :src="item.bgimg" />
      <div class="info">
        <h3>{{item.bankName}}</h3>
        <p>单笔5万元，日累计20万元</p>
      </div>
      <van-button
        type="default"
        class="btn"
        v-if="!item.firstCard && setting"
        @click="updateCardBank(item.bankCardId,$event)"
      >设置为默认卡片</van-button>
    </div>
    <div class="card-num">
      <span>****</span>
      <span>****</span>
      <span>****</span>
      <span>{{item.bankCardEnd}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default() {
        return [];
      },
      required: true
    },
    setting: {
      type: Boolean,
      default(){
        return true
      },      
      required: false
    }
  },
  methods: {
    updateCardBank(bankCardId, e) {
      e.target.disabled = true;
      this.$SERVER
        .updateCardBank({
          bankCardId: bankCardId
        })
        .then(res => {
          this.$toast.success("设置成功!");
          this.$emit('callback')
          e.target.disabled = false;
        })
        .catch(err => {
          e.target.disabled = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  width: 100%;
  height: 115px;
  box-sizing: border-box;
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    img {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 8px solid #fff;
      flex-shrink: 0;
      margin-right: 12px;
    }
    .info {
      flex-grow: 1;
      color: rgba(255, 255, 255, 1);
      h3 {
        font-size: 15px;
        font-weight: 500;
      }
      p {
        font-size: 11px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
      }
    }
    .btn {
      flex-shrink: 0;
      padding: 0;
      width: 99px;
      height: 26px;
      line-height: 26px;
      background: rgba(0, 0, 0, 0);
      border: 1px solid rgba(255, 246, 240, 1);
      border-radius: 3px;
      font-size: 11px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
  }
  .card-num {
    display: flex;
    justify-content: space-around;
    width: 80%;
    color: #fff;
    margin: 20px auto 0;
  }
}
</style>