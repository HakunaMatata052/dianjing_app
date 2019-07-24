<template>
  <div id="setting">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell title="设置头像" size="large" is-link @click="editAvatar('设置头像','nickname')">
          <template slot="default">
            <!-- <van-uploader> -->
            <van-image
              fit="cover"
              :src="$store.state.userInfo.image || ( $store.state.userInfo.sex == 0 ? 'img/avatar-w.png' :'img/avatar-m.png')"
              class="avatar"
            />
            <!-- </van-uploader> -->
          </template>
        </van-cell>
        <van-cell
          title="设置昵称"
          size="large"
          is-link
          :value="$store.state.userInfo.nickname || ''"
          @click="editPopup('设置昵称','nickname')"
        />
        <van-cell
          title="设置身高"
          size="large"
          is-link
          :value="($store.state.userInfo.height  || '') +'cm'"
          @click="editPopup('设置身高','height')"
        />

        <van-cell
          title="设置体重"
          size="large"
          is-link
          :value="($store.state.userInfo.weight || '') +'Kg'"
          @click="editPopup('设置体重','weight')"
        />
        <van-cell
          title="设置性别"
          size="large"
          is-link
          :value="$store.state.userInfo.sex == 1 ? '男' : '女'"
          @click="editPickerPopup('设置性别','sex')"
        />

        <van-cell
          title="设置生日"
          size="large"
          is-link
          :value="$METHOD.format($store.state.userInfo.birthday, 'yyyy-MM-dd')"
          @click="editPickerPopup('设置生日','birthday')"
        />

        <van-cell
          title="修改个性签名"
          size="large"
          is-link
          :label="$store.state.userInfo.signname  || ''"
          @click="editPopup('修改个性签名','signname')"
        />
      </van-cell-group>
    </div>
    <!-- 输入框 -->
    <van-popup
      v-model="popupShow"
      type="primary"
      position="bottom"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <div :style="'height:'+top+'px'"></div>
      <van-nav-bar
        :title="activePopup.title"
        left-text="取消"
        @click-left="popupShow = false"
        @click-right="confirmEdit"
      >
        <van-button type="primary" size="small" slot="right">确定</van-button>
      </van-nav-bar>
      <van-cell-group>
        <van-field
          v-model="activePopup.value"
          :placeholder="activePopup.value || '请输入个性签名'"
          autosize
          :type="activePopup.field=='signname'?'textarea':'input'"
        />
      </van-cell-group>
    </van-popup>
    <!-- 选择器 -->
    <van-popup v-model="pickerPopupShow" position="bottom" get-container="body">
      <van-datetime-picker
        v-model="dateTime"
        type="date"
        :min-date="new Date()"
        v-if="activePopup.field=='birthday'"
        @cancel="pickerPopupShow = false"
        @confirm="pickerOnConfirm"
      />
      <van-picker
        :columns="sexList"
        @cancel="pickerPopupShow = false"
        @confirm="pickerOnConfirm"
        v-if="activePopup.field=='sex'"
        show-toolbar
      />
    </van-popup>
    <!-- 上传层 -->
    <uploadImage ref="upload" @uploadSuccess="uploadSuccess" appearance="circular" mode="image"/>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import uploadImage from "@/components/upload/uploadImage.vue";
export default {
  name: "setting",
  components: {
    navBar,
    uploadImage
  },
  computed: {
    dateTime: {
      get() {
        if (this.activePopup.field == "birthday") {
          return new Date(this.activePopup.value);
        } else {
          return new Date();
        }
      },
      set(val) {
        this.$store.state.userInfo.birthday = val;
      }
    }
  },
  data() {
    return {
      top: 0,
      popupShow: false,
      pickerPopupShow: false,
      activePopup: {
        title: "",
        field: "",
        value: ""
      },
      sexList: [
        {
          text: "男",
          value: 1
        },
        {
          text: "女",
          value: 0
        }
      ]
    };
  },
  created() {
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
    editPopup(title, field) {
      this.popupShow = true;
      this.activePopup.title = title;
      this.activePopup.field = field;
      this.activePopup.value = this.$store.state.userInfo[
        this.activePopup.field
      ];
    },
    editPickerPopup(title, field) {
      this.pickerPopupShow = true;
      this.activePopup.title = title;
      this.activePopup.field = field;
      this.activePopup.value = this.$store.state.userInfo[
        this.activePopup.field
      ];
    },
    editAvatar() {
      this.$refs.upload.openLoadPopup();
    },
    confirmEdit() {
      var that = this;
      if (this.activePopup.field == "nickname") {
        if (this.activePopup.value.length >= 6) {
          this.$toast.fail("个性签名不能超过6字");
          return;
        }
      }
      if (this.activePopup.field == "weight") {
        if (this.activePopup.value >= 300) {
          this.$toast.fail("人不可能这么胖");
          return;
        }
        if (this.activePopup.value < 30) {
          this.$toast.fail("人不可能这么瘦");
          return;
        }
      }
      if (this.activePopup.field == "height") {
        if (this.activePopup.value >= 250) {
          this.$toast.fail("人不可能这么高");
          return;
        }
        if (this.activePopup.value < 20) {
          this.$toast.fail("人不可能这么矮");
          return;
        }
      }
      if (this.activePopup.field == "signname") {
        if (this.activePopup.value.length >= 20) {
          this.$toast.fail("个性签名不能超过20字");
          return;
        }
      }
      that.updateUseInfo(() => {
        that.$METHOD.updateLocalUserInfo(
          that.activePopup.field,
          that.activePopup.value
        );
      });
    },
    pickerOnConfirm(val) {
      var that = this;
      that.activePopup.value = val.value || Number(val.getTime())
      that.updateUseInfo(() => {
        that.$METHOD.updateLocalUserInfo(
          that.activePopup.field,
          val.value || Number(val.getTime())
        );
      });
    },
    // 组件上传成功的回调函数
    uploadSuccess(val) {
      var that = this;
      that.activePopup.field = "image";
      that.activePopup.value = val;
      that.updateUseInfo(() => {
        that.$METHOD.updateLocalUserInfo(
          that.activePopup.field,
          that.activePopup.value
        );
      });
    },
    updateUseInfo(fn) {
      var that = this;
      var json = {};
      json[that.activePopup.field] = that.activePopup.value;
      json.userid = that.$store.state.userInfo.userid;
      that.$SERVER.updateUseInfo(json).then(res => {
        fn();
        that.$toast.success(res.data);
        that.popupShow = false;
        that.pickerPopupShow = false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.cell-group {
  margin-top: 10px;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
