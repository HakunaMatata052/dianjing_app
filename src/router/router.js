import Vue from "vue";
import Router from "vue-router";
import store from "../store/store";
import {
    Toast
} from "vant";

Vue.use(Toast);

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
                title: "电竞",
                isMember: false,
                isLogin: false
            }
        },
            {
                path: "/video/:type?",
                name: "videos",
                component: () => import("@/views/index/subviews/video.vue"),
                meta: {
                    keepAlive: false,
                    isTransition: true,
                    title: "视频",
                    isMember: false,
                    isLogin: false
                }
            },
            // 陪玩
            {
                path: "/accompany",
                name: "accompany",
                component: () => import("@/views/accompany/accompany.vue"),
                meta: {
                    keepAlive: false,
                    isTransition: true,
                    title: "陪玩",
                    isMember: false,
                    isLogin: false
                }
            },
            // {
            //   path: "/game",
            //   name: "game",
            //   component: () => import("@/views/index/subviews/game.vue"),
            //   meta: {
            //     keepAlive: true,
            //     isTransition: true,
            //     title:"游戏",
            //     isMember: false,
            //     isLogin:false
            //   }
            // },
            {
                path: "/mine",
                name: "mine",
                component: () => import("@/views/index/subviews/mine.vue"),
                meta: {
                    keepAlive: true,
                    isTransition: true,
                    title: "我的",
                    isMember: false,
                    isLogin: true
                }
            }
        ]
    },
        {
            path: "/release/video",
            name: "release-video",
            component: () => import("@/views/release/video.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "发布视频",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/release/dynamic",
            name: "release-dynamic",
            component: () => import("@/views/release/dynamic.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "发布动态",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/release/ability",
            name: "release-ability",
            component: () => import("@/views/release/ability.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "发布技能",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/release/pk",
            name: "release-pk",
            component: () => import("@/views/release/pk.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "发布挑战",
                isMember: false,
                isLogin: true
            }
        },
        // 陪玩
        // {
        //   path: "/accompany",
        //   name:"accompany",
        //   component: () => import("@/views/accompany/accompany.vue"),
        //   meta: {
        //     keepAlive: false,
        //     isTransition: true,
        //     title:"陪玩",
        //     isMember: false,
        //     isLogin:false
        //   }
        // },
        {
            path: "/accompanyDetail/:userid/:type?",
            name: "accompanyDetail",
            component: () => import("@/views/accompany/accompanyDetail.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "个人主页",
                isMember: false,
                isLogin: false
            }
        },
        // 订单
        {
            path: "/downorder/:userid/:id?",
            name: "downOrder",
            component: () => import("@/views/order/downOrder.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "下订单",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/orderlist",
            name: "orderList",
            component: () => import("@/views/order/orderList.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "订单列表",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/orderdetail/:id",
            name: "orderDetail",
            component: () => import("@/views/order/orderDetail.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "订单详情",
                isMember: false,
                isLogin: true
            }
        },
        //视频
        {
            path: "/videoDetail/:id",
            name: "videoDetail",
            component: () => import("@/views/video/videoDetail.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "视频",
                isMember: false,
                isLogin: false
            }
        },
        // 注册登录
        {
            path: "/login/:name?",
            name: "login",
            component: () => import("@/views/login/login.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "登录",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/views/login/register.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "注册",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/register/2",
            name: "register2",
            component: () => import("@/views/login/register2.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "注册",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/register/3",
            name: "register3",
            component: () => import("@/views/login/register3.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "注册",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/register/4",
            name: "register4",
            component: () => import("@/views/login/register4.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "注册",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/register/5",
            name: "register5",
            component: () => import("@/views/login/register5.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "注册",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/resetPassword",
            name: "resetPassword",
            component: () => import("@/views/login/resetPassword.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "修改密码",
                isMember: false,
                isLogin: false
            }
        },
        // 个人中心
        {
            path: "/setting",
            name: "setting",
            component: () => import("@/views/mine/setting.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "资料设置",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/fansList/:type/:userid?",
            name: "fansList",
            component: () => import("@/views/mine/fansList.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "粉丝/关注",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/wallet",
            name: "wallet",
            component: () => import("@/views/mine/wallet.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "我的钱包",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/bankCardList",
            name: "bankCardList",
            component: () => import("@/views/mine/bankCardList.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "银行卡管理",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/addBankCard",
            name: "addBankCard",
            component: () => import("@/views/mine/addBankCard.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "添加银行卡",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/withdraw",
            name: "withdraw",
            component: () => import("@/views/mine/withdraw.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "提现",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/recharge",
            name: "recharge",
            component: () => import("@/views/mine/recharge.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "充值",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/mygift",
            name: "mygift",
            component: () => import("@/views/mine/mygift.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "我的礼物",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/square/:type?",
            name: "square",
            component: () => import("@/views/community/square.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "广场",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/dynamicDetail/:id",
            name: "dynamicDetail",
            component: () => import("@/views/community/dynamicDetail.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "动态详情",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/chat/:userid",
            name: "chat",
            component: () => import("@/views/message/chat.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "与Ta聊天",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/messageList",
            name: "messageList",
            component: () => import("@/views/message/messageList.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "我的消息",
                isMember: false,
                isLogin: true
            }
        },
        {
            path: "/pkList",
            name: "pkList",
            component: () => import("@/views/pk/pkList.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "挑战列表",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/pkDetails/:id",
            name: "pkDetails",
            component: () => import("@/views/pk/pkDetails.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "挑战详情",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/pkResult",
            name: "pkResult",
            component: () => import("@/views/pk/pkResult.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "挑战结果",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/coupons",
            name: "coupons",
            component: () => import("@/views/coupons/coupons.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "卡券-积分兑换商城",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/pkManito/:id",
            name: "pkManito",
            component: () => import("@/views/pk/pkManito.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "我要挑战",
                isMember: false,
                isLogin: false
            }
        },
        {
            path: "/task",
            name: "task",
            component: () => import("@/views/task/task.vue"),
            meta: {
                keepAlive: false,
                isTransition: true,
                title: "任务中心",
                isMember: false,
                isLogin: false
            }
        }
    ]

});
router.beforeEach((to, from, next) => {
    if (to.meta.isLogin) {
        if (!window.localStorage.getItem('token')) {
            if (from.name == "login") {
                router.push('/')
            } else {
                Toast.fail('你还没有登录，请登录后再操作！')
                setTimeout(() => {
                    router.push('/login/' + from.name)
                }, 1000);

            }
        } else {
            next()
        }
        if (to.meta.isMember) {
            if (!window.localStorage.getItem('token')) {
                router.push('/login/' + from.name)
            } else {
                if (store.state.isMember) {
                    next()
                } else {
                    Toast.fail('你还不是会员，请购买会员后再操作！')
                    setTimeout(() => {
                        router.push('/buymember')
                    }, 1000);
                }
            }
        }
    } else {
        next()
    }
})

router.afterEach(route => {

    // console.log(route)
    // console.log("跳转")
})

export default router;
