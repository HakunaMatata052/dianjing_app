<template>
  <div class="container" id="videos">
    <navBar :goback="false" :search="true" />
    <van-tabs
      class="title-tabs"
      v-model="activeType"
      :color="$store.state.color"
      :title-active-color="$store.state.color"
      animated
      @click="getList(true)"
    >
      <van-tab title="推荐" :name="1"></van-tab>
      <van-tab title="附近" :name="2"></van-tab>
      <van-tab title="关注" :name="3"></van-tab>
      <van-tab title="我的" :name="4"></van-tab>
    </van-tabs>
    <div class="main" ref="main">
      <van-pull-refresh v-model="refreshLoading" @refresh="getList(true)">
        <van-list v-model="listLoading" :finished="finished" finished-text="没有更多了" @load="getList">
          <div class="video-list">
            <div
              class="video-item"
              v-for="(item,index) in videoList"
              :key="index"
              @click="$router.push('/videoDetail/'+item.videoid)"
            >
              <van-image fit="cover" :src="item.frontcover" class="video-img" />
              <div class="info">
                <h3>{{item.comment}}</h3>
                <div class="user">
                  <van-image
                    fit="cover"
                    :src="item.frontcover"
                    class="avatar"
                    @click.stop="$router.push(`/accompanyDetail/${item.userid}`)"
                  />
                  <div class="user-info">
                    <div class="username">
                      {{item.nickname}}
                      <gander :gander="item.sex" :age="item.age" />
                    </div>
                    <div class="distance">距离我{{item.distance}}KM</div>
                  </div>
                </div>
                <operation
                  class="operation"
                  :id="item.videoid"
                  :comment="item.replyCount"
                  :zan="item.likeCount"
                  :iszan="item.likeStatue"
                />
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import gander from "@/components/user/gander.vue";
import operation from "@/components/operation/operation.vue";
export default {
  name: "videos",
  components: {
    navBar,
    gander,
    operation
  },
  data() {
    return {
      activeType: 1,
      refreshLoading: false,
      finished: false,
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      hasNextPage: true,
      videoList: [],
      container: null
    };
  },
  watch: {
    $route() {
      if (this.$route.name == "videos") {
        this.getList(true);
      }
    }
  },
  created() {
    if (this.$route.params.type) {
      this.activeType = Number(this.$route.params.type);
    }
  },
  mounted() {
    this.container = this.$refs.main;
  },
  methods: {
    getList(isClear) {
      var that = this;
      if (this.activeType == 3 || this.activeType == 4) {
        if (!this.$METHOD.getStore("token")) {
          this.$toast.fail("请先登录！");
          this.$router.push("/login");
          return;
        }
      }
      if (isClear) {
        that.pageNum = 1;
        that.hasNextPage = true;
      }
      that.$SERVER
        .getVideoList({
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          type: that.activeType,
          ...that.$store.state.position,
          userId: that.$store.state.userInfo.userid || null
        })
        .then(res => {
          that.pageNum = res.data.nextPage;
          that.hasNextPage = res.data.hasNextPage;
          that.finished = !res.data.hasNextPage;
          if (isClear) {
            that.videoList = res.data.list;
            that.refreshLoading = false;
          } else {
            that.videoList = [...that.videoList, ...res.data.list];
            that.listLoading = false;
          }
        });
    }
  }
  // activated(){
  //   this.getList(true)
  // }
};
</script>

<style lang="less" scoped>
.video-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 9px;
  .video-item {
    width: 175px;
    background: rgba(255, 255, 255, 1);
    border-radius: 7px 7px 0px 0px;
    overflow: hidden;
    margin-bottom: 7px;
    display: flex;
    flex-direction: column;
    .video-img {
      width: 175px;
      height: 170px;
      flex-grow: 1;
    }
    .info {
      padding: 0 10px 10px;
      h3 {
        font-size: 13px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        padding: 13px 0;
      }
      .user {
        display: flex;
        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .user-info {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          padding-left: 7px;
          .username {
            font-size: 13px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }
          .distance {
            font-size: 10px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
      }
      .operation {
        margin-top: 10px;
        padding: 10px 10px 0;
        border-top: 1px solid rgba(242, 242, 242, 1);
      }
    }
  }
}
</style>

