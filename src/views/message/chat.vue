<template>
  <div class="container">
    <navBar :title="title" />
    <div class="main" :style="'padding-top:'+top+'px'">
      <th-message
        ref="messgebox"
        :useText="useText"
        :usePulldown="usePulldown"
        :pulldownConfig="pulldownConfig"
        :topPadding="topPadding"
        :messageData="messageData"
        :funcList="funcList"
        :showInput="showInput"
        :selfFace="selfFace"
        :otherFace="otherFace"
        :showEmoticon="true"
        @sendOut="senRequest"
        @galleryCall="gallery"
        @cameraCall="camera"
        @quickCall="quick"
        @bigBtnCall="btncall"
        @faceClick="faceclick"
        @msgClick="msgclick"
        @pulldownCall="pulldowncall"
        class="message"

      ></th-message>
    </div>
    <div class="footer-empty" :style="'padding-top:'+bottom+'px'"></div>
    <rongyun ref="rongyun" />
  </div>
</template>
<script>
// import Vue from "vue";
// import thor from "thor-x";
// import "thor-x/dist/index.css";
// Vue.use(thor);
import navBar from "@/components/navbar/navbar.vue";
import rongyun from "@/components/rongyun.vue";
import ThMessage from "@/components/message";
import messageUtil from "@/common/js/messageUtil.js";
export default {
  name: "chat",
  components: {
    navBar,
    ThMessage ,
    rongyun
  },
  data() {
    return {
      title: "",
      useText: false, // 控制是否开启textarea输入提交模式
      topPadding: 0, // 顶部间距。若顶部有其他功能块，可以设置顶部间距，数值为该功能块高度，只支持正整数.
      messageData: [], // 聊天记录。type: 4种形式 type=1 右侧泡泡 type=2 左侧泡泡 type=3 消息提示 type=4 系统消息;text: html信息（支持html标签）;isimg: 是否为图片信息 true/false，默认false.
      funcList: ["gallery", "camera"], // 功能列表。数组形式 可传["gallery","camera", "quick"]，传几个显示几个
      showInput: true, // 是否显示聊天输入框。默认true，传入false则输入框不显示
      selfFace: this.$store.state.userInfo.image, // 发送方的头像，默认显示默认图
      otherFace: "url", // 接收方的头像，默认显示默认图
      usePulldown: false, // 配置是否开启下拉刷新功能
      pulldownConfig: {
        default: "下拉刷新",
        up: "<div style='color:red'>下拉刷新</div>",
        down: "<div style='color:blue'>下拉刷新</div>",
        loading: "<span style='color:green'>加载中</span>"
      }, // 下拉刷新配置。可配置4个参数：default/up/down/loading，支持传入html
      showEmoticon: true, // 配置是否使用表情包
      fromTop: false,
      top: 0,
      bottom: 0,
      frienduserid: ""
    };
  },
  created() {
    var that = this;
    if (window.navigator.userAgent.match(/APICloud/i)) {
      that.bottom = api.safeArea.bottom;
      var systemType = that.$store.state.systemType;
      if (systemType == "android") {
        that.top = 25;
      }
      if (systemType == "ios") {
        that.top = 40;
      }
      that.$SERVER
        .getUserInforById({
          userid: that.$route.params.userid
        })
        .then(res => {
          that.otherFace = res.data.image;
          that.frienduserid = res.data.userid;
          that.title = res.data.nickname;
          let list = messageUtil.showMessages(
            that.$store.state.userInfo.userid,
            res.data.userid
          );
          var messageData = [];
          for (let i = 0; i < list.length; i++) {
            if (list[i].direction == "SEND") {
              messageData.unshift({
                type: 1,
                text: list[i].content
              });
            } else {
              messageData.unshift({
                type: 2,
                text: list[i].content
              });
            }
          }
          this.messageData = messageData;
        })
        .catch(err => {
          console.log(err);
          that.$toast.fail("聊天记录加载失败！");
        });
    }
    this.updateRead()
  },
  methods: {
    senRequest(val) {
      var that = this;
      var content = {
        type: 1,
        text: val
      };
      that.messageData.push(content);
      that.$refs.rongyun.sendTextMessageListener(that.frienduserid,val,that.$route.params.userid,that.otherFace)
    },
    receive(){
      console.log(123)
    },
    // 刷新未读消息
    updateRead(){
      messageUtil.updateRead(this.$route.params.userid)
    },
    gallery() {},
    camera() {},
    quick() {},
    btncall() {},
    faceclick() {},
    msgclick() {},
    pulldowncall() {}
  }
};
</script>
<style lang="less">
.messagebox {
  height: 100% !important;
  overflow: scroll;
}
.th-message .inputbox {
  border-bottom: 0px;
}
</style>
<style lang="less" scoped>
.main {
  height: 100%;
}
.message {
  height: 100%;
  display: flex;
  flex-flow: column;
}
</style>