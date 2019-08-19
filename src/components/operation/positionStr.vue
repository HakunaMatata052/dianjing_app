<template>
  <div class="user-list" :style="'padding-top:'+top+'px'">
    <van-nav-bar title="位置列表" left-arrow @click-left="selectPosition({})" />
    <van-cell
      size="large"
      v-for="(item,index) in list"
      :key="index"
      title-class="cell"
      :title="item.name"
      @click="selectPosition(item)"
    ></van-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {
      top: "",
      list: []
    };
  },
  created() {
    this.onLoad();
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
      if (window.navigator.userAgent.match(/APICloud/i)) {
        api.ajax(
          {
            url: "http://api.map.baidu.com/reverse_geocoding/v3/",
            method: "get",
            data: {
              values: {
                ak: "r0GPTlafEf4gbOZAENRPNTb0b8OfzXGK",
                output: "json",
                coordtype: "bd09ll",
                extensions_poi: "1",
                location: that.$store.state.position.lat + "," + that.$store.state.position.lng
              }
            }
          },
          function(data) {
            if (data) {
              if (data.status == 0) {
                console.log(data);
                that.list = data.result.pois
              }
            }
          }
        );
      }
    },
    selectPosition(item) {
      this.$emit("selectPosition", item);
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
