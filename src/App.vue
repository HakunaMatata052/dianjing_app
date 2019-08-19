<template>
  <div id="app">
    <!-- 全局组件 -->
    <transition :name="transitionName">
      <keep-alive :max="10" :include="keepAlive">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <rongyun ref="rongyun" />
  </div>
</template>
<script>
import router from "./router/router.js";
import messageUtil from "@/common/js/messageUtil.js";
import rongyun from "@/components/rongyun.vue";
export default {
  name: "App",
  components: {
    rongyun
  },
  data() {
    return {
      transitionName: "",
      keepAlive: []
    };
  },
  created() {
    var that = this;
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes);
    // 记录路由,动态给定动画
    this.$navigation.on("forward", to => {
      this.transitionName = to.route.meta.isTransition ? "slide-left" : "";
    });
    this.$navigation.on("back", (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "";
      }
    });
    if (window.navigator.userAgent.match(/APICloud/i)) {
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(255,255,255,0)"
      });
      that.$store.state.systemType = api.systemType;
      
    this.allEvent();
    }
    this.setVux();
    this.getBanners();
    this.getGames();
    this.getLocation();
    this.openUpdate();
    this.db();
  },
  mounted() {
    // console.log(this.keepAlive); // 设置缓存匹配
    if (window.navigator.userAgent.match(/APICloud/i)) {
      this.$refs.rongyun.initRongyun(); //初始化融云
    }
  },
  methods: {
    allEvent() {
      var that = this;
      // 点击消息状态栏跳转
      api.addEventListener(
        {
          name: "swiperight"
        },
        function(ret, err) {
          if (
            that.$route.name == "home" ||
            that.$route.name == "video" ||
            that.$route.name == "game" ||
            that.$route.name == "mine"
          ) {
          } else {
            that.$router.go(-1);
          }
        }
      );
      //点击消息状态栏跳转
      api.addEventListener(
        {
          name: "noticeclicked"
        },
        function(ret, err) {
          if (ret.value.type) {
            that.$router.push("/" + ret.value.type + "/" + ret.value.value);
          }
        }
      );
    },
    db() {
      if (window.navigator.userAgent.match(/APICloud/i)) {
        messageUtil.openDb();
        messageUtil.createTable();
      }
    },
    setRouteKeepAlive(routes) {
      routes.map(item => {
        if (item.children && Array.isArray(item.children)) {
          this.setRouteKeepAlive(item.children);
        } else {
          if (item.meta && item.meta.keepAlive) {
            this.keepAlive.push(item.name);
          }
        }
      });
    },
    getBanners() {
      this.$SERVER.getBanners().then(res => {
        this.$METHOD.setStore("head_img", res.data.head_img);
        this.$METHOD.setStore("merchant_img", res.data.merchant_img);
      });
    },
    getGames() {
      this.$SERVER
        .getGames({
          pageNum: 1,
          pageSize: 20
        })
        .then(res => {
          this.$METHOD.setStore("games", res.data.list);
        });
    },
    getLocation() {
      var that = this;
      //获取定位
      if (window.navigator.userAgent.match(/APICloud/i)) {
        let bmLocation = api.require("bmLocation");
        bmLocation.configManager({
          accuracy: "device_sensors",
          filter: 1,
          activityType: "automotiveNavigation",
          coordinateType: "GCJ02",
          locationTimeout: 10,
          reGeocodeTimeout: 10
        });
        bmLocation.singleLocation(
          {
            reGeocode: false,
            netWorkState: false
          },
          function(ret, err) {
            if (ret.status) {
              that.$METHOD.setStore("position", {
                lng: ret.location.longitude,
                lat: ret.location.latitude
              });
              that.$store.state.position = {
                lng: ret.location.longitude,
                lat: ret.location.latitude
              };
              if (that.$store.state.systemType == "android") {
                that.openUpdate(
                  ret.location.longitude,
                  ret.location.latitude,
                  ret.reGeo.locationDescribe
                );
              } else if (that.$store.state.systemType == "ios") {
                api.ajax(
                  {
                    url: "http://api.map.baidu.com/reverse_geocoding/v3/",
                    method: "get",
                    data: {
                      values: {
                        ak: "r0GPTlafEf4gbOZAENRPNTb0b8OfzXGK",
                        output: "json",
                        coordtype: "wgs84ll",
                        extensions_poi: "1",
                        location: ret.location.latitude + "," + ret.location.longitude
                      }
                    }
                  },
                  function(data) {
                    if (data) {
                      if (data.status == 0) {
                        that.openUpdate(
                          ret.location.longitude,
                          ret.location.latitude,
                          "在" + data.result.pois[0].name + "附近"
                        );
                      } else {
                        postLocation(
                          ret.location.longitude,
                          ret.location.latitude
                        );
                      }
                    } else {
                      postLocation(
                        ret.location.longitude + "," + ret.location.latitude
                      );
                    }
                  }
                );
              }
            }
          }
        );
      }
    },
    // 更新用户定位/在线状态
    openUpdate(lng, lat, position) {
      var that = this;
      if (that.$METHOD.getStore("token")) {
        that.$SERVER.openUpdate({
          userId: that.$store.state.userInfo.userid,
          lng: lng,
          lat: lat,
          position: position,
          loginstate: 1
        });
      }
    },
    setVux() {
      this.$store.state.token = this.$METHOD.getStore("token");
      if (this.$METHOD.getStore("userInfo")) {
        this.$store.state.userInfo = JSON.parse(
          this.$METHOD.getStore("userInfo")
        );
      }
    }
  }
};
</script>
<style lang="less">
.color {
  color: #ffd948;
}
</style>

<style lang="less" scope>
#app {
  font-family: "PingFang-SC-Medium", "PingFang SC", "Microsoft YaHei", Helvetica,
    Tahoma, Arial, "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei",
    sans-serif;
  height: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
</style>
