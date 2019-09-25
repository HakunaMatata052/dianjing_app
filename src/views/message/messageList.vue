<template>
  <div class="container">
    <navBar />
    <div :class="list.length==0 ? 'main notfind':'main'">
      <van-swipe-cell v-for="item,index in list" :key="index">
        <van-cell :border="false" :title="item.title" size="large" :to="'/chat/'+item.uid" class="cell">
          <template slot="icon">
            <img :src="item.imgPath" class="avatar" />
          </template>
           <template>
               <!-- <span>{{$METHOD.format(item.remark,'MM-dd hh:mm')}}</span> -->
               {{item.subTitle}}   <van-tag round type="danger" v-if="item.unreadmessages>0">{{item.unreadmessages}}</van-tag>
           </template>
        </van-cell>

        <template slot="right" class="right">
          <van-button square type="danger" text="删除" @click="deleteFn(item.uid,index)"/>
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import messageUtil from "@/common/js/messageUtil.js";
export default {
  name: "messageList",
  components: {
    navBar,
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    this.initmessage();
  },
  computed:{
    updateMessage(){
      return this.$store.state.newMessage
    }
  },
  watch:{
    updateMessage(){
      this.initmessage();
    }
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
        that.list = UIListViewData;
      }
    },
    deleteFn(id,index){
        messageUtil.deletefriendMessages(id);
        this.list.splice(index,1)
    },
  }
};
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
.cell {
  display: flex;
  align-items: center;
}
.right {
  display: flex;
}
</style>