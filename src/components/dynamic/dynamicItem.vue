<template>
  <div class="item">
    <div class="user-info">
      <img :src="info.userInfo.image" class="avatar" />
      <div class="username">
        <h4>{{info.userInfo.nickname}}</h4>
        <span>{{$METHOD.timeSwitchString(info.createtime)}}</span>
      </div>
      <slot name="title-right" />
    </div>
    <p>
      {{info.message}}...
      <span
        v-if="info.friendsList"
        v-for="friends,index in info.friendsList"
        @click.stop="$router.push(`/accompanyDetail/${friends.userid}`)"
      >  @{{friends.nickname}}</span>
    </p>
    <div class="image-list">
      <van-grid :border="false" :gutter="5" square :column-num="3">
        <van-grid-item class="image-item" v-for="item,index in info.mediaList" :key="index">
          <van-image fit="cover" class="image" :src="item.url" @click.stop="imagePreview(index)" />
        </van-grid-item>
      </van-grid>
    </div>
    <slot name="operation" />
  </div>
</template>

<script>
import Vue from "vue";
import { ImagePreview } from "vant";
Vue.use(ImagePreview);
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
      required: true
    }
  },
  computed: {
    images() {
      var that = this;
      var images = []
      if (that.info.mediaList) {
        that.info.mediaList.forEach(e => {
          images.push(e.url);
        });
      }
      return images
    }
  },
  methods: {
    imagePreview(index) {
      var that = this;
      ImagePreview({
        images: that.images,
        startPosition: index,
        onClose() {
          // do something
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  margin-bottom: 15px;
  padding: 10px 20px;
  background: #fff;
  margin-bottom: 15px;
  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid rgba(245, 245, 245, 1);
    .avatar {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      flex-shrink: 0;
      margin-right: 10px;
    }
    .username {
      flex-grow: 1;
      line-height: 15px;
      h4 {
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      span {
        font-size: 10px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  p {
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    padding: 10px 0;
    span {
      color: rgba(255, 217, 72, 1);
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
}
</style>