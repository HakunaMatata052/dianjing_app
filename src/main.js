import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import "./registerServiceWorker"; // pwa
import "@/common/styles/base.css"; // 样式初始化
// 全局样式
import "@/common/styles/mixin.less";
import "@/common/js/rem.js"; // 引入rem自适应
import "../public/js/api.js"; // 引入apiCloud-api
import "@/icons/index.js"; // 引入svg图标
// import * as method from "@/common/js/mixin.js"; // 引入全局方法
import API from "@/server/apis.js"; // 引入api接口
import VConsole from "vconsole";
import Navigation from "vue-navigation"
// import vueg from 'vueg'    
import touch from 'vue-directive-touch'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';  // vant图标库
Vue.use(Vant);
Vue.use(touch);
// Vue.use(vueg, router)     //←注意这一句应该在router实例化(router = new VueRouter({})之后
Vue.config.productionTip = false;
// 全局引入公用方法，也可以在组件中单独引入，推荐在组件中单独引入。
// Vue.prototype.$METHOD = method;
// 全局引入API
Vue.prototype.$SERVER = API;
// 引入路由记录插件
Vue.use(Navigation, {
  router,
  moduleName: "navigation",
  keyName: "AS"
});

// const isApp = true; // 手动切换
// alert(window.navigator.userAgent);
// 该判断只在云编译环境下才有效 使用isApp变量手动设置环境(ios必须要有测试包的情况下，才会携带apicloud标识)
// 标识可以在config.xml文件userAgent字段设置
if (window.navigator.userAgent.match(/APICloud/i)) {
// if (true) {
  window.apiready = function() {
    process.env.NODE_ENV === "development" && new VConsole()
    // 将API链接Vue原型，后续通过this.api代替window.api
    Vue.prototype.api = window.api;
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  };
} else {
  process.env.NODE_ENV === "development" // && new VConsole();
  window.api = {}
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
}
