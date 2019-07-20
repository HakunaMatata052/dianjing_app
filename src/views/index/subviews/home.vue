<template>
  <div id="home">
    <navBar :search="true" />
    <van-pull-refresh v-model="isLoading" @refresh="onrefresh">
      <van-swipe :autoplay="3000" class="banner">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
          <img :src="image.url" />
        </van-swipe-item>
      </van-swipe>
      <div class="box" style="padding:0;">
        <van-row class="notice" type="flex" justify="center" style="align-items:center">
          <van-col span="5" style="border-right:1px dashed #ebedf0">
            <van-image
              class="notice-img"
              fit="contain"
              src="img/notice.png"
            />
          </van-col>
          <van-col span="19" @click="goExpress(expressList.id)">
            <h3 class="notice-title">{{expressList.title}}</h3>
            <p class="notice-des">{{expressList.content}}</p>
          </van-col>
          <!-- <van-col span="6">
            <van-button
              size="large"
              round
              :hairline="false"
              :style="'background: '+$store.state.color +';height:40px;line-height:40px;'"
            >预定</van-button>
          </van-col>-->
        </van-row>

        <van-grid :border="true" :column-num="3" :square="true">
          <van-grid-item>
            <van-image fit="contain" width="80" height="80" src="img/img1.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image fit="contain" width="80" height="80" src="img/img2.png" />
          </van-grid-item>
          <van-grid-item>
            <van-image fit="contain" width="80" height="80" src="img/img3.png" />
          </van-grid-item>
        </van-grid>
      </div>

      <gameList />

      <div class="box accompany">
        <div class="accompany-title">
          <h2>美女陪练</h2>
          <div class="more" @click="goAccompany">
            查看更多
            <van-icon class-prefix="icon" name="more" />
          </div>
        </div>
        <div class="wrapper" ref="wrapper1">
          <accompany-list :accompanyList="AccompanyList1" :scrollX="true" />
        </div>

        <div class="wrapper" ref="wrapper2">
          <accompany-list :accompanyList="AccompanyList2" :scrollX="true" />
        </div>

        <div class="wrapper" ref="wrapper3">
          <accompany-list :accompanyList="AccompanyList3" :scrollX="true" />
        </div>
      </div>
      <div class="ad">
        <van-image fit="cover" src="http://lorempixel.com/100/30/" class="ad-img"></van-image>
      </div>
      <!-- <div class="video">
        <van-swipe
          :loop="false"
          :width="300"
          :initial-swipe="1"
          style="transform: translateX(40px)"
        >
          <van-swipe-item>
            <van-image fit="cover" width="300" src="https://picsum.photos/300/300" />
          </van-swipe-item>
        </van-swipe>
      </div>-->
      <div class="box match">
        <div class="match-title">
          <h2>
            赛事
            <span>结果竞猜</span>
          </h2>

          <div class="more">
            查看更多
            <van-icon class-prefix="icon" name="more" />
          </div>
        </div>
        <div class="match-list">
          <div class="match-item" v-for="item in AccompanyList1" :key="item.id">
            <div class="match-img">
              <van-image fit="cover" :src="item.download_url" />
            </div>
            <div class="tag-list">
              <div class="match-tag">
                <img src="img/hj_icon_live_hot_1.png" />
              </div>
              <div class="match-tag">
                <img src="img/hj_icon_live_hot_1.png" />
              </div>
            </div>
            <div class="watch">
              <van-icon name="eye" color="#fff" />51.3w
            </div>
            <div class="title">一直玩一直爽</div>
            <div class="see">立即观看</div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import navBar from "@/components/navbar/navbar.vue";
