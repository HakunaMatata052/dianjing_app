import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    color: "#ffc21c",
    navAn:"slide-left",
    userInfo: {
      userid: ""
    },
    isMember: false,
    position: {}
  },
  mutations: {},
  actions: {}
});
