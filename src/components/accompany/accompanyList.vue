<template>
  <div class="accompany-list" :class="scrollX ? 'accompanylistX' : ''">
    <div
      class="accompany-item"
      v-for="item in accompanyList"
      :key="item.id"
      @click="$router.push(`/accompanyDetail/${item.userid}`)"
    >
      <div class="accompany-img">
        <van-image fit="cover" width="100%" height="100%" :src="item.backimage" />
        <div class="tag">
          <img src="../../assets/images/hj_icon_party_type_amount.png" v-if="item.type==0" />
          <img src="../../assets/images/hj_icon_party_type_fire.png" v-else-if="item.type==1" />
          <img src="../../assets/images/hj_icon_party_type_hot.png" v-else-if="item.type==2" />
        </div>
        <div class="online">
          <van-icon
            class-prefix="icon"
            name="dot"
            size="4em"
            :color="item.loginstate == 1 ? 'green' : '#999' "
          />
          <span v-if="item.loginstate == 1">在线</span>
          <span v-else>离线</span>
        </div>
        <div class="info">
          <div class="info-left">
            <span>评分 {{item.score}}分</span>
            <p>距离我{{item.distance}}KM</p>
          </div>
          <div class="info-right">{{item.price}}币/小时</div>
        </div>
      </div>
      <h3>{{item.nickname}}</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    accompanyList: {
      /**
       * @description: tabItem字段
       * @param {title} 标题
       * @param {path} 路由路径
       * @param {icon} 图标
       * @param {icon_press} 选中图片
       */
      type: Array,
      default() {
        return [];
      },
      required: true
    },
    scrollX: {
      //是否横排滚动，默认竖排（false）
      type: Boolean,
      default() {
        return false;
      },
      required: false
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">
.accompany {
  .more {
    .icon {
      font-size: 10px;
    }
  }
}
</style>

<style lang="less" scoped>
.accompany-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .accompany-item {
    width: 150px;
    .accompany-img {
      width: 100%;
      height: 120px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      .tag {
        position: absolute;
        left: 0;
        top: 10px;
        height: 20px;
        width: auto;
        img {
          height: 100%;
          width: auto;
        }
      }
      .online {
        position: absolute;
        right: 10px;
        top: 10px;
        color: #fff;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 100px;
        font-size: 10px;
        padding: 5px 10px 5px 25px;
        height: 10px;
        line-height: 10px;
        i {
          width: 10px;
          height: 10px;
          position: absolute;
          left: -5px;
          top: 5px;
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0;
        width: 100%;
        color: #fff;
        padding: 5px;
        align-items: flex-end;
        box-sizing: border-box;
        text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.35);
        .info-left {
          font-size: 10px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
        }
        .info-right {
          font-size: 11px;
          font-weight: bold;
        }
      }
    }
    h3 {
      padding: 5px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
  &.accompanylistX {
    flex-wrap: nowrap;
    width: fit-content;
    .accompany-item {
      width: 150px;
      margin-right: 10px;
      .accompany-img {
        height: 120px;
      }
    }
  }
}
</style>


