<template>
  <div class="container" id="fans-list">
    <navBar title>
      <van-tabs
        class="title-tabs"
        v-model="activeType"
        :color="$store.state.color"
        :title-active-color="$store.state.color"
        animated
        @click="getList(true)"
        slot="title"
      >
        <van-tab title="关注" :name="1"></van-tab>
        <van-tab title="粉丝" :name="2"></van-tab>
      </van-tabs>
    </navBar>
    <div class="main">
      <van-search placeholder="请输入搜索关键词" v-model="value" />
      <van-pull-refresh v-model="refreshLoading" @refresh="getList(true)">
        <div class="list">
          <van-skeleton title avatar-size="48px" avatar :row="1" :loading="skeletonLoading">
          </van-skeleton>
            <van-list
              v-model="listLoading"
              :finished="finished"
              finished-text="没有更多了"
              @load="getList"
            >
              <div
                class="fans-item"
                v-for="(item,index) in list"
                :key="index"
                @click="$router.push(`/accompanyDetail/${item.userId}`)"
              >
                <van-image fit="cover" :src="item.image" class="avatar" />
                <div class="info">
                  <h3>{{item.nickName}}</h3>
                  <p>{{item.signName}}</p>
                </div>
                <div
                  class="operation"
                  v-if="item.fanStatue == 1 && $route.params.userid == $store.state.userInfo.userid"
                  @click.stop="fansFn(index,2)"
                >
                  <van-icon class-prefix="icon" name="dui" size="16px" />已关注
                </div>
                <div
                  class="operation"
                  v-if="item.fanStatue == 2 && $route.params.userid == $store.state.userInfo.userid"
                  @click.stop="fansFn(index,2)"
                >
                  <van-icon class-prefix="icon" name="huxiangguanzhu" size="16px" />互相关注
                </div>
                <div
                  class="operation"
                  v-if="item.fanStatue == 0 && $route.params.userid == $store.state.userInfo.userid"
                  @click.stop="fansFn(index,1)"
                >
                  <van-icon name="plus" size="16px" />添加关注
                </div>
              </div>
            </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "fansList",
  components: {
    navBar
  },
  data() {
    return {
      activeType: Number(this.$route.params.type),
      value: "",
      pageNum: 1,
      pageSize: 20,
      hasNextPage: true,
      listLoading: false,
      finished: false,
      refreshLoading: false,
      skeletonLoading: true,
      list: []
    };
  },
  methods: {
    getList(isClear) {
      var that = this;
      if (isClear) {
        that.pageNum = 1;
        that.hasNextPage = true;
      }
      if (!that.hasNextPage) {
        that.refreshLoading = false;
        that.listLoading = false;
        that.finished = true;
        return;
      }
      that.$SERVER
        .getFansAndAttList({
          loginUserId: that.$route.params.userid,
          pageSize: that.pageSize,
          pageNum: that.pageNum,
          queryType: that.activeType
        })
        .then(res => {
          that.pageNum = res.data.nextPage;
          that.hasNextPage = res.data.hasNextPage;
          that.finished = !res.data.hasNextPage;
          that.skeletonLoading = false;
          if (isClear) {
            that.list = res.data.list;
            that.refreshLoading = false;
          } else {
            that.list = [...that.list, ...res.data.list];
            that.listLoading = false;
          }
        });
    },
    fansFn(index, type) {
      var that = this;
      that.$SERVER
        .fans({
          toUserId: that.list[index].userId,
          loginUserId: that.$route.params.userid,
          type: type
        })
        .then(res => {
          that.list[index].fanStatue = res.data;
        });
    },
    goAccompany(id, e) {
      if (e) e.preventDefault();
      this.$router.push(`/accompanyDetail/${id}`);
      return;
    }
  }
};
</script>
<style lang="less" scoped>
.list{
    background: #fff;
}
.fans-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(242, 242, 242, 1);
  background: #fff;
  .avatar {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;
    margin: 12px;
  }
  .info {
    flex-grow: 1;
    overflow: hidden;
    h3 {
      font-size: 14px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    p {
      font-size: 12px;
      line-height: 30px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .operation {
    flex-shrink: 0;
    margin: 12px;
    width: 90px;
    height: 30px;
    border: 1px solid rgba(204, 204, 204, 0.91);
    border-radius: 15px;
    font-size: 13px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

