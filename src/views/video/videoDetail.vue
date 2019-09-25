<template>
  <div class="container">
    <div class="header" :class="background">
      <div :style="'height:'+top+'px'"></div>
      <div class="head">
        <div class="head-left">
          <van-icon name="arrow-left" :color="color" size="25" @click="$router.go(-1)" />
          <van-icon name="like" color="#ffd948" size="25" v-if="info.likeStatue" @click="zanFn" />
          <van-icon name="like" :color="color" size="25" v-else @click="zanFn" />
          <van-icon
            class-prefix="icon"
            name="zhuanfa-o"
            :color="color"
            size="25"
            @click="$refs.share.open()"
          />
          <van-icon name="warning" :color="color" size="25" />
        </div>
        <div class="head-right">
          <img
            :src="info.image"
            class="avatar"
            @click="$router.push(`/accompanyDetail/${info.userid}`)"
          />
          <follow :toUserid="info.userid" />
        </div>
      </div>
    </div>
    <div class="main">
      <div class="video" ref="video_box" @click="pauseVideo">
        <video
          ref="video"
          class="video_box"
          webkit-playsinline="true"
          x5-playsinline
          x5-video-player-type="h5"
          x5-video-player-fullscreen
          playsinline
          preload="auto"
          :poster="info.frontcover"
          x-webkit-airplay="allow"
          x5-video-orientation="portrait"
          @click="pauseVideo"
          loop="loop"
          autoplay
          v-if="show"
        >
          <source :src="info.video" type="video/mp4" />
        </video>
        <van-icon
          name="play-circle"
          color="#fff"
          size="50"
          v-show="iconPlayShow"
          @click="playvideo"
          class="iconPlayShow"
        />
      </div>
      <div class="info" ref="info">
        <div class="info-top">
          <span>{{info.readcount}} 播放</span>
          <span>{{$METHOD.timeSwitchString(info.createtime)}}</span>
        </div>
        <div class="userinfo">
          <span @click="$router.push(`/accompanyDetail/${info.userid}`)">{{info.nickname}}：</span>
          {{info.comment}}
          <span
            v-if="info.friendsList"
            v-for="item,index in info.friendsList"
            @click="$router.push(`/accompanyDetail/${item.userId}`)"
          >@{{item.nickName}}</span>
        </div>
        <div class="data">
          <div class="item">
            <van-icon name="like" color="#999" size="15" class="ico" />
            {{info.likeCount}} 喜欢
          </div>
          <div class="item">
            <van-icon name="comment" color="#999" size="15" class="ico" />
            {{info.replyCount}} 评论
          </div>
        </div>
      </div>
      <comment ref="comment" :pid="info.videoid" :type="1" />

      <div class="bottom" :style="'padding-top:'+top+'px'"></div>
    </div>
    <share ref="share" />
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import operation from "@/components/operation/operation.vue";
import comment from "@/components/operation/comment.vue";
import follow from "@/components/operation/follow.vue";
import share from "@/components/operation/share.vue";
export default {
  name: "videoDetail",
  components: {
    navBar,
    operation,
    comment,
    follow,
    share
  },
  data() {
    return {
      top: 0,
      show: false,
      playOrPause: true,
      iconPlayShow: false,
      background: "",
      color: "#fff",
      info: {
        video: ""
      },
      UIChatBox: null
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
    }
  },
  created() {
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.UIChatBox = api.require("UIChatBox");
    }
    this.$SERVER
      .getVideoInfo({
        videoid: this.$route.params.id,
        userId: this.$store.state.userInfo.userid
      })
      .then(res => {
        this.info = res.data;
        this.$refs.comment.onLoad(res.data.videoid, 1);
        this.show = true;
      });
  },

  beforeDestroy: function() {
    window.removeEventListener("scroll", this.handleScroll, true);
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.UIChatBox.close();
    }
  },
  methods: {
    zanFn() {
      this.info.likeStatue = !this.info.likeStatue;
      this.$SERVER
        .agree({
          sourceId: this.info.videoid,
          userId: this.$store.state.userInfo.userid
        })
        .then(res => {
          this.info.likeCount = res.count;
        })
        .catch(err => {
          this.info.likeStatue = !this.info.likeStatue;
        });
    },
    playvideo(event) {
      let video = this.$refs.video;
      this.iconPlayShow = false;
      this.playOrPause = true;
      video.play();
    },
    pauseVideo() {
      //暂停\播放
      let video = this.$refs.video;
      if (this.playOrPause) {
        video.pause();
        this.iconPlayShow = true;
      } else {
        video.play();
        this.iconPlayShow = false;
      }
      this.playOrPause = !this.playOrPause;
    },
    handleScroll(e) {
      var that = this;
      if (e.target.scrollTop >= that.$refs.video_box.offsetHeight) {
        this.background = "deep";
        this.color = "#999";
      } else {
        this.background = "";
        this.color = "#fff";
      }
      if (window.navigator.userAgent.match(/APICloud/i)) {
        that.UIChatBox.open(
          {
            placeholder: "说点什么",
            autoFocus: false,
            emotionPath: "widget://res/image/emotion",
            texts: {
              sendBtn: {
                title: "发送"
              }
            },
            styles: {
              inputBar: {
                borderColor: "rgba(255,255,255,1)",
                bgColor: "rgba(255,255,255,1)"
              },
              inputBox: {
                borderColor: "rgba(245,245,245,1)",
                bgColor: "rgba(245,245,245,1)",
                textColor: "rgba(153,153,153,1)",
                borderCorner: 15
              },
              indicator: {
                target: "both",
                color: "#c4c4c4",
                activeColor: "#9e9e9e"
              },
              emotionBtn: {
                //（可选项）JSON对象；表情按钮样式；不传则不显示表情按钮
                normalImg: "widget://res/image/face1.png" //（可选项）字符串类型；表情按钮常态的背景图片（本地路径，fs://、widget://）；默认：笑脸小图标,
              },
              sendBtn: {
                bg: "#4cc518",
                titleColor: "#ffffff",
                activeBg: "#46a91e",
                titleSize: 13
              }
            }
          },
          function(ret, err) {
            if (ret.eventType == "send") {
              if (ret.msg == null || ret.msg == "") {
                that.$toast.fail("评论内容不能为空！");
              } else {
                that.$SERVER
                  .addEvaluate({
                    pid: that.$route.params.id,
                    type: 1,
                    message: ret.msg,
                    fromUserId: that.$store.state.userInfo.userid
                  })
                  .then(res => {
                    that.$toast.success("评论成功！");
                    that.info.replyCount++;
                    that.$refs.comment.addCommentView(ret.msg);
                  });
                that.UIChatBox.close();
              }
            }
          }
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  background: #fff;
}
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background: rgba(255, 255, 255, 0.3);
  &.deep {
    background: rgba(255, 255, 255, 1);
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0 15px;
    .head-left {
      display: flex;
      align-items: center;
      width: 50%;
      justify-content: space-between;
    }
    .head-right {
      display: flex;
      align-items: center;
      width: 50%;
      flex-direction: row-reverse;
      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }
  }
}
.video {
  position: relative;
  width: 100%;
  height: 80%;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  .iconPlayShow {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1001;
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin-left: -25px;
    margin-top: -25px;
    text-align: center;
  }
  .video_box {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  video {
    object-position: 0 0;
  }
}
.info {
  padding: 10px;
  .info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
    line-height: 30px;
  }
  .userinfo {
    font-size: 13px;
    color: #999;
    line-height: 19px;
    span {
      font-weight: bold;
      color: rgba(18, 45, 106, 1);
    }
  }
  .data {
    font-size: 13px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 5px 0;
    line-height: 20px;
    .item {
      display: flex;
      align-items: center;
    }
    .ico {
      margin-right: 5px;
    }
  }
}

.bottom {
  height: 30px;
}
</style>
