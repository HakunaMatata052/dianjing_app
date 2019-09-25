<template>
  <div class="order-list">
    <div class="order-item" v-for="(item , index) in list" :key="index">
      <van-cell-group class="cell-group">
        <van-cell size="large" :center="true">
          <div slot="title" class="order-id">订单编号：{{item.orderId}}</div>
          <div slot="default" class="order-state" v-if="!type">订单状态：我已接单</div>
        </van-cell>
        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label" v-if="type===1">预约大神</div>
          <div slot="title" class="label" v-else-if="type===2">服务对象</div>
          <div slot="title" class="label" v-else>用户</div>
          <div slot="default" class="content">
            <div class="user" @click="$router.push(`/accompanyDetail/${item.userId}`)">
              <van-image fit="cover" :src="item.image || 'img/avatar-w.png'" class="avatar" />
              {{item.nickName}}
            </div>
          </div>
        </van-cell>

        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label">品类</div>
          <div slot="default" class="content">{{item.name}}</div>
        </van-cell>
        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label">时间</div>
          <div slot="default" class="content">{{$METHOD.format(item.publishDate, "MM月dd日 hh:mm")}}</div>
        </van-cell>
        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label">局数</div>
          <div slot="default" class="content">{{item.playCount}}局</div>
        </van-cell>
        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label">价格</div>
          <div slot="default" class="content">{{item.totalMoney}}币</div>
        </van-cell>
      </van-cell-group>
      <div class="btn-group">
        <div class="btn emphasize" v-if="item.customerUserId!==$store.state.userInfo.userid && item.status === 2" @click="updateOrderStatus(item.orderId,3)">确认交易完成</div>
        <div class="btn emphasize" v-if="item.customerUserId!==$store.state.userInfo.userid && item.status === 3">申请售后</div>
        <div class="btn emphasize" v-if="item.customerUserId!==$store.state.userInfo.userid && item.status === 1">提醒接单</div>
        <div class="btn emphasize" v-if="item.customerUserId===$store.state.userInfo.userid && item.status === 1" @click="updateOrderStatus(item.orderId,2)">接受订单</div>
        <div class="btn emphasize" v-if="item.customerUserId===$store.state.userInfo.userid && item.status === 1" @click="updateOrderStatus(item.orderId,4)">拒接此单</div>
        <div class="btn" @click="$router.push('/orderdetail/'+item.orderId)" v-if="type">订单详情</div>
      </div>

      <van-cell-group class="cell-group" v-if="!type">
        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label">下单时间</div>
          <div slot="default" class="content">{{$METHOD.format(item.createTime,'MM月dd日 hh:mm')}}</div>
        </van-cell>

        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label">过期时间</div>
          <div slot="default" class="content">
            {{$METHOD.format(item.publishDate,'MM月dd日 hh:mm')}}
            <span>过期即订单自动取消</span>
          </div>
        </van-cell>

        <van-cell
          size="large"
          :center="true"
          title-class="cell-left"
          value-class="cell-right"
          class="cell"
        >
          <div slot="title" class="label">备注</div>
          <div
            slot="default"
            class="content"
          >{{item.remark}}</div>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    type: {
      type: Number,
      default() {
        return 0;
      },
      required: false
    },
    state: {
      type: Number,
      default() {
        return 0;
      },
      required: false
    }
  },
  methods:{
  updateOrderStatus(id,status){
    this.$SERVER.updateOrderStatus({
      orderId:id,
      status: status
    }).then(res=>{
      this.$toast.success(res.data)
    })
  }
  }
};
</script>
<style lang="less" scoped>
.cell-group {
  margin-top: 10px;
  .order-id {
    font-size: 11px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .order-state {
    font-size: 11px;
    color: rgba(255, 217, 72, 1);
  }
  .label {
    font-size: 13px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 35px;
  }
  .content {
    font-size: 13px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user {      
    display: flex;
    align-items: center;
    }
    span {
      color: rgba(153, 153, 153, 1);
    }
  }
  .avatar {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .cell {
    padding: 0;
    align-items: stretch;
    .cell-left {
      width: 80px;
      flex: 0 1 auto;
      padding: 3px 15px;
      border-right: 1px solid #ebedf0;
      text-align: right;
    }
    .cell-right {
      text-align: left;
      display: flex;
      padding: 0 15px;
    }
  }
}
.order-item {
  .btn-group {
    background: #fff;
    display: flex;
    padding: 15px;
    justify-content: space-around;
    .btn {
      width: 140px;
      height: 33px;
      line-height: 33px;
      border-radius: 17px;
      font-size: 13px;
      font-weight: 500;
      text-align: center;
      border: 1px solid rgba(255, 217, 72, 1);
      color: rgba(153, 153, 153, 1);
      margin: 0 10px;
      &.emphasize {
        background: rgba(255, 217, 72, 1);
        color: rgba(51, 51, 51, 1);
      }
    }
  }
}
</style>
