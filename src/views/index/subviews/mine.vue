<template>
  <div id="mine">
    <navBar :stl="'nobg'" />
    <div class="main">
      <div class="userinfo" :style="'margin-top:'+top+'px'">
        <div class="userinfo-top">
          <van-image
            fit="cover"
            :src="$store.state.userInfo.image || ($store.state.userInfo.sex == 0 ? 'img/avatar-w.png' :'img/avatar-m.png')"
            class="avatar"
          />
          <div class="userinfo-top-right">
            <h4>
              {{$store.state.userInfo.nickname}}
              <img
                src="../../../assets/images/authentication.png"
                v-if="$store.state.userInfo.level"
              />
            </h4>
            <span>ID:{{$store.state.userInfo.userid}}</span>
          </div>
        </div>

        <div class="receiptinfo">
          <dl @click="$router.push('/fansList/1/'+$store.state.userInfo.userid)">
            <dt>{{myInfo.attentionCount}}</dt>
            <dd>关注数</dd>
          </dl>
          <dl @click="$router.push('/fansList/2/'+$store.state.userInfo.userid)">
            <dt>{{myInfo.fansCount}}</dt>
            <dd>粉丝数</dd>
          </dl>
          <dl>
            <dt>{{myInfo.orderCount}}</dt>
            <dd>接单数</dd>
          </dl>
        </div>
      </div>
      <div class="mine">
        <van-grid square>
          <van-grid-item
            v-for="(item,index) in mineList"
            :key="index"
            @click="$router.push(item.path)"
          >
            <svg-icon :icon-class="item.ico" class="mine-ico" />
            <span>{{item.text}}</span>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="mine">
        <van-grid square>
          <van-grid-item
            v-for="(item,index) in mineMoreList"
            :key="index"
            @click="$router.push(item.path)"
          >
            <svg-icon :icon-class="item.ico" class="mine-ico" />
            <span>{{item.text}}</span>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "mine",
  components: {
    navBar
  },
  data() {
    return {
      top: 0,
      myInfo: {
        fansCount: 0,
        attentionCount: 0,
        orderCount: 0
      },
      mineList: [
        {
          text: "我的订单",
          path: "/orderlist",
          ico: "order"
        },
        {
          text: "我的钱包",
          path: "/",
          ico: "wallet"
        },
        {
          text: "我的技能",
          path: "/",
          ico: "skill"
        },
        {
          text: "我的礼物",
          path: "/",
          ico: "gift"
        }
      ],
      mineMoreList: [
        {
          text: "我的竞猜",
          path: "/",
          ico: "mine01"
        },
        {
          text: "我的视频",
          path: "/",
          ico: "mine02"
        },
        {
          text: "任务中心",
          path: "/",
          ico: "mine03"
        },
        {
          text: "我的消息",
          path: "/",
          ico: "mine04"
        },
        {
          text: "邀请好友",
          path: "/",
          ico: "mine05"
        },
        {
          text: "我的积分",
          path: "/",
          ico: "mine06"
        },
        {
          text: "我的卡券",
          path: "/",
          ico: "mine07"
        },
        {
          text: "认证中心",
          path: "/",
          ico: "mine08"
        },
        {
          text: "在线客服",
          path: "/",
          ico: "mine09"
        },
        {
          text: "观看历史",
          path: "/",
          ico: "mine10"
        },
        {
          text: "常见问题",
          path: "/",
          ico: "mine11"
        },
        {
          text: "更多设置",
          path: "/setting",
          ico: "mine12"
        }
      ]
    };
  },
  created() {
    this.$SERVER
      .getMyInfo({
        userId: this.$store.state.userInfo.userid
      })
      .then(res => {
        this.myInfo = res.data;
      });
  },
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
    }
  },
  activated() {}
};
</script>

<style lang="less" scoped>
.main {
  background: url(../../../assets/images/mine-bg.png) no-repeat center top;
  background-size: 100% auto;
  padding-top: 60px;
}
.userinfo {
  background: #fff;
  border-radius: 5px;
  width: 90%;
  padding: 20px 20px 10px;
  box-sizing: border-box;
  margin: 0 auto;
  .userinfo-top {
    display: flex;
    align-items: flex-end;
    margin-top: -30px;
    h4 {
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      img {
        width: 12px;
        height: 13px;
      }
    }
    span {
      font-size: 10px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
    overflow: hidden;
    flex-shrink: 0;
  }
  .receiptinfo {
    display: flex;
    width: 100%;
    justify-content: space-around;
    text-align: center;
    margin-top: 16px;
    dl {
      dt {
        font-size: 15px;
        font-weight: bold;
      }
      dd {
        font-size: 12px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        padding: 8px 0;
      }
    }
  }
}
.mine {
  margin: 15px 0;
  .mine-ico {
    width: 30px;
    height: 30px;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 35px;
  }
}
</style>

