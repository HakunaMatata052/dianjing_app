<template>
  <van-popup
    v-model="uploadShow"
    position="bottom"
    :style="{ height: safeArea+'px' }"
    class="upload"
  >
    <div class="btn-group">
      <van-button
        type="default"
        size="large"
        :hairline="false"
        class="btn"
        @click="closeUploadPopup"
      >取消</van-button>
      <van-button type="primary" size="large" :hairline="false" class="btn" @click="uploadFn">确定</van-button>
    </div>
  </van-popup>
</template>
<script>
import md5 from "js-md5";
export default {
  props: {
    appearance: {
      type: String,
      default() {
        return "rectangle";
      },
      required: false
    },
    mode: {
      type: String,
      default() {
        return "all";
      },
      required: false
    },
    width: {
      type: String,
      default() {
        if (window.navigator.userAgent.match(/APICloud/i)) {
          return String(api.winWidth);
        } else {
          return "100%";
        }
      },
      required: false
    },
    height: {
      type: String,
      default() {
        if (window.navigator.userAgent.match(/APICloud/i)) {
          return String(api.winHeight);
        } else {
          return "100%";
        }
      },
      required: false
    },
    top: {
      type: String,
      default() {
        return "0";
      },
      required: false
    }
  },
  computed: {
    clip() {
      if (this.appearance == "circular") {
        return {
          w: api.winWidth / 2,
          y: 150,
          borderColor: "#ff9694",
          borderWidth: 0,
          appearance: "circular"
        };
      } else {
        return {
          w: this.width,
          h: this.height,
          y: this.top,
          borderColor: "#ff9694",
          borderWidth: 0
        };
      }
    }
  },
  data() {
    return {
      safeArea: 60,
      uploadShow: false
    };
  },
  created() {
    if (window.navigator.userAgent.match(/APICloud/i)) {
      if (this.$store.state.systemType == "ios") {
        this.safeArea = this.safeArea + api.safeArea.bottom;
      }
    }
  },
  methods: {
    openLoadPopup() {
      var that = this;
      var systemType = this.$store.state.systemType;
      that.uploadShow = true;
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var FNImageClip = api.require("FNImageClip");
        api.getPicture(
          {
            sourceType: "album",
            encodingType: "jpg",
            mediaValue: "pic",
            destinationType: "url",
            allowEdit: false,
            quality: 50,
            saveToPhotoAlbum: false
          },
          function(ret, err) {
            if (ret && ret.data) {
              FNImageClip.open(
                {
                  rect: {
                    x: 0,
                    y: 0,
                    w: api.winWidth,
                    h: api.winHeight - that.safeArea
                  },
                  srcPath: ret.data,
                  style: {
                    mask: "rgba(255,255,255,.8)",
                    clip: that.clip
                  },
                  mode: that.mode
                },
                function(ret, err) {}
              );
            } else {
              // that.$toast.fail("获取相册失败！");
              that.uploadShow = false;
            }
          }
        );
      }
    },
    closeUploadPopup() {
      if (window.navigator.userAgent.match(/APICloud/i)) {
        this.uploadShow = false;
        var FNImageClip = api.require("FNImageClip");
        FNImageClip.close();
      }
    },
    uploadFn() {
      var that = this;
      that.$toast.loading({
        duration: 0,
        mask: true,
        message: "加载中..."
      });
      if (window.navigator.userAgent.match(/APICloud/i)) {
        var FNImageClip = api.require("FNImageClip");
        FNImageClip.save(
          {
            destPath:
              "fs://images//avatar" + new Date().getTime() / 1000 + ".jpg",
            copyToAlbum: false,
            quality: 1
          },
          function(ret, err) {
            if (ret) {
              //点击去顶后关闭模态层
              FNImageClip.close();
              that.uploadShow = false;
              var tx = ret.destPath;
              var qiniuUpfile = api.require("qiniuUpfile");
              qiniuUpfile.upfile(
                {
                  file: ret.destPath,
                  name: md5(ret.destPath) + ".jpg"
                },
                function(upret, uperr) {
                  if (upret.status) {
                    if (upret.oper == "complete") {
                      that.$toast.clear();
                      that.$toast.success("上传成功！");
                      that.$emit(
                        "uploadSuccess",
                        that.$store.state.qiniuaddr + upret.info.key
                      );
                    }
                  }
                });
            }
          }
        );
      }
    }
  }
};
</script>
<style lang="less" scoped>
.upload {
  .btn-group {
    height: 100%;
    display: flex;
    align-items: stretch;
    .btn {
      height: 100%;
    }
  }
}
</style>
