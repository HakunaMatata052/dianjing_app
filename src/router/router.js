import Vue from "vue";
import Router from "vue-router";

// tarBar ----- 子页面
import Index from "@/views/index/index.vue";
// 内嵌组件

Vue.use(Router);

const router = new Router({
  /**
   * name: 组件名称 (需要开启缓存，路由组件名称与组件内名称必须一致，区分大小写)
   * meta：{
   *  title: 页面标题，
   *  keepAlive：是否开启缓存（开启缓存是组件内name，所以这里需要和routes的name配合）
   *  isTransition: 是否开启过渡动画
   * }
   */
  routes: [{
      path: "/",
      component: Index,
      children: [{
          path: "",
          name: "home",
          component: () => import("@/views/index/home.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"电竞",
          }
        },
        {
          path: "/page02",
          name: "page02",
          component: () => import("@/views/index/subviews/page02.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"电竞",
          }
        },
        {
          path: "/page03",
          name: "page03",
          component: () => import("@/views/index/subviews/page03.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"电竞",
          }
        },
        {
          path: "/page04",
          name: "page04",
          component: () => import("@/views/index/subviews/page04.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"电竞",
          }
        }
      ]
    },
    {
      path: "/about",
      component: () => import("@/views/about/about.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"电竞",
      }
    },
    {
      path: "/accompany",
      name:"accompany",
      component: () => import("@/views/accompany/accompany.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"陪玩",
      }
    }
  ]
});

export default router;