import gameList from "@/components/gameList.vue";
import accompanyList from "@/components/accompany/accompanyList.vue";
export default {
  name: "home",
  data() {
    return {
      bannerList: [],
      expressList: {},
      AccompanyList1: [],
      AccompanyList2: [],
      AccompanyList3: [],
      isLoading: false,
      refreshNum: 0
    };
  },
  components: {
    navBar,
    gameList,
    "accompany-list": accompanyList
  },
  watch: {
    refreshNum(newVal, oldVal) {
      if (newVal == 2) {
        this.isLoading = false;
        this.refreshNum = 0;
      }
    }
  },
  created() {
    this.getAccompanyList();
    this.getExpress();
    this.getBanners();
  },
  mounted() {},
  methods: {
    onrefresh() {
      this.getAccompanyList(() => {
        this.refreshNum++;
      });
      this.getExpress(() => {
        this.refreshNum++;
      });
      this.getBanners();
    },
    getAccompanyList(fn) {
      // this.$SERVER.getGame().then(res => {
      //   this.isLoading = false;
      //   this.AccompanyList1 = res.slice(0, 5);
      //   this.AccompanyList2 = res.slice(5, 10);
      //   this.AccompanyList3 = res.slice(10, 15);
      //   this.$nextTick(() => {
      //     this.scroll = new BScroll(this.$refs.wrapper1, {
      //       scrollX: true,
      //       scrollY: false,
      //       eventPassthrough: "vertical",
      //       freeScroll: true
      //     });
      //     this.scroll = new BScroll(this.$refs.wrapper2, {
      //       scrollX: true,
      //       scrollY: false,
      //       eventPassthrough: "vertical",
      //       freeScroll: true
      //     });
      //     this.scroll = new BScroll(this.$refs.wrapper3, {
      //       scrollX: true,
      //       scrollY: false,
      //       eventPassthrough: "vertical",
      //       freeScroll: true
      //     });
      //   });
      // });
      if (fn) {
        fn();
      }
    },
    getExpress(fn) {
      this.$SERVER
        .getExpress({
          pageNum: 1,
          pageSize: 10
        })
        .then(res => {
          this.expressList = res.data.list[0];
          if (fn) {
            fn();
          }
        });
    },
    getBanners() {
      let head_img = this.$METHOD.getStore("head_img");
      if (head_img && head_img.length != 0) {
        this.bannerList = JSON.parse(head_img);
      } else {
        this.$SERVER.getBanners().then(res => {
          this.$METHOD.setStore("head_img", res.data.head_img);
          this.$METHOD.setStore("merchant_img", res.data.merchant_img);
          this.bannerList = res.data.head_img;
        });
      }
    },
    goExpress(id) {
      console.log(id);
    },
    goAccompany() {
      this.$router.push("/accompany");
    }
  }
};
</script>
<style lang="less">
#home .van-tabs__nav {
  width: 60%;
  margin: auto;
}
</style>

<style lang="less" scoped>
.banner {
  margin-top: 10px;
  img {
    width: 100%;
    height: 200px;
  }
}

.more {
  color: #999;
  font-size: 14px;
}
.notice {
  padding: 10px 15px;
  .notice-img {
    padding: 0 5px;
    width: 60px;
    height: 60px;
  }
  .notice-title {
    font-size: 14px;
    padding: 0 10px;
  }
  .notice-des {
    padding: 10px;
    font-size: 10px;
    color: #999;
  }
}
.accompany {
  padding: 15px;
  background-image: url(/img/mzdj_room_user_ds.png);
  background-repeat: no-repeat;
  background-position: left 10px;
  background-size: 20px;
  .accompany-title {
    padding: 0 0 10px 10px;
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .wrapper {
    width: 100%;
    overflow: hidden;
  }
}
.ad {
  padding: 15px;
  .ad-img {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
  }
}
.match {
  padding: 15px;
  background-image: url(/img/pk.png);
  background-repeat: no-repeat;
  background-position: 10px 15px;
  background-size: 40px;
  .match-title {
    padding: 0 0 10px 40px;
    display: flex;
    justify-content: space-between;
    h2 {
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #999;
        margin-left: 10px;
      }
    }
  }
  .match-list {
    .match-item {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 10px;
      .match-img {
        width: 100%;
        height: 200px;
      }
      .tag-list {
        position: absolute;
        left: 10px;
        top: 10px;
        display: flex;
        .match-tag {
          margin-right: 10px;
          height: 30px;
          img {
            height: 100%;
          }
        }
      }
      .watch {
        position: absolute;
        right: 10px;
        top: 10px;
        background: rgba(0, 0, 0, 0.5);
        padding: 5px 10px;
        color: #fff;
        border-radius: 50px;
        display: flex;
        align-items: center;
        i {
          margin-right: 5px;
        }
      }
      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 50%;
        color: #fff;
        padding: 5px 10px;
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0)
        );
      }
      .see {
        position: absolute;
        right: 10px;
        bottom: 10px;
        color: #fff;
        padding: 5px 20px;
        border-radius: 50px;
        background: linear-gradient(to right, #ff376d, #ff8c5a);
      }
    }
  }
}
</style>

