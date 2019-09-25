<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-skeleton title avatar :row="3" :loading="loading">
        <dynamicItem :info="info">
          <template slot="title-right">
            <follow :toUserid="info.userInfo.userid" />
          </template>
        </dynamicItem>
        <van-tabs v-model="activeTab" :color="$store.state.color" sticky animated swipeable>
          <van-tab :name="1">
            <div class="tab-item" slot="title">
              <van-icon
                class-prefix="icon"
                name="pinglun"
                color="rgba(153,153,153,1)"
                class="icon"
                size="23"
              />
              <span>{{info.replyCount}}</span>
            </div>
            <comment ref="comment" :pid="info.inforid" :type="2" />
          </van-tab>
          <van-tab :name:="2">
            <div class="tab-item" slot="title">
              <van-icon name="like" :color="$store.state.color" size="23" v-if="info.likeStatue" />
              <van-icon name="like-o" color="rgba(153,153,153,1)" size="23" v-else />
              <span>{{info.likeCount}}</span>
            </div>
            <van-list v-model="listLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div class="user-list">
                <van-cell
                  size="large"
                  v-for="(item,index) in list"
                  :key="index"
                  title-class="cell"
                  @click="$router.push(`/accompanyDetail/${item.userid}`)"
                >
                  <template slot="title">
                    <van-image fit="cover" :src="item.image" class="avatar" />
                    {{item.nickname}}
                  </template>
                </van-cell>
              </div>
            </van-list>
          </van-tab>
        </van-tabs>
      </van-skeleton>
    </div>
    <div class="bottom">
      <operation
        class="operation"
        :id="info.inforid"
        :forward="0"
        :comment="0"
        :zan="0"
        :iszan="info.likeStatue"
        :size="23"
        @zanFn="zanFn"
        @commentFn="commentFn"
      />
      <div class="footer-empty" :style="'padding-top:'+bottom+'px'"></div>
    </div>

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
import navBar from "@/components/navbar/navbar.vue";
import dynamicItem from "@/components/dynamic/dynamicItem.vue";
import comment from "@/components/operation/comment.vue";
import follow from "@/components/operation/follow.vue";
import operation from "@/components/operation/operation.vue";
export default {
  name: "dynamicDetail",
  data() {
    return {
      info: {
        userInfo: ""
      },
      loading: true,
      activeTab: 1,
      bottom: 0,
      popupShow: false,
      UIChatBox: null,
      list: [],
      finished: false,
      listLoading: false,
      pageSize: 20,
      pageNum: 1,
      hasNextPage: true
    };
  },
  components: {
    navBar,
    dynamicItem,
    comment,
    operation,
    follow
  },
  created() {
    this.$SERVER
      .getDynamicDetail({
        userId: this.$store.state.userInfo.userid,
        inforId: this.$route.params.id
      })
      .then(res => {
        this.info = res.data;
        this.loading = false;
      });
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.bottom = api.safeArea.bottom;
    }
  },
  beforeDestroy: function() {
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.UIChatBox.close();
    }
  },
  methods: {
    zanFn(val) {
      console.log(val);
      this.info.likeStatue = !this.info.likeStatue;
      this.info.likeCount = val;
      this.onLoad(true);
    },
    commentFn() {
      var that = this;
      that.popupShow = true;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        that.UIChatBox = api.require("UIChatBox");
        that.UIChatBox.close();
        that.UIChatBox.open(
          {
            placeholder: "说点什么吧！",
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
                that.$SERVER
                  .addEvaluate({
                    msgId: that.info.inforid,
                    type: 2,
                    message: msg,
                    fromUserId: that.$store.state.userInfo.userid
                  })
                  .then(res => {
                    that.$toast.success("评论成功！");
                    that.info.replyCount++;
                    that.$refs.comment.addCommentView(ret.msg);
                  });
                that.closeOverlay();
              }
            }
          }
        );
      }
    },

    onLoad(isClear) {
      var that = this;
      if (isClear) {
        this.pageNum = 1;
        this.hasNextPage = true;
      }
      if (!this.hasNextPage) {
        this.listLoading = false;
        this.finished = true;
        return;
      }

      that.$SERVER
        .getAgreeUserList({
          pid: that.info.inforid,
          pageSize: that.pageSize,
          pageNum: that.pageNum
        })
        .then(res => {
          this.pageNum = res.data.nextPage;
          this.hasNextPage = res.data.hasNextPage;
          this.finished = !res.data.hasNextPage;
          if (isClear) {
            this.list = res.data.list;
          } else {
            this.list = [...this.list, ...res.data.list];
            this.listLoading = false;
          }
        });
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
.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    margin: 0 10px;
  }
}
.bottom {
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  background: #fff;
  box-sizing: border-box;
  padding: 10px 10%;
}

.user-list {
  height: 100%;
  background: #fff;
  .cell {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 10px;
  }
}
</style>