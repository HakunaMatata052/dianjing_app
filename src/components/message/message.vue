<template>
  <div class="th-message" :style="{marginTop:`-${topPadding}px`}">
    <scroller class="messagebox" ref="scrollerEvent" lock-x v-model="status" :height="bottomheight" :use-pulldown="usePulldown" @on-pulldown-loading="pulldown" @on-scroll="onscroll">
      <div ref="scrollbox" :style="{paddingTop:`${topPadding}px`}">
        <div class="message-item" :class="{'people-item':i.type==1,'doc-item':i.type==2,'msg-item':i.type==3,'default-item':i.type==4,'isimg':i.isimg}" v-for="i in messageData">
          <img class="headimg" :src="i.headImg||i.type==1?selfFace||people:otherFace||doc" @click.stop="faceclick(i)">
          <div class="mtext" v-html="i.text" @click.stop="msgclick(i)"></div>
        </div>
        <x-button v-if="bigBtn!=''" class="pbtn" type="primary" @click.native="btnCall">{{bigBtn}}</x-button>
      </div>
      <div v-if="usePulldown" slot="pulldown" class="th-pulldown" style="position: absolute; top:100px;" :style="{top:`${parseInt(topPadding||0)-60}px`}">
        <span v-show="status.pulldownStatus === 'default'" v-html="`${pulldownConfig.default||'下拉刷新'}`"></span>
        <span v-show="status.pulldownStatus === 'down'" v-html="`${pulldownConfig.down||'下拉刷新'}`"></span>
        <span v-show="status.pulldownStatus === 'up'" v-html="`${pulldownConfig.up||'松开刷新'}`"></span>
        <span v-show="status.pulldownStatus === 'loading'" v-html="`${pulldownConfig.loading||'加载中...'}`"></span>
      </div>
    </scroller>
    <div ref="thMessageInput" class="inputbox" :class="{'textShow':textShow}" v-if="showInput!=false">
      <template v-if="!useText">
        <i class="icon-add" :class="{isopen:funcShow}" @click="openfunc"></i>
        <i v-if="showEmoticon" class="icon-face" :class="{isopen:faceShow}" @click="openface"></i>
        <input ref="thMessageInputF" class="messageinput" v-model="inputmodel" type="text" @focus="onfocus" @blur="onblur" />
        <x-button class="sendbtn" :type="inputmodel.trim()==''?'default':'primary'" :disabled="inputmodel.trim()==''" @click.native="changecount">
          发送
        </x-button>
      </template>
      <template v-if="useText">
        <div v-show="!textShow" class="usetext" :class="{'hide-emoticon':!showEmoticon}">
          <x-button class="textbtn" type="default" @click.native="showText">
            点击输入文字
          </x-button>
          <i class="icon-add" :class="{isopen:funcShow}" @click="openfunc"></i>
          <i v-if="showEmoticon" class="icon-face" :class="{isopen:faceShow}" @click="openface"></i>
        </div>
        <div v-show="textShow" class="usetexttitle">
          <span>{{textTitle}}</span>
          <span v-show="!textfocus" class="usetexthidebox" @click="hideBox">取消</span>
        </div>
      </template>
    </div>
    <facebox v-show="faceShow" ref="facebox" :facelist="facelist" @itemClick="faceItemClick"></facebox>
    <funcbox v-show="funcShow" :funclist="funclist"></funcbox>
    <textbox v-show="textShow" ref="textbox" @sendText="sendText" @textFocus="textFocus" @textBlur="textBlur"></textbox>
  </div>
</template>

<script>
// import "@/assets/sass/components/message.sass";
import doc from "@/assets/images/doc.png";
import people from "@/assets/images/people.png";
import quick from "@/assets/images/quick.png";
import camera from "@/assets/images/camera.png";
import gallery from "@/assets/images/gallery.png";

import { Scroller, XButton } from "vux";
import { facelist } from "@/assets/testdata.js";

import facebox from "./facebox.vue";
import funcbox from "./funcbox.vue";
import textbox from "./textbox.vue";

