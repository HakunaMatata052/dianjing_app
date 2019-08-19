<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-swipe-cell v-for="item,index in list" :key="index">
        <van-cell :border="false" :title="item.title" size="large" :to="'/chat/'+item.uid">
          <template slot="icon">
            <img :src="item.imgPath" class="avatar" />
          </template>
           <template>
               <!-- <span>{{$METHOD.format(item.remark,'MM-dd hh:mm')}}</span> -->
               {{item.subTitle}}   <van-tag round type="danger" v-if="item.unreadmessages>0">{{item.unreadmessages}}</van-tag>
           </template>
        </van-cell>

        <template slot="right">
          <van-button square type="danger" text="删除" @click="deleteFn(item.uid,index)"/>
        </template>
      </van-swipe-cell>
    </div>
    <rongyun />
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import rongyun from "@/components/rongyun.vue";
import messageUtil from "@/common/js/messageUtil.js";
export default {
  name: "messageList",
  components: {
    navBar,
    rongyun
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.initmessage();
  },
  methods: {
    initmessage() {
      var that = this;
      var messageList = messageUtil.showMessageLists(
        that.$store.state.userInfo.userid
      );
      var UIListViewData = [];
      if (messageList.length > 0) {
        messageList.forEach(n => {
          if (n.content.indexOf("img") >= 0) {
            n.content = "[表情]";
          } else if (n.content.length > 10) {
            n.content = n.content.substring(0, 10) + "...";
          }
          UIListViewData.push({
            uid: n.frienduserid,
            imgPath: n.avatar,
            title: n.nickname,
            unreadmessages: n.unreadmessages,
            subTitle: n.content,
            remark: n.sendtime
          });
        });
        console.log(UIListViewData)
        that.list = UIListViewData;

        // var UIListView = api.require("UIListView");
        // UIListView.open(
        //   {
        //     rect: {
        //       x: 5,
        //       y: $api.dom(".roofS").offsetHeight,
        //       w: api.winWidth - 10,
        //       h: api.frameHeight
        //     },
        //     data: UIListViewData,
        //     styles: {
        //       borderColor: "#e3e2e6",
        //       item: {
        //         bgColor: "#fff",
        //         activeBgColor: "#F5F5F5",
        //         height: 55,
        //         imgWidth: 45,
        //         imgHeight: 45,
        //         imgCorner: 4,
        //         placeholderImg: "",
        //         titleSize: 12,
        //         titleColor: "#000",
        //         subTitleSize: 12,
        //         subTitleColor: "#000",
        //         remarkColor: "#000",
        //         remarkSize: 16,
        //         remarkIconWidth: 30
        //       }
        //     },
        //     rightBtns: [
        //       {
        //         bgColor: "#ff0000",
        //         activeBgColor: "",
        //         width: 70,
        //         title: "删除",
        //         titleSize: 12,
        //         titleColor: "#fff",
        //         icon: "",
        //         iconWidth: 20
        //       }
        //     ]
        //   },
        //   function(ret, err) {
        //     if (ret) {
        //       if (ret.eventType == "clickRightBtn") {
        //         //删除
        //         UIListView.getDataByIndex(
        //           {
        //             index: ret.index
        //           },
        //           function(indexret, indexerr) {
        //             if (indexret) {
        //               //删除列表
        //               UIListView.deleteItem(
        //                 {
        //                   index: ret.index
        //                 },
        //                 function(itemret, itemerr) {
        //                   if (itemret.status) {
        //                     //删除本地全部信息
        //                     var msg = new messageUtil();
        //                     msg.deletefriendMessages(indexret.data.uid);
        //                   }
        //                 }
        //               );
        //             }
        //           }
        //         );
        //       } else if (ret.eventType == "clickContent") {
        //         //点击事件
        //         UIListView.getDataByIndex(
        //           {
        //             index: ret.index
        //           },
        //           function(indexret, indexerr) {
        //             if (indexret) {
        //               //跳转到聊天界面
        //               api.openWin({
        //                 name: "onetoone",
        //                 url: "./onetoone.html",
        //                 bgColor: "rgba(255, 255, 255, 0)",
        //                 animation: {
        //                   type: "push", //动画类型（详见动画类型常量）
        //                   subType: "from_right", //动画子类型（详见动画子类型常量）
        //                   duration: 300 //动画过渡时间，默认300毫秒
        //                 },
        //                 pageParam: {
        //                   touserid: indexret.data.uid,
        //                   tousername: indexret.data.title
        //                 }
        //               });
        //             }
        //           }
        //         );
        //       }
        //     }
        //   }
        // );
      } else {
        // $(".mui-content")
        //   .append
        //     '<div id="no-conent"><img src="../../images/no-messagecontent.png"/></div>'
        //   ();
      }
    },
    deleteFn(id,index){
        messageUtil.deletefriendMessages(id);
        this.list.splice(index,1)
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>