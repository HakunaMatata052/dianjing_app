<template>
  <div class="comment-box">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad(pid,type)">
      <div class="item" v-for="item,index in list" :key="index">
        <div class="avatar" @click.stop="$router.push(`/accompanyDetail/${item.userid}`)">
          <img :src="item.fromUser.image" />
        </div>
        <div class="con">
          <div class="username">{{item.fromUser.nickname}}</div>
          <p>{{item.message}}</p>
          <div class="sub-comment" v-if="item.replyCount!=0">
            <div
              class="sub-item"
              v-for="itemSub,index2 in item.sub"
              :key="index2"
              @click="commentFn(index,item.fromUser,true)"
            >
              <div class="avatar" @click.stop="$router.push(`/accompanyDetail/${item.userid}`)">
                <img :src="itemSub.fromUser.image" />
              </div>
              <div class="sub-con">
                <div class="username">{{itemSub.fromUser.nickname}}</div>
                <p>
                  {{itemSub.message}}
                  <span>{{$METHOD.timeSwitchString(itemSub.createtime)}}</span>
                </p>
              </div>
            </div>
            <div class="more" @click="onLoadSub(index)" v-if="!(item.sub.length == item.replyCount)">
              展开更多回复
              <van-icon name="arrow-down" color="rgba(255,217,72,1)" class="ico" />
            </div>
          </div>
          <div class="comment-bottom">
            <span>{{$METHOD.timeSwitchString(item.createtime)}}</span>
            <operation
              class="operation"
              :id="item.id"
              :comment="item.replyCount"
              :zan="item.likecount"
              :iszan="item.likestatue"
              @commentFn="commentFn(index,item.fromUser)"
            />
          </div>
        </div>
      </div>
    </van-list>

    <van-popup
      v-model="popupShow"
      position="top"
      :style="{ height: 0}"
      get-container="body"
      @close="closeOverlay"
      overlay-class="overlay"
    />
  </div>
</template>

<script>
import operation from "@/components/operation/operation.vue";
export default {
  components: {
    operation
  },
  props:{
    pid:{
      type: String,
    },    
    type:{
      type: Number,
    }
  },
  data() {
    return {
      list: [],
      finished: false,
      loading: false,
      pageSize: 20,
      pageNum: 1,
      hasNextPage: true,
      UIChatBox: null,
      popupShow: false
    };
  },
  methods: {
    onLoad(pid, type) {
      if(!pid){
        return
      }
      let that = this;
      that.$SERVER
        .getEvaluates({
          pid: pid,
          type: type,
          pageNum: that.pageNum,
          pageSize: that.pageSize
        })
        .then(res => {
          that.pageNum = res.data.nextPage;
          that.hasNextPage = res.data.hasNextPage;
          that.finished = !res.data.hasNextPage;
          that.list = [...that.list, ...res.data.list];
          that.loading = false;
        });
    },
    onLoadSub(index) {
      let that = this;
      that.$SERVER
        .getEvaluateDetail({
          msgId: that.list[index].id,
          type: that.type,
          pageNum: that.list[index].pageNum || 1,
          pageSize: 2
        })
        .then(res => {
          that.list[index].pageNum = res.data.nextPage
          that.list[index].sub = [...that.list[index].sub, ...res.data.list];
        });
    },
    // 子评论
    commentFn(index, placeholder, u) {
      var that = this;
      that.popupShow = true;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        that.UIChatBox = api.require("UIChatBox");
        that.UIChatBox.close();
        that.UIChatBox.open(
          {
            placeholder: '@'+placeholder.nickname,
            autoFocus: true,
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
                let msg = ret.msg;
                if (u) {
                  msg = ret.msg + ' //@'+ placeholder.nickname;
                }
                that.$SERVER
                  .addEvaluate({
                    msgId: that.list[index].id,
                    type: that.type,
                    message: msg,
                    fromUserId: that.$store.state.userInfo.userid
                  })
                  .then(res => {
                    that.list[index].replyCount++;
                    that.list[index].sub.unshift({
                      createtime: new Date().getTime(),
                      fromUser: {
                        image: that.$store.state.userInfo.image,
                        nickname: that.$store.state.userInfo.nickname,
                        userid: that.$store.state.userInfo.userid
                      },
                      message: msg
                    });
                    that.$set(that.list, index, that.list[index]);
                    that.$toast.success("评论成功！");
                  });
                that.closeOverlay();
              }
            }
          }
        );
      }
    },
    addCommentView(msg) {
      var that = this;
      that.list.unshift({
        createtime: new Date().getTime(),
        fromUser: {
          image: that.$store.state.userInfo.image,
          nickname: that.$store.state.userInfo.nickname,
          userid: that.$store.state.userInfo.userid
        },
        message: msg,
        replyCount: 0,
        sub: []
      });
      that.$set(that.list, index, that.list[index]);
    },
    closeOverlay() {
      if (window.navigator.userAgent.match(/APICloud/i)) {
        this.UIChatBox.close();
      }
      this.popupShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.comment-box {
  border-top: 1px solid rgba(230, 230, 230, 1);
  padding: 15px;
  .item {
    display: flex;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(245, 245, 245, 1);
    .avatar {
      flex-shrink: 0;
      margin-right: 10px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .con {
      flex-grow: 1;
      flex-shrink: 1;
      .username {
        font-size: 14px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      p {
        font-size: 13px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 18px;
        padding: 8px 0;
        box-sizing: border-box;
        margin-bottom: 5px;
      }
      .comment-bottom {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        .operation {
          width: 30%;
        }
      }
    }
    .more {
      color: rgba(255, 217, 72, 1);
      font-size: 13px;
      margin-bottom: 10px;
      .ico {
        margin-left: 10px;
      }
    }
    .sub-item {
      display: flex;
      margin-bottom: 5px;
      p {
        padding: 5px 0;
        span {
          font-size: 11px;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
}
</style>