<template>
  <div class="view-container">
    <main class="view-main">
      <transition :name="$store.state.navAn">
        <keep-alive :max="10" :include="keepAlive">
          <router-view />
        </keep-alive>
      </transition>
    </main>
    <footer>
      <Tabbar :tabList="tabList"></Tabbar>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src

import router from "@/router/router.js";
import Tabbar from "@/components/tabbar/tabbar.vue";
export default {
  name: "home",
  components: {
    Tabbar
  },
  data() {
    return {
      keepAlive: [],
      tabList: [
        {
          title: "首页",
          path: "/",
          icon: "home",
          icon_press: "home-active",
          index: 0
        },
        {
          title: "视频",
          path: "/video",
          icon: "video",
          icon_press: "video-active",
          index: 1
        },
        {
          title: "发布",
          icon: "release",
          icon_press: "release",
          index: 2
        },
        {
          title: "游戏",
          path: "/game",
          icon: "game",
          icon_press: "game-active",
          index: 3
        },
        {
          title: "我的",
          path: "/mine",
          icon: "user",
          icon_press: "user-active",
          index: 4
        }
      ]
    };
  },
  created() {
    // 递归路由设置KeepAlive  ***** 注意路由name必须和组件内的name一致 *****
    this.setRouteKeepAlive(router.options.routes);
  },
  methods: {
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
    }
  }
};
</script>
<style lang="less" scoped>
.view-container {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .view-main {
    height: 100%;
    overflow: scroll;
    flex-grow: 1;
  }
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
