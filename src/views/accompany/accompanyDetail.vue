<template>
  <div class="container" id="accompanyDetail">
    <navBar stl="nobg">
      <van-icon
        class-prefix="icon"
        name="camera"
        color="rgba(255,255,255,.6)"
        class="camera"
        slot="right"
        @click="uploadBackimage"
        v-if="$route.params.userid==$store.state.userInfo.userid"
      />
    </navBar>
    <div class="main">
      <div
        class="userbg"
        :style="'background: url('+ (userInfo.backimage || 'https://picsum.photos/500/500') + ') no-repeat center center'"
      ></div>
      <van-pull-refresh
        v-model="isLoading"
        @refresh="isLoading = false"
        pulling-text=" "
        loosing-text=" "
        loading-text=" "
        success-text=" "
        :head-height="300"
        class="refresh"
      >
        <div class="userinfo">
          <div class="avatar">
            <img :src="userInfo.image" />
            <div class="authentication" v-if="userInfo.level"></div>
          </div>
          <div class="username">
            {{userInfo.nickname}}
            <span>
              <gander :gander="userInfo.sex" :age="userInfo.age" />
            </span>
          </div>
          <div class="sign">{{userInfo.signname}}</div>
          <div class="btn-group">
            <follow :toUserid="$route.params.userid" />
            <div
              class="btn"
              v-if="$route.params.userid!=$store.state.userInfo.userid"
              @click="$router.push('/chat/'+$route.params.userid)"
            >私聊</div>
            <div class="voice" v-if="!userInfo.voice &&  userInfo.voice != ''">
              <van-icon class-prefix="icon" name="play" />
            </div>
          </div>
          <div class="receiptinfo">
            <dl>
              <dt
                @click="$router.push('/fansList/1/'+$route.params.userid)"
              >{{myInfo.attentionCount}}</dt>
              <dd>关注数</dd>
            </dl>
            <dl>
              <dt @click="$router.push('/fansList/2/'+$route.params.userid)">{{myInfo.fansCount}}</dt>
              <dd>粉丝数</dd>
            </dl>
            <dl>
              <dt>{{myInfo.orderCount}}</dt>
              <dd>接单数</dd>
            </dl>
          </div>
        </div>
        <van-tabs
          v-model="activeTabs"
          class="tabs"
          :color="$store.state.color"
          :title-active-color="$store.state.color"
          animated
        >
          <van-tab title="服务" name="0">
            <div class="tabs-con">
              <div class="game-list">
                <van-list
                  v-model="abilityListLoading"
                  :finished="abilityFinished"
                  finished-text="没有更多了"
                  loading-text=" "
                  @load="getUserAbilityList"
                >
                  <van-skeleton
                    title
                    avatar
                    :row="1"
                    :loading="abilitySkeletonLoading"
                    avatar-size="50"
                    avatar-shape="square"
                  >
                    <div
                      class="game-item"
                      v-for="(item,index) in abilityList"
                      :key="index"
                      @click="downOrder(item.abilityId)"
                    >
                      <img :src="item.icon" />
                      <div class="game-info">
                        <h3>{{item.name}}</h3>
                        <p>技术水平 2100分 | Steam服 | 手Q区 | 包上分段位</p>
                      </div>
                      <div class="price">
                        游戏陪练
                        <span>¥{{item.price}}元起</span>
                      </div>
                    </div>
                  </van-skeleton>
                </van-list>
              </div>
            </div>
          </van-tab>
          <van-tab title="动态" name="1">
            <div class="tabs-con">
              <div class="dynamic-list">
                <div class="dynamic-item">
                  <div class="dynamic-time">
                    <span>2018/08/20 13:12</span>
                    <van-icon class-prefix="icon" name="more2" color="rgba(204,204,204,1)" />
                  </div>
                  <div class="dynamic-text">总部位于新加坡,主要为东南亚和非洲等新兴...</div>
                  <div class="dynamic-media">
                    <van-row gutter="10">
                      <van-col span="8">
                        <van-image
                          fit="cover"
                          width="100%"
                          src="https://img.yzcdn.cn/1.jpg"
                          @click="imagePreview(1)"
                        />
                      </van-col>
                      <van-col span="8">
                        <van-image
                          fit="cover"
                          width="100%"
                          src="https://img.yzcdn.cn/2.jpg"
                          @click="imagePreview(2)"
                        />
                      </van-col>
                      <van-col span="8">
                        <van-image
                          fit="cover"
                          width="100%"
                          src="https://picsum.photos/50/50"
                          @click="imagePreview(3)"
                        />
                      </van-col>
                    </van-row>
                  </div>
                  <operation
                    class="operation"
                    :id="10"
                    :forward="120"
                    :comment="20"
                    :zan="112"
                    :iszan="true"
                  />
                </div>
                <div class="dynamic-item">
                  <div class="dynamic-time">
                    <span>2018/08/20 13:12</span>
                    <van-icon class-prefix="icon" name="more2" color="rgba(204,204,204,1)" />
                  </div>
                  <div class="dynamic-text">总部位于新加坡,主要为东南亚和非洲等新兴...</div>
                  <div class="dynamic-media">
                    <van-row gutter="10">
                      <van-col span="8">
                        <van-image
                          fit="cover"
                          width="100%"
                          src="https://picsum.photos/50/50"
                          @click="imagePreview(0)"
                        />
                      </van-col>
                      <van-col span="8">
                        <van-image
                          fit="cover"
                          width="100%"
                          src="https://picsum.photos/50/50"
                          @click="imagePreview(1)"
                        />
                      </van-col>
                      <van-col span="8">
                        <van-image
                          fit="cover"
                          width="100%"
                          src="https://picsum.photos/50/50"
                          @click="imagePreview(2)"
                        />
                      </van-col>
                    </van-row>
                  </div>
                  <operation
                    class="operation"
                    :id="12"
                    :forward="10"
                    :comment="210"
                    :zan="1"
                    :iszan="false"
                  />
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="印象" name="2">
            <div class="tabs-con impression">
              <van-rate
                v-model="score"
                gutter="10px"
                :color="$store.state.color"
                class="rate"
                readonly
              />
              <div class="tags">
                <span>神级操作 2</span>
                <span>神级操作 2</span>
                <span>神级操作 2</span>
                <span>神级操作 2</span>
              </div>
              <div class="impression-title">
                <h3>
                  评论
                  <small>123</small>
                </h3>
              </div>
              <div class="impression-list">
                <div class="impression-item">
                  <div class="impression-userinfo">
                    <van-image
                      fit="cover"
                      width="28"
                      height="28"
                      src="https://picsum.photos/28/28"
                      class="avatar"
                    />
                    <h3>羊羊晴nee</h3>
                    <gander :gander="0" :age="18" />
                  </div>
                  <div class="impression-text">BitX是一个跨国比特币平台,总部位于新加坡,主要为东南亚和非洲等新兴...</div>
                  <div class="impression-bottom">
                    <span>2018-11-27</span>
                    <operation class="operation" :id="10" :comment="20" :zan="20" :iszan="1" />
                  </div>
                </div>
                <div class="impression-item">
                  <div class="impression-userinfo">
                    <van-image
                      fit="cover"
                      width="28"
                      height="28"
                      src="https://picsum.photos/28/28"
                      class="avatar"
                    />
                    <h3>羊羊晴nee</h3>
                    <gander :gander="0" :age="18" />
                  </div>
                  <div class="impression-text">BitX是一个跨国比特币平台,总部位于新加坡,主要为东南亚和非洲等新兴...</div>
                  <div class="impression-bottom">
                    <span>2018-11-27</span>
                    <operation class="operation" :id="10" :comment="20" :zan="20" :iszan="0" />
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </van-pull-refresh>
    </div>
    <div
      class="order-btn"
      v-if="activeTabs==0 && $route.params.userid!=$store.state.userInfo.userid && abilityList.length != 0"
      @click="downOrder"
      :style="'padding-bottom:'+ bottom +'px'"
    >立即下单</div>
    <uploadAvatar ref="upload" @uploadSuccess="uploadSuccess" mode="all" height="300" top="150" />
  </div>
