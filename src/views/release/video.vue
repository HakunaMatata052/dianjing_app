<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell value-class="duan-cell" class="cell" size="large">
          <template slot="title">
            <van-field
              v-model="form.comment"
              type="textarea"
              placeholder="添加有趣的描述，能让更多人看到你~"
              rows="3"
            />
          </template>
          <div class="video-box" @click="openVideo">
            <div class="van-uploader">
              <div class="van-uploader__wrapper">
                <div class="van-uploader__preview" v-if="imageShow">
                  <div class="van-image van-uploader__preview-image">
                    <van-image fit="cover" :src="video.thumbPath" width="100%" height="100%"></van-image>
                  </div>
                  <!-- <i class="van-icon van-icon-delete van-uploader__preview-delete"></i> -->
                </div>
                <div class="van-uploader__upload" v-if="!imageShow">
                  <i class="van-icon van-icon-plus van-uploader__upload-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </van-cell>
        <van-field
          v-model="tagsList"
          type="textarea"
          placeholder="#添加话题#"
          rows="1"
          autosize
          class="cell"
          @input="tagsInput"
           size="large"
        />

        <van-cell title-class="duan-cell" v-if="form.tagsList.length!=0" size="large">
          <template slot="title">
            <van-tag
              type="primary"
              size="large"
              v-for="(item,index) in form.tagsList"
              :key="index"
              style="margin-right:5px"
            >{{item}}</van-tag>
          </template>
        </van-cell>
        <van-cell title="@好友" class="cell" @click="userListPopupShow = true"  size="large"/>
        <van-cell title-class="duan-cell" v-if="form.friendsList.length!=0" size="large">
          <template slot="title">
            <span
              class="friends-list"
              v-for="(item,index) in form.friendsList"
              :key="index"
              @click="delFriends(index)"
            >@{{item.nickname}}</span>
          </template>
        </van-cell>
        <van-field
          v-model="form.position"
          type="input"
          placeholder="添加位置"
          left-icon="location-o"
          class="cell"          
          readonly
          @click="positionListPopupShow = true"
           size="large"
        />
        <van-switch-cell v-model="form.isfree" title="是否收费" class="cell" />
        <transition name="fade">
          <van-field v-model="form.price" title="价格" placeholder="金币" v-if="form.isfree"  size="large"/>
        </transition>
        <van-switch-cell v-model="form.onceonly" title="是否阅后即焚" class="cell"  size="large" />
        <van-cell title="分享范围" :value="owner" is-link @click="pickerPopupShow = true" class="cell"  size="large"/>
        <van-cell class="submit-cell" size="large">
          <van-button class="submit" size="large" :hairline="false" @click="releaseFn">发布</van-button>
        </van-cell>
      </van-cell-group>
    </div>
    <van-popup v-model="pickerPopupShow" position="bottom">
      <van-picker
        @cancel="pickerPopupShow = false"
        @confirm="pickerOnConfirm"
        show-toolbar
        :columns="columns"
      />
    </van-popup>
    <van-popup v-model="userListPopupShow" style="height:100%;" position="bottom">
      <userList @selectUser="selectUser" />
    </van-popup>
    <van-popup v-model="positionListPopupShow" style="height:100%;" position="bottom">
      <positionStr @selectPosition="selectPosition" />
    </van-popup>
    <!-- 上传视频层 -->
    <uploadVideo ref="upload" @selectVideo="selectVideo"/>
  </div>
</template>
<script>
import md5 from "js-md5";
import navBar from "@/components/navbar/navbar.vue";
import uploadVideo from "@/components/upload/uploadVideo.vue";
import userList from "@/components/operation/userList.vue";
import positionStr from "@/components/operation/positionStr.vue";
export default {
  name: "release-video",
  components: {
    navBar,
    uploadVideo,
    userList,
    positionStr
  },
  data() {
    return {
      imageShow: false,
      pickerPopupShow: false,
      userListPopupShow: false,
      positionListPopupShow: false,
      columns: [
        { id: 0, text: "公开" },
        { id: 1, text: "好友可见" },
        { id: 2, text: "私密" }
      ],
      owner: "公开",
      video: {},
      tagsList: "",
      form: {
        frontcover: "",
        video: "",
        comment: "",
        tagsList: [],
        friendsList: [],
        isfree: 0,
        price: "",
        position: "",
        owner: 0,
        onceonly: 0
      }
    };
  },
  methods: {
    pickerOnConfirm(val) {
      this.pickerPopupShow = false;
      this.owner = val.text;
      this.form.owner = val.id;
    },
    openVideo() {
      this.$refs.upload.openLoadPopup();
    },
    selectVideo(val) {
      this.imageShow = true;
      this.video = val;
    },
    tagsInput(val) {
      var that = this;
      var str = val;
      var patt = new RegExp("#([^#]{1,40})#", "g");
      var result;
      var arry = [];
      while ((result = patt.exec(str)) != null) {
        arry.push(result[1]);
      }
      that.form.tagsList = arry;
    },
    selectUser(val) {
      this.userListPopupShow = false;
      if (JSON.stringify(val) != "{}") {
        this.form.friendsList.push({userid:val.userId,nickname:val.nickName});
      }
    },        
    selectPosition(val) {
      this.positionListPopupShow = false;
      if (JSON.stringify(val) != "{}") {
        this.form.position = val.name;
      }
    },
    delFriends(index) {
      if (index == 0) {
        this.form.friendsList = [];
      } else {
        this.form.friendsList.splice(index, index);
      }
    },
    releaseFn() {
      var that = this;
      if(that.form.video.path==0){
        that.$toast.fail('请上传视频')
        return
      }
      if(that.form.comment.length==0){
        that.$toast.fail('请填写描述')
        return
      }
      that.$toast.loading({
        duration: 0,
        mask: true,
        message: "正在上传视频..."
      });
      var qiniuUpfile = api.require("qiniuUpfile");
      qiniuUpfile.upfile(
        {
          file: that.video.thumbPath,
          name: md5(that.video.thumbPath) + ".jpg"
        },
        function(upret, uperr) {
          if (upret.status) {
            if (upret.oper == "complete") {
              that.form.frontcover =
                that.$store.state.qiniuaddr + upret.info.key;
              qiniuUpfile.upfile(
                {
                  file: that.video.path,
                  name: md5(that.video.path) + ".mp4"
                },
                function(upret2, uperr2) {
                  if (upret2.status) {
                    if (upret2.oper == "complete") {
                      that.form.video =
                      that.$store.state.qiniuaddr + upret2.info.key;
                      that.$SERVER.postVideo({
                        userid: that.$store.state.userInfo.userid,
                        ...that.form
                      }).then(res=>{
                        that.$toast.clear();
                        that.$toast.success("上传成功！");
                        that.$router.push('/video/'+res.data.videoid)
                      })
                    }
                  }
                }
              );
            }
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.duan-cell {
  flex: inherit;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.cell-group {
  background: none;
  .submit-cell {
    background: none;
    padding: 20px;
  }
  .cell {
    margin-top: 5px;
  }
  .tag-cell {
    flex-wrap: wrap;
  }
  .submit {
    background: #ffd948;
  }
  .friends-list {
    color: #ffd948;
    margin-right: 10px;
  }
}
</style>