export default {
  name: "ThMessage",
  props: {
    useText: {
      type: Boolean,
      default: false
    },
    topPadding: {
      type: Number
    },
    messageData: {
      type: Array
    },
    funcList: {
      type: Array
    },
    bigBtn: {
      type: String,
      default: ""
    },
    showInput: {
      type: Boolean
    },
    selfFace: {
      type: String
    },
    otherFace: {
      type: String
    },
    usePulldown: {
      type: Boolean
    },
    pulldownConfig: {
      type: Object
    },
    showEmoticon: {
      type: Boolean,
      default: true
    },
    fromTop: {
      type: Boolean,
      default: false
    },
    textTitle: {
      type: String,
      default: '输入文字'
    }
  },
  components: {
    Scroller,
    XButton,
    facebox,
    funcbox,
    textbox
  },
  watch: {
    textfocus (e) {
      if (e) {
        this.canclose = false;
      }
    },
    messageData () {
      this.$nextTick(() => {
        if (
          this.status.pulldownStatus == "default" ||
          this.status.pulldownStatus == "down"
        ) {
          this.messageReset();
        } else {
          this.$refs.scrollerEvent.reset();
        }
      });
    },
    showInput (e) {
      if (!e) {
        this.defaultresize = 40;
        this.$nextTick(() => {
          this.hideBox();
        });
      }
    },
    funcList () {
      this.funclist = this.funclist.filter(e => {
        return this.funcList.indexOf(e.type) != -1;
      });
    }
  },
  data () {
    return {
      bottomheight: "-60",
      defaultresize: 100,
      boxheight: "0px",
      scrollTop: 0,
      screamHeight: 0,
      count: 20,
      top: 0,
      inputmodel: "",
      doc: doc,
      people: people,
      faceShow: false,
      facelist: facelist,
      funcShow: false,
      isFocus: false,
      textShow: false,
      textfocus: false,
      canclose: true,
      status: {
        pulldownStatus: "default"
      },
      funclist: [
        {
          type: "gallery",
          text: "照片",
          img: gallery,
          click: () => {
            console.log("调用照片组件");
            this.$emit("galleryCall");
          }
        },
        {
          type: "camera",
          text: "拍摄",
          img: camera,
          click: () => {
            console.log("调用拍摄组件");
            this.$emit("cameraCall");
          }
        },
        {
          type: "quick",
          text: "快捷回复",
          img: quick,
          click: () => {
            console.log("调用快捷回复组件");
            this.$emit("quickCall");
          }
        }
      ]
    };
  },
  mounted () {
    if (this.showInput == false) {
      this.defaultresize = 40;
    }
    let h =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.screamHeight = h;
    this.funclist = this.funclist.filter(e => {
      return this.funcList.indexOf(e.type) != -1;
    });
    window.onresize = () => {
      let h2 =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      this.screamHeight = h2;
      this.$refs.scrollerEvent.getStyles();
      this.messageReset();
    };
    this.$nextTick(() => {
      const imgs = document.querySelectorAll(".mtext>img");
      if (imgs.length == 0) {
        this.messageReset();
        if (this.fromTop)
          this.scrollToTop()
      } else {
        imgs.forEach(e => {
          e.addEventListener(
            "load",
            () => {
              this.messageReset()
              if (this.fromTop)
                this.scrollToTop()
            },
            false
          );
        });
      }
      setTimeout(() => {
        this.messageReset()
        if (this.fromTop)
          this.scrollToTop()
      }, 1000);
    });
  },
  methods: {
    scrollToTop () {
      this.$refs.scrollerEvent.reset({ top: 0 })
    },
    onfocus () {
      this.hideBox();
      const input = this.$refs.thMessageInput;
      setTimeout(() => {
        // input.UpdateLayout()
        const ua = navigator.userAgent,
          iOS11 = /OS 11_/.test(ua),
          micro = /MicroMessenger/.test(ua),
          safari = /Safari/.test(ua),
          wxwork = /wxwork/.test(ua);
        if (iOS11 && (micro || safari) && !wxwork) {
          return;
        }
        input.scrollIntoView();
        setTimeout(() => {
          input.scrollIntoView();
          this.isFocus = true;
        }, 300);
      }, 300);
    },
    onblur () {
      this.isFocus = false;
    },
    onscroll (p) {
      if (this.isFocus) {
        this.$refs.thMessageInputF.blur();
        this.hideBox();
      }
    },
    messageReset () {
      let mh =
        this.faceShow || this.funcShow || this.textShow
          ? 275
          : this.defaultresize;
      this.bottomheight = `-${mh - 40}`;
      if (this.$refs.scrollbox.clientHeight > this.screamHeight - mh) {
        this.$refs.scrollerEvent.reset({
          top: this.$refs.scrollbox.clientHeight - this.screamHeight + mh
        });
      }
    },
    changecount () {
      if (this.inputmodel.trim() != "") {
        let html = this.inputmodel;
        this.$nextTick(() => {
          this.messageReset();
          this.inputmodel = "";
          this.$emit("sendOut", html);
        });
      }
    },
    faceclick (d) {
      this.$emit("faceClick", d);
    },
    msgclick (d) {
      this.$emit("msgClick", d);
    },
    btnCall () {
      this.$emit("bigBtnCall");
    },
    openface () {
      this.funcShow = false;
      if (this.faceShow) {
        this.faceShow = false;
        this.messageReset();
      } else {
        this.faceShow = true;
        setTimeout(() => {
          this.messageReset();
          this.$nextTick(() => {
            this.$refs.facebox.$refs.faceScroll.reset({ top: 0 });
          });
        }, 300);
      }
    },
    faceItemClick (i) {
      this.inputmodel += `[${i}]`;
      if (this.useText) {
        this.changecount();
      }
    },
    openfunc () {
      this.faceShow = false;
      if (this.funcShow) {
        this.funcShow = false;
        this.messageReset();
      } else {
        this.funcShow = true;
        setTimeout(() => {
          this.messageReset();
        }, 300);
      }
    },
    showText () {
      this.faceShow = false;
      this.funcShow = false;
      this.textShow = true;
      this.messageReset();
    },
    sendText (value) {
      this.inputmodel = value;
      this.changecount();
    },
    hideBox () {
      this.funcShow = false;
      this.faceShow = false;
      this.textShow = false;
      this.messageReset();
    },
    pulldown () {
      this.$emit("pulldownCall");
    },
    resetpulldown () {
      this.status.pulldownStatus = "default";
    },
    textFocus () {
      this.messageReset();
      this.textfocus = true;
    },
    textBlur () {
      this.textfocus = false;
    }
  }
};
</script>
<style lang="less" scoped>
.th-message {
  position: relative;
}
.th-message .messagebox {
  width: 100%;
  background: #f6f8fc;
  padding: 20px;
}
.th-message .messagebox .th-pulldown {
  text-align: center;
  width: 100%;
  line-height: 60px;
  height: 60px;
  color: #888;
}
.th-message .messagebox .pbtn {
  margin-top: 50px;
  height: 50px;
}
.th-message .messagebox .message-item {
  width: 100%;
  position: relative;
  padding: 0px 50px;
  margin-bottom: 20px;
}
.th-message .messagebox .message-item .headimg {
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0px;
  top: 0px;
  border-radius: 50%;
  display: block;
}
.th-message .messagebox .message-item.isimg .mtext {
  background: none !important;
  padding: 0px;
}
.th-message .messagebox .message-item.isimg .mtext:before {
  display: none;
}
.th-message .messagebox .message-item.isimg .mtext img {
  margin: 0px;
  display: block;
  max-width: 150px;
  max-height: 150px;
}
.th-message .messagebox .message-item .mtext {
  padding: 10px 15px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  text-align: left;
  word-break: break-all;
  line-height: 30px;
}
.th-message .messagebox .message-item .mtext img {
  margin-top: -12px;
}
.th-message .messagebox .message-item.default-item .headimg {
  display: none;
}
.th-message .messagebox .message-item.default-item .mtext {
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  color: #888;
  line-height: 25px;
}
.th-message .messagebox .message-item.msg-item .headimg {
  display: none;
}
.th-message .messagebox .message-item.msg-item .mtext {
  padding: 10px 15px;
  background: #fff;
  font-size: 14px;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  color: #888;
  line-height: 25px;
}
.th-message .messagebox .message-item.people-item {
  text-align: right;
  padding-right: 60px;
  padding-top: 5px;
}
.th-message .messagebox .message-item.people-item .headimg {
  right: 0px;
  left: auto;
}
.th-message .messagebox .message-item.people-item .mtext {
  color: #fff;
  background: #4a93ec;
}
.th-message .messagebox .message-item.people-item .mtext:before {
  content: "";
  // background: url("../../images/peopleBubble.png") top right no-repeat;
  position: absolute;
  width: 10px;
  right: -10px;
  height: 50px;
  top: 0px;
}
.th-message .messagebox .message-item.doc-item {
  padding-left: 60px;
  padding-top: 5px;
}
.th-message .messagebox .message-item.doc-item .mtext {
  background: #fff;
  color: #666;
}
.th-message .messagebox .message-item.doc-item .mtext:before {
  content: "";
  // background: url("../../images/docBubble.png") 0px -15px no-repeat;
  position: absolute;
  width: 10px;
  left: -10px;
  height: 50px;
  top: 0px;
}
.th-message .inputbox {
  height: 60px;
  width: 100%;
  padding: 10px 80px 10px 45px;
  border: #dfdfdf solid 1px;
  position: relative;
}
.th-message .inputbox.textShow {
  padding: 3px 80px 3px 45px;
  height: 46px;
}
.th-message .inputbox .usetexttitle {
  font-size: 16px;
  height: 38px;
  line-height: 38px;
  text-align: center;
  margin-right: -35px;
}
.th-message .inputbox .usetexthidebox {
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 14px;
  color: #666666;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
}
.th-message .inputbox .usetexthidebox:active {
  color: #4a93ec;
}
.th-message .inputbox .usetext {
  margin-left: -35px;
  height: 38px;
}
.th-message .inputbox .usetext.hide-emoticon {
  margin-right: -35px;
}
.th-message .inputbox .usetext.hide-emoticon .icon-add {
  right: 10px;
}
.th-message .inputbox .usetext .textbtn {
  height: 38px;
  line-height: 38px;
  color: #888;
  font-size: 16px;
}
.th-message .inputbox .usetext .icon-add {
  left: auto;
  right: 42px;
}
.th-message .inputbox .usetext .icon-face {
  right: 10px;
  font-size: 27px;
}
.th-message .inputbox .icon-add {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  font-size: 25px;
  color: #666666;
}
.th-message .inputbox .icon-face {
  position: absolute;
  right: 90px;
  top: 50%;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  font-size: 25px;
  color: #666666;
  z-index: 1;
}
.th-message .inputbox [class^=icon-].isopen:before {
  color: #4a93ec;
  content: "";
  display: inline-block;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}
