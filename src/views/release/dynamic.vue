<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell value-class="duan-cell" class="cell">
          <template slot="title">
            <van-field
              v-model="form.message"
              type="textarea"
              placeholder="添加有趣的描述，能让更多人看到你~"
              rows="3"
            />
          </template>
          <div class="image-box" @click="openImage">
            <div class="van-uploader">
              <div class="van-uploader__wrapper">
                <div class="van-uploader__upload">
                  <i class="van-icon van-icon-plus van-uploader__upload-icon"></i>
                </div>
              </div>
            </div>
          </div>
        </van-cell>
        <div class="image-list" v-if="imageShow">
          <van-grid :border="false" :gutter="5" square :column-num="3">
            <van-grid-item
              class="image-item"
              v-for="item,index in pic"
              :key="index"
              @click="delImage(index)"
            >
              <van-image fit="cover" class="image" :src="item" />
            </van-grid-item>
          </van-grid>
        </div>
        <van-field
          v-model="tagsList"
          type="textarea"
          placeholder="#添加话题#"
          rows="1"
          autosize
          class="cell"
          @input="tagsInput"
        />

        <van-cell title-class="duan-cell" v-if="form.tagsList.length!=0">
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
        <van-cell title="@好友" class="cell" @click="userListPopupShow = true" />
        <van-cell title-class="duan-cell" v-if="form.friends.length!=0">
          <template slot="title">
            <span
              class="friends-list"
              v-for="(item,index) in form.friends"
              :key="index"
              @click="delFriends(index)"
            >@{{item.nickName}}</span>
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
        />
        <van-switch-cell v-model="form.isfree" title="是否收费" class="cell" />
        <transition name="fade">
          <van-field v-model="form.price" title="价格" placeholder="金币" v-if="form.isfree" />
        </transition>
        <van-switch-cell v-model="form.onceonly" title="是否阅后即焚" class="cell" />
        <van-cell title="分享范围" :value="owner" is-link @click="pickerPopupShow = true" class="cell" />
        <van-cell class="submit-cell">
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
    <uploadImage ref="upload" @selectImage="selectImage" :num="9" />
  </div>
</template>
<script>
import md5 from "js-md5";
import navBar from "@/components/navbar/navbar.vue";
import uploadImage from "@/components/upload/uploadImage.vue";
import userList from "@/components/operation/userList.vue";
import positionStr from "@/components/operation/positionStr.vue";
export default {
  name: "release-dynamic",
  components: {
    navBar,
    uploadImage,
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
      tagsList: "",
      pic: [],
      form: {
        list: [],
        message: "",
        tagsList: [],
        friends: [],
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
    openImage() {
      if (this.pic.length >= 9) {
        this.$toast.fail("只能上传9张图片！");
        return;
      }
      this.$refs.upload.openLoadPopup();
    },
    delImage(index) {
      this.pic.splice(index, 1);
    },
    selectImage(val) {
      var that = this;
      that.imageShow = true;
      console.log(that.pic.length);
      if (that.pic.length + val.length > 9) {
        this.$toast.fail("只能上传9张图片！");
        return;
      }
      val.forEach(e => {
        that.pic.push(e);
      });
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
        this.form.friends.push({
          userId: val.userId,
          nickName: val.nickName
        });
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
        this.form.friends = [];
      } else {
        this.form.friends.splice(index, index);
      }
    },
    releaseFn() {
      var that = this;
      if (that.form.message.length == 0) {
        that.$toast.fail("请填写描述");
        return;
      }
      that.$toast.loading({
        duration: 0,
        mask: true,
        message: "正在上传图片..."
      });
      var qiniuUpfile = api.require("qiniuUpfile");
      that.pic.forEach((e, i) => {
        qiniuUpfile.upfile(
          {
            file: e,
            name: md5(e) + ".jpg"
          },
          function(upret2, uperr2) {
            if (upret2.status) {
              if (upret2.oper == "complete") {
                that.form.list.push({
                  url:that.$store.state.qiniuaddr + upret2.info.key
                });
                if (i == that.pic.length - 1) {
                  that.addDynamicInformation();
                }
              }
            }
          }
        );
      });
    },
    addDynamicInformation() {
      var that = this;
      that.$SERVER
        .addDynamicInformation({
          userid: that.$store.state.userInfo.userid,
          ...that.form
        })
        .then(res => {
          that.$toast.clear();
          that.$toast.success("发布成功！");
          // that.$router.push('/')
        });
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
.image-list {
  margin: 0 -5px;
  .iamge-item {
    padding: 0;
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>
