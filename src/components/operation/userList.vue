<template>
  <div class="user-list" :style="'padding-top:'+top+'px'">
    <van-nav-bar title="好友列表" left-arrow @click-left="selectUser({})" />
    <van-field v-model="nickName" right-icon="search" @input="onSearch" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell
        size="large"
        v-for="(item,index) in list"
        :key="index"
        title-class="cell"
        @click="selectUser(item)"
      >
        <template slot="title">
          <van-image fit="cover" :src="item.image" class="avatar" />
          {{item.nickName}}
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      top:"",
      type: 0,
      nickName: "",
      list: [],
      finished: false,
      loading: false,
      pageSize: 20,
      pageNum: 1,
      hasNextPage: true
    };
  },  
  mounted() {
    var systemType = this.$store.state.systemType;
    if (systemType == "android") {
      this.top = 25;
    }
    if (systemType == "ios") {
      this.top = 40;
      this.searchEmptyShow = true;
    }
  },
  methods: {
    onLoad() {
      var that = this;
      if (that.type == 0) {
        that.$SERVER
          .getFansAndAttList({
            loginUserId: that.$store.state.userInfo.userid,
            pageSize: that.pageSize,
            pageNum: that.pageNum,
            queryType: 1
          })
          .then(res => {
            that.pageNum = res.data.nextPage;
            that.hasNextPage = res.data.hasNextPage;
            that.finished = !res.data.hasNextPage;
            that.list = [...that.list, ...res.data.list];
            that.loading = false;
          });
      } else {
        that.$SERVER
          .search({
            searchType: 1,
            username: that.nickName,
            pageSize: that.pageSize,
            pageNum: that.pageNum
          })
          .then(res => {
            that.pageNum = res.data.nextPage;
            that.hasNextPage = res.data.hasNextPage;
            that.finished = !res.data.hasNextPage;
            that.list = [...that.list, ...res.data.list];
            that.loading = false;
          });
      }
    },
    onSearch() {
      var that = this;
      if(that.nickName==""){
         that.type = 0; 
      }else{
        that.type = 1;
      }
      that.pageNum = 1;
      that.list = [];
      that.finished = false;
    },
    selectUser(item) {
      this.$emit("selectUser", item);
    }
  }
};
</script>

<style lang="less" scoped>
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