.th-message .inputbox .messageinput {
  height: 40px;
  width: 100%;
  background: #efefef;
  box-shadow: none;
  border: none;
  border-radius: 5px;
  padding: 10px;
  line-height: 20px;
  outline: none;
  font-size: 14px;
  padding-right: 40px;
}
.th-message .inputbox .sendbtn {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 60px;
  height: 40px;
  font-size: 14px;
}
.th-message .textbox {
  padding: 0px;
  height: 175px;
}
.th-message .textbox .btnbox {
  padding: 10px;
}
.th-message .textbox .btnbox .textbtn {
  height: 40px;
  line-height: 40px;
}
.th-message .textbox textarea {
  box-sizing: border-box;
  resize: none;
  box-shadow: none;
  border: none;
  width: 100%;
  height: 122px;
  border-radius: 5px;
  outline: none;
  padding: 12px 15px;
  font-size: 16px;
  line-height: 20px;
  margin: 0px;
}
.th-message .facebox {
  display: flex;
  padding: 10px;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.th-message .facebox .faceitem {
  display: block;
  margin: 5px;
}
.th-message .facebox .vux-emotion {
  width: 24px;
  height: 24px;
}
.th-message .funcbox {
  height: 175px;
  background: #FAFAFA;
  padding: 15px;
  width: 100%;
  overflow: hidden;
}
.th-message .funcbox .funcimg {
  display: block;
  margin: 0px auto;
  width: 42px;
  margin-bottom: 5px;
}
.th-message .funcbox .funclist {
  width: 25%;
  text-align: center;
  float: left;
  height: 70px;
  font-size: 10px;
  color: #666;
  margin-bottom: 10px;
}
</style>