</template>
<script>
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
import navBar from "@/components/navbar/navbar.vue";
import gander from "@/components/user/gander.vue";
import operation from "@/components/operation/operation.vue";
import follow from "@/components/operation/follow.vue";
import uploadAvatar from "@/components/upload/uploadAvatar.vue";
export default {
  name: "accompanyDetail",
  components: {
    navBar,
    gander,
    operation,
    follow,
    uploadAvatar
  },
  data() {
    return {
      isLoading: false,
      activeTabs: "0",
      score: 2,
      bottom: 0,
      userInfo: {},
      myInfo: {
        fansCount: 0,
        attentionCount: 0,
        orderCount: 0
      },
      abilityPageNum: 1,
      abilityPageSize: 10,
      abilityLHasNextPage: true,
      abilityListLoading: false,
      abilityFinished: false,
      abilitySkeletonLoading: true,
      abilityList: []
    };
  },
  created() {
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.bottom = api.safeArea.bottom;
    }
    this.getUserInfo();
  },
  methods: {
    imagePreview(index) {
      ImagePreview({
        images: ["https://img.yzcdn.cn/1.jpg", "https://img.yzcdn.cn/2.jpg"],
        startPosition: index,
        onClose() {
          // do something
        }
      });
    },
    uploadBackimage() {
      this.$refs.upload.openLoadPopup();
    },
    // 组件上传成功的回调函数
    uploadSuccess(val) {
      var that = this;
      that.$SERVER
        .updateUseInfo({
          userid: that.$store.state.userInfo.userid,
          backimage: val
        })
        .then(res => {
          that.$toast.success(res.data);
          that.userInfo.backimage = val;
        });
    },
    getUserInfo() {
      var that = this;
      that.$SERVER
        .getUserInforById({
          userid: that.$route.params.userid
        })
        .then(res => {
          that.userInfo = res.data;
        });
      that.$SERVER
        .getMyInfo({
          userId: that.$route.params.userid
        })
        .then(res => {
          that.myInfo = res.data;
        });
    },
    getUserAbilityList(isClear) {
      var that = this;
      if (isClear) {
        that.abilityPageNum = 1;
        that.abilityLHasNextPage = true;
      }
      if (!that.abilityLHasNextPage) {
        that.abilityListLoading = false;
        that.abilityFinished = true;
        that.abilitySkeletonLoading = false;
        return;
      }
      that.$SERVER
        .userAbilityList({
          userid: that.$route.params.userid,
          pageNum: that.abilityPageNum,
          pageSize: that.abilityPageSize
        })
        .then(res => {
          that.abilityPageNum = res.data.nextPage;
          that.abilityLHasNextPage = res.data.hasNextPage;
          that.abilityFinished = !res.data.hasNextPage;
          if (isClear) {
            that.abilityList = res.data.list;
          } else {
            that.abilityList = [...that.abilityList, ...res.data.list];
            that.abilityListLoading = false;
            that.abilitySkeletonLoading = false;
          }
        });
    },
    downOrder(id) {
      if (this.$route.params.userid == this.$store.state.userInfo.userid) {
        this.$toast.fail("自己不能向自己下单！");
        return;
      }
      if (id) {
        this.$router.push(`/downorder/${this.$route.params.userid}/${id}`);
      } else {
        this.$router.push(`/downorder/${this.$route.params.userid}`);
      }
    }
  }
};
</script>
<style lang="less">
.refresh {
  .van-pull-refresh__track {
    background: #f5f5f5;
  }
}
</style>
<style lang="less" scoped>
.userbg {
  position: absolute;
  width: 100%;
  height: 300px;
  background-size: cover;
  img {
    width: 100%;
    height: auto;
  }
}
.userinfo {
  background: rgba(255, 255, 255, 1);
  border-radius: 5px 5px 0px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  margin-top: 200px;
  .avatar {
    position: relative;
    z-index: 99;
    top: -30px;
    margin-bottom: -30px;
    img {
      width: 75px;
      height: 75px;
      border-radius: 50%;
    }
    .authentication {
      position: absolute;
      bottom: 0;
      right: 0;
      background: url(../../assets/images/authentication.png) no-repeat center
        center;
      background-size: 100%;
      width: 20px;
      height: 26px;
    }
  }
  .username {
    font-size: 14px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    padding: 8px 0;
  }
  .sign {
    font-size: 12px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .btn-group {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 15px 0;
    border-bottom: 1px solid rgba(245, 245, 245, 1);
    margin-bottom: 15px;
    .btn {
      width: 100px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-weight: bold;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(255, 217, 72, 1);
      border-radius: 16px;
      text-align: center;
      color: rgba(51, 51, 51, 1);
    }
    .voice {
      width: 100px;
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-weight: bold;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(255, 217, 72, 1);
      border-radius: 16px;
      color: rgba(51, 51, 51, 1);
      padding: 0 5px;
      box-sizing: border-box;
      .icon {
        font-size: 26px;
        color: rgba(255, 217, 72, 1);
      }
    }
    .nofollow {
      background: rgba(255, 217, 72, 1);
    }
  }
  .receiptinfo {
    display: flex;
    width: 100%;
    justify-content: space-around;
    text-align: center;
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
.tabs {
  margin-top: 15px;
  .tabs-con {
    background: #fff;
    padding: 15px;
    .game-list {
      .game-item {
        border: 1px solid rgba(243, 243, 243, 1);
        border-radius: 5px;
        position: relative;
        padding: 10px 10px 20px 10px;
        margin-bottom: 25px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 10px;
          position: absolute;
          left: 10px;
          top: 10px;
        }
        .game-info {
          padding-left: 60px;
          height: 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          h3 {
            font-size: 16px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            font-size: 12px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .price {
          width: 130px;
          font-size: 12px;
          position: absolute;
          left: 50%;
          bottom: -15px;
          margin-left: -130/2px;
          border: 1px solid rgba(255, 217, 72, 1);
          border-radius: 30px;
          padding: 3px 5px;
          text-align: center;
          background: #fff;
          span {
            color: #ff4545;
          }
        }
      }
    }
    .dynamic-list {
      .dynamic-item {
        border-bottom: 1px solid rgba(153, 153, 153, 0.5);
        margin-bottom: 20px;
        .dynamic-time {
          font-size: 10px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          display: flex;
          justify-content: space-between;
        }
        .dynamic-text {
          font-size: 12px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 17px;
          padding: 15px 0;
        }
        .dynamic-media {
        }
        .operation {
          padding: 10px 0;
        }
      }
    }
  }
}
.impression {
  .rate {
    display: flex;
    justify-content: center;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    span {
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 12px;
      color: rgba(102, 102, 102, 1);
      background: #eee;
      border-radius: 5px;
      padding: 5px 10px;
    }
  }
  .impression-title {
    position: relative;
    padding-left: 10px;
    h3 {
      font-size: 15px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      small {
        font-size: 13px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        margin-left: 10px;
      }
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 3px;
        height: 16px;
        background: rgba(255, 217, 72, 1);
        border-radius: 2px;
      }
    }
  }
  .impression-list {
    .impression-item {
      padding: 15px 0;
      .impression-userinfo {
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        display: flex;
        align-items: center;
        .avatar {
          border-radius: 50%;
          overflow: hidden;
        }
        & * {
          margin-right: 10px;
        }
      }
      .impression-text {
        padding: 12px 0;
        font-size: 12px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        border-bottom: 1px solid rgba(245, 245, 245, 1);
      }
      .impression-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 0;
        span {
          font-size: 10px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
        }
        & * {
          width: 30%;
        }
      }
    }
  }
}
.order-btn {
  width: 100%;
  height: 55px;
  line-height: 55px;
  background: rgba(255, 217, 74, 1);
  font-size: 17px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}
</style>
