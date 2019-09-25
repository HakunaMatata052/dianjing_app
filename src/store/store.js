import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    tabActiveIndex: 0,  //当前一级导航
    systemType: "",   //系统类型 ios/Android
    color: "#ffc21c",   //全局颜色
    navAn:"slide-left",  
    userInfo: {
      userid: ""
    },
    isMember: false,   //是否是会员
    position: {      //默认定位
      lng:116.386446,
      lat:39.910286
    },  //用户定位
    newMessage: 0,
    register: {
      telephone: "",
      checknum: "",
      password: "",
      nickname: "",
      birthday: null,
      sex:null,
      image: null
    },
    qiniuaddr: "http://95youhe.com/",  //七牛地址
    wxcallback: "http://95youhe.com/gamePay/wxPayCallback"
  },
  mutations: {},
  actions: {}
});
