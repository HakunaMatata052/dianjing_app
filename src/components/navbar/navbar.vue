<template>
  <div style="position: relative">
    <div class="navbar" id="navbar" :class=" stl ? stl : ''">
      <div class="top" :style="'padding-top:'+ top +'px'"></div>
      <van-nav-bar
        @click-left="onClickLeft()"
        @click-right="openSearchFn()"
        :z-index="999"
        style="background:none"
      >
        <div slot="title" class="title">
          <span>{{title}}</span>
          <slot name="title"></slot>
        </div>
        <van-icon name="arrow-left" class="left" slot="left" v-if="goback" />
        <!-- <svg-icon icon-class="filter" class="left" slot="left" v-if="filter && !goback" /> -->
        <svg-icon icon-class="search" class="right" slot="right" v-if="search" />
        <slot name="right" slot="right" v-else></slot>
      </van-nav-bar>
    </div>
    <div class="navbar-empty" :style="'padding-top:'+ top +'px'" v-if="!stl"></div>
    <van-popup v-model="searchShow" position="top" get-container="body">
      <div class="navbar-empty" v-if="searchEmptyShow && !stl"></div>
      <van-search placeholder="请输入搜索关键词" v-model="value" @blur="searchFn" />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      top: "",
      searchShow: false,
      value: "",
      searchEmptyShow: false
    };
  },
  props: {
    title: {
      type: String,
      default() {
        return this.$route.meta.title;
      },
      required: false
    },
    goback: {
      type: Boolean,
      default() {
        return true;
      },
      required: false
    },
    search: {
      type: Boolean,
      default() {
        return false;
      },
      required: false
    },
    filter: {
      type: Boolean,
      default() {
        return false;
      },
      required: false
    },
    stl: {
      type: String,
      default() {
        return;
      },
      required: false
    }
  },
  components: {},
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
    onClickLeft() {
      if (this.goback) {
        this.$router.go(-1);
      }
    },
    openSearchFn() {
      if (this.search) {
        this.searchShow = true;
      }
    },
    searchFn() {
      console.log("搜索");
    }
  }
};
</script>
<style lang="less">
.nobg .van-hairline--bottom::after {
  border-bottom-width: 0;
}
</style>

<style lang="less" scoped>
.navbar {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 999;
  background: #fff;
  .title {
    span {
      font-weight: bold;
    }
  }
  .left,
  .right {
    font-size: 20px;
  }
}
.navbar-empty {
  height: 46px;
}

/* 风格 */
.nobg {
  background: none;
  .title {
    color: #fff;
  }
  .left {
    color: #fff !important;
  }
}
</style>


