import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";

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
          component: () => import("@/views/index/subviews/home.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"电竞",
            isMember: false,
            isLogin:false
          }
        },
        {
          path: "/video",
          name: "video",
          component: () => import("@/views/index/subviews/video.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"视频",
            isMember: false,
            isLogin:false
          }
        },
        {
          path: "/game",
          name: "game",
          component: () => import("@/views/index/subviews/game.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"游戏",
            isMember: false,
            isLogin:false
          }
        },
        {
          path: "/mine",
          name: "mine",
          component: () => import("@/views/index/subviews/mine.vue"),
          meta: {
            keepAlive: true,
            isTransition: true,
            title:"我的",
            isMember: false,
            isLogin:true
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
        isMember: false,
        isLogin:false
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
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/accompanyDetail/:id",
      name:"accompanyDetail",
      component: () => import("@/views/accompany/accompanyDetail.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"个人主页",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/downorder/:id",
      name:"downOrder",
      component: () => import("@/views/order/downOrder.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"下订单",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/login",
      name:"login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"登录",
        isMember: false,
        isLogin:false
      }
    },
    {
      path: "/register",
      name:"register",
      component: () => import("@/views/login/register.vue"),
      meta: {
        keepAlive: false,
        isTransition: true,
        title:"注册",
        isMember: false,
        isLogin:false
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (!window.localStorage.getItem('token')) {
      router.push('/login')
    }else{
      next()
    }
    if (to.meta.isMember) {
      if (!window.localStorage.getItem('token')) {
        router.push('/login')
      }else{
        if (store.state.isMember) {
          next()
        }else{
          router.push('/buymember')
        }
      }
    }
  }else {
    next()
  }
  router.afterEach(route => {
    // console.log(route)
    // console.log("跳转")
  })
})

export default router;