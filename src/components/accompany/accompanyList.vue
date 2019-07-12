<template>
  <div class="accompany-list" :class="scrollX ? 'accompanylistX' : ''">
    <div
      class="accompany-item"
      v-for="item in accompanyList"
      :key="item.id"
      @click="openAccompanyFn"
    >
      <div class="accompany-img">
        <van-image fit="cover" width="100%" height="100%" :src="item.download_url" />
        <div class="tag">
          <img src="img/hj_icon_party_type_amount.png" />
        </div>
        <div class="online">
          <van-icon class-prefix="icon" name="dot" size="4em" color="green" />在线
        </div>
        <div class="info">
          <div class="info-left">
            <span>评分 4.5分</span>
            <p>距离我1.2KM</p>
          </div>
          <div class="info-right">50币/小时</div>
        </div>
      </div>
      <h3>{{item.author}}</h3>
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
    return {
    };
  },
  methods: {
    openAccompanyFn() {
      console.log("打开陪练详情");
    }
  }
};
</script>
<style lang="less" scoped>
.accompany-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .accompany-item {
    width: 165px;
    .accompany-img {
      width: 100%;
      height: 130px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      .tag {
        position: absolute;
        left: 0;
        top: 10px;
        height: 20px;
        img {
          height: 100%;
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
        .info-left {
          span {
            font-size: 10px;
          }
          p {
            font-size: 12px;
          }
        }
        .info-right {
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
    h3 {
      padding: 5px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
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


