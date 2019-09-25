<template></template>
<script>
import md5 from "js-md5";
export default {
  props: {
    num: {
      type: Number,
      default() {
        return 9;
      },
      required: false
    },
    size: {
      type: Number,
      default() {
        return 15;
      },
      required: false
    }
  },
  methods: {
    openLoadPopup() {
      var that = this;
      var systemType = this.$store.state.systemType;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var UIMediaScanner = api.require("UIMediaScanner");
        UIMediaScanner.open(
          {
            type: "picture", //视频与图片,all（图片和视频）picture（图片）video（视频）
            classify: true,
            max: that.num,
            sort: {
              key: "time",
              order: "desc"
            },
            texts: {
              stateText: "已选择*项",
              cancelText: "取消",
              finishText: "完成"
            },
            styles: {
              bg: "#fff",
              mark: {
                icon: "",
                position: "bottom_left",
                size: 20
              },
              nav: {
                bg: "#eee",
                stateColor: "#000",
                stateSize: 18,
                cancelBg: "rgba(0,0,0,0)",
                cancelColor: "#000",
                cancelSize: 18,
                finishBg: "rgba(0,0,0,0)",
                finishColor: "#000",
                finishSize: 18
              }
            },
            scrollToBottom: {
              intervalTime: -1
            },
            exchange: true,
            rotation: true
          },
          function(ret) {
            if (ret) {
              if (ret.eventType == "confirm") {
                var list = [];
                ret.list.forEach((e, i) => {
                  if (systemType == "ios") {
                    UIMediaScanner.transPath(
                      {
                        path: e.path
                      },
                      function(pic) {
                        if (pic) {
                          list.push(pic.path);
                          if (i == ret.list.length - 1) {
                            that.$emit("selectImage", list);
                          }
                        }
                      }
                    );
                  } else {
                    list.push(e.path);
                    if (i == ret.list.length - 1) {
                      that.$emit("selectImage", list);
                    }
                  }
                });
              }
            }
          }
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>
