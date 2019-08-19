<template>
  <div class="container">
    <navBar :search="true" />
    <div class="main">
      <div class="banner">
        <img src="http://lorempixel.com/375/87/" />
      </div>
      <van-tabs
        class="title-tabs"
        v-model="activeType"
        :color="$store.state.color"
        :title-active-color="$store.state.color"
        animated
        @click="onLoad(true)"
        slot="title"
      >
        <van-tab title="最新动态" :name="1"></van-tab>
        <van-tab title="精品动态" :name="2"></van-tab>
        <van-tab title="热门动态" :name="3"></van-tab>
        <van-tab title="官方动态" :name="4"></van-tab>
      </van-tabs>
      <van-pull-refresh v-model="refreshLoading" @refresh="onLoad(true)">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="dynamic-list">
            <dynamicItem
              @click.native="$router.push('/dynamicDetail/'+item.inforid)"
              :info="item"
              v-for="item,index in list"
              :key="index"
            >
              <template slot="title-right">
                <div class="tags">
                  <van-icon class-prefix="icon" name="jing" color="#FFD948" />
                  <van-icon class-prefix="icon" name="hot" color="#FFD948" />
                </div>
              </template>
              <template slot="operation">
                <operation
                  class="operation"
                  :id="item.inforid"
                  :forward="item.shardeCount"
                  :comment="item.replyCount"
                  :zan="item.likeCount"
                  :iszan="item.likeStatue"
                />
              </template>
            </dynamicItem>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import dynamicItem from "@/components/dynamic/dynamicItem.vue";
import operation from "@/components/operation/operation.vue";
export default {
  name: "square",
  components: {
    navBar,
    operation,
    dynamicItem
  },
  data() {
    return {
      activeType: 1,
      list: [],
      refreshLoading: false,
      loading: false,
      finished: false,
      pageNum: 1,
      pageSize: 20,
      hasNextPage: true
    };
  },
  created(){
    if(this.$route.params.type){
      this.activeType = Number(this.$route.params.type)
    }
  },
  methods: {
    onLoad(isClear) {
      this.$SERVER
        .getDynamicInformation({
          userid: this.$store.state.userInfo.userid,
          range: 0,
          type: this.activeType,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          this.pageNum = res.data.nextPage;
          this.hasNextPage = res.data.hasNextPage;
          this.finished = !res.data.hasNextPage;
          if (isClear) {
            this.list = res.data.list;
            this.refreshLoading = false;
          } else {
            this.list = [...this.list, ...res.data.list];
            this.listLoading = false;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  margin-top: 10px;
  img {
    width: 100%;
    height: auto;
  }
}
.title-tabs {
  margin-bottom: 15px;
}
</style>