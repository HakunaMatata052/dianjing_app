<template></template>
<script>
import md5 from "js-md5";
export default {
  props: {
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
            type: "video", //视频与图片,all（图片和视频）picture（图片）video（视频）
            classify: true,
            max: 1,
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
                if (ret.list[0].duration > that.size) {
                  that.$toast.fail("视频超过" + that.size + "秒");
                  return false;
                }
                if (systemType == "ios") {
                  UIMediaScanner.transPath(
                    {
                      path: ret.list[0].path
                    },
                    function(video) {
                      if (video) {
                        that.$emit("selectVideo", {
                          path: video.path,
                          thumbPath: ret.list[0].thumbPath
                        });
                      }
                    }
                  );
                } else {
                  that.$emit("selectVideo", {
                    path: ret.list[0].path,
                    thumbPath: ret.list[0].thumbPath
                  });
                }
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
