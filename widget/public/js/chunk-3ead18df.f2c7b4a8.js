(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ead18df"],{"107b":function(t,a,n){t.exports=n.p+"public/img/img1.bfd628aa.png"},5114:function(t,a,n){t.exports=n.p+"public/img/notice.4ca3e708.png"},"5ce9":function(t,a,n){var e=n("ba6d");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=n("499e").default;i("6c26b327",e,!0,{})},"69ba":function(t,a,n){a=t.exports=n("2350")(!1),a.push([t.i,"\n#home .van-tabs__nav {\n  width: 60%;\n  margin: auto;\n}\n",""])},"6bba":function(t,a,n){t.exports=n.p+"public/img/img2.0d375ff5.png"},"758d":function(t,a,n){"use strict";n.r(a);var e=n("cebc"),i=n("1fba"),r=n("ff6f"),s=n("7a80"),c=n("68aa"),o=(r["a"],s["a"],c["a"],{name:"home",data:function(){return{activeTabs:0,bannerList:[],expressList:{},AccompanyList1:[],AccompanyList2:[],AccompanyList3:[],isLoading:!1,refreshNum:0}},components:{navBar:r["a"],gameList:s["a"],"accompany-list":c["a"]},watch:{refreshNum:function(t,a){3==t&&(this.isLoading=!1,this.refreshNum=0)},activeTabs:function(){this.getAccompanyList()}},created:function(){this.getAccompanyList(),this.getExpress(),this.getBanners()},deactivated:function(){document.querySelector(".view-container").style.filter="blur(0px)"},methods:{onrefresh:function(){var t=this;this.getAccompanyList(function(){t.refreshNum++}),this.getExpress(function(){t.refreshNum++}),this.getBanners()},getAccompanyList:function(t){var a=this;this.$SERVER.getUserList(Object(e["a"])({pageNum:1,pageSize:15,userType:this.activeTabs},this.$store.state.position)).then(function(n){a.isLoading=!1,a.AccompanyList1=n.data.list.slice(0,5),a.AccompanyList2=n.data.list.slice(5,10),a.AccompanyList3=n.data.list.slice(10,15),a.$nextTick(function(){a.scroll=new i["a"](a.$refs.wrapper1,{scrollX:!0,scrollY:!1,eventPassthrough:"vertical",freeScroll:!0}),a.scroll=new i["a"](a.$refs.wrapper2,{scrollX:!0,scrollY:!1,eventPassthrough:"vertical",freeScroll:!0}),a.scroll=new i["a"](a.$refs.wrapper3,{scrollX:!0,scrollY:!1,eventPassthrough:"vertical",freeScroll:!0})}),t&&t()})},getExpress:function(t){var a=this;this.$SERVER.getExpress({pageNum:1,pageSize:10}).then(function(n){a.expressList=n.data.list[0],t&&t()})},getBanners:function(){var t=this,a=this.$METHOD.getStore("head_img");a&&0!=a.length?this.bannerList=JSON.parse(a):this.$SERVER.getBanners().then(function(a){t.$METHOD.setStore("head_img",a.data.head_img),t.$METHOD.setStore("merchant_img",a.data.merchant_img),t.bannerList=a.data.head_img})},goExpress:function(t){console.log(t)},goAccompany:function(){this.$router.push("/accompany")},tabsFn:function(t){this.activeTabs=t}}}),l=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container",attrs:{id:"home"}},[e("navBar",{attrs:{goback:!1,search:!0}}),t._v(" "),e("div",{staticClass:"main"},[e("van-pull-refresh",{on:{refresh:t.onrefresh},model:{value:t.isLoading,callback:function(a){t.isLoading=a},expression:"isLoading"}},[e("van-swipe",{staticClass:"banner",attrs:{autoplay:3e3}},t._l(t.bannerList,function(t,a){return e("van-swipe-item",{key:a},[e("img",{attrs:{src:t.url}})])}),1),t._v(" "),e("div",{staticClass:"box",staticStyle:{padding:"0"}},[e("van-row",{staticClass:"notice",staticStyle:{"align-items":"center"},attrs:{type:"flex",justify:"center"}},[e("van-col",{staticStyle:{"border-right":"1px dashed #ebedf0"},attrs:{span:"5"}},[e("img",{staticClass:"notice-img",attrs:{src:n("5114")}})]),t._v(" "),e("van-col",{attrs:{span:"19"},on:{click:function(a){t.goExpress(t.expressList.id)}}},[e("h3",{staticClass:"notice-title"},[t._v(t._s(t.expressList.title))]),t._v(" "),e("p",{staticClass:"notice-des"},[t._v(t._s(t.expressList.content))])])],1),t._v(" "),e("van-grid",{staticClass:"grid",attrs:{border:!0,"column-num":3,square:!0}},[e("van-grid-item",{on:{click:function(a){t.$router.push("/square")}}},[e("img",{attrs:{src:n("107b")}})]),t._v(" "),e("van-grid-item",[e("img",{attrs:{src:n("6bba")}})]),t._v(" "),e("van-grid-item",[e("img",{attrs:{src:n("fbf3")}})])],1)],1),t._v(" "),e("gameList",{attrs:{activeTabs:t.activeTabs},on:{tabs:t.tabsFn}}),t._v(" "),e("div",{staticClass:"box accompany"},[e("div",{staticClass:"accompany-title"},[0==t.activeTabs?e("h2",[t._v("美女陪练")]):t._e(),t._v(" "),1==t.activeTabs?e("h2",[t._v("大神陪练")]):t._e()]),t._v(" "),e("div",{ref:"wrapper1",staticClass:"wrapper"},[e("accompany-list",{attrs:{accompanyList:t.AccompanyList1,scrollX:!0}})],1),t._v(" "),e("div",{ref:"wrapper2",staticClass:"wrapper"},[e("accompany-list",{attrs:{accompanyList:t.AccompanyList2,scrollX:!0}})],1),t._v(" "),e("div",{ref:"wrapper3",staticClass:"wrapper"},[e("accompany-list",{attrs:{accompanyList:t.AccompanyList3,scrollX:!0}})],1)])],1)],1)],1)},m=[],d=n("2455");function g(t){n("c6e6"),n("5ce9")}var b=!1,p=g,f="data-v-4b304b00",h=null,u=Object(d["a"])(o,l,m,b,p,f,h);a["default"]=u.exports},b3ed:function(t,a){t.exports="data:image/png;base64,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"},ba6d:function(t,a,n){var e=n("b041");a=t.exports=n("2350")(!1),a.push([t.i,"\n.banner[data-v-4b304b00] {\n  margin-top: 0.2rem;\n}\n.banner img[data-v-4b304b00] {\n  width: 100%;\n  height: 4rem;\n}\n.more[data-v-4b304b00] {\n  font-size: 0.22rem;\n  font-weight: 400;\n  color: #999999;\n}\n.more .more-ico[data-v-4b304b00] {\n  font-size: 0.22rem;\n  font-weight: 400;\n  color: #999999;\n}\n.notice[data-v-4b304b00] {\n  padding: 0.2rem 0.2rem;\n}\n.notice .notice-img[data-v-4b304b00] {\n  padding: 0 0.1rem;\n  width: 1.2rem;\n  height: auto;\n}\n.notice .notice-title[data-v-4b304b00] {\n  font-size: 0.28rem;\n  padding: 0 0.2rem;\n}\n.notice .notice-des[data-v-4b304b00] {\n  padding: 0.1rem 0.2rem;\n  font-size: 0.2rem;\n  color: #999;\n}\n.accompany[data-v-4b304b00] {\n  padding: 0.2rem;\n  background-image: url("+e(n("48ed"))+");\n  background-repeat: no-repeat;\n  background-position: left 0.2rem;\n  background-size: 0.4rem;\n}\n.accompany .accompany-title[data-v-4b304b00] {\n  padding: 0 0 0.2rem 0.2rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 0.28rem;\n  font-weight: bold;\n  color: #333333;\n}\n.accompany .accompany-title h2[data-v-4b304b00] {\n  font-size: 0.36rem;\n  font-weight: bold;\n}\n.accompany .wrapper[data-v-4b304b00] {\n  width: 100%;\n  overflow: hidden;\n}\n.ad[data-v-4b304b00] {\n  padding: 0.2rem;\n}\n.ad .ad-img[data-v-4b304b00] {\n  width: 100%;\n  border-radius: 0.4rem;\n  overflow: hidden;\n}\n.match[data-v-4b304b00] {\n  padding: 0.2rem;\n  margin-bottom: 0.6rem;\n  background-image: url("+e(n("b3ed"))+");\n  background-repeat: no-repeat;\n  background-position: 0.2rem;\n  background-size: 0.8rem;\n}\n.match .match-title[data-v-4b304b00] {\n  padding: 0 0 0.2rem 0.8rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 0.28rem;\n}\n.match .match-title h2[data-v-4b304b00] {\n  font-size: 0.36rem;\n  font-weight: bold;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.match .match-title h2 span[data-v-4b304b00] {\n  font-size: 0.28rem;\n  color: #999;\n  margin-left: 0.2rem;\n}\n.match .match-list .match-item[data-v-4b304b00] {\n  position: relative;\n  border-radius: 0.1rem;\n  overflow: hidden;\n  margin-bottom: 0.2rem;\n}\n.match .match-list .match-item .match-img[data-v-4b304b00] {\n  width: 100%;\n  height: 4rem;\n}\n.match .match-list .match-item .tag-list[data-v-4b304b00] {\n  position: absolute;\n  left: 0.2rem;\n  top: 0.2rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.match .match-list .match-item .tag-list .match-tag[data-v-4b304b00] {\n  margin-right: 0.2rem;\n  height: 0.4rem;\n}\n.match .match-list .match-item .tag-list .match-tag img[data-v-4b304b00] {\n  height: 100%;\n}\n.match .match-list .match-item .watch[data-v-4b304b00] {\n  position: absolute;\n  right: 0.2rem;\n  top: 0.2rem;\n  background: rgba(0, 0, 0, 0.5);\n  padding: 0.1rem 0.2rem;\n  color: #fff;\n  border-radius: 1rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  font-size: 0.22rem;\n}\n.match .match-list .match-item .watch i[data-v-4b304b00] {\n  margin-right: 0.1rem;\n}\n.match .match-list .match-item .title[data-v-4b304b00] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 50%;\n  color: #fff;\n  padding: 0.1rem 0.2rem;\n  font-size: 0.26rem;\n  background: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, 0.6)), to(rgba(0, 0, 0, 0)));\n  background: -webkit-linear-gradient(left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));\n  background: -o-linear-gradient(left, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));\n  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));\n}\n.match .match-list .match-item .see[data-v-4b304b00] {\n  position: absolute;\n  right: 0.2rem;\n  bottom: 0.2rem;\n  color: #fff;\n  padding: 0.1rem 0.4rem;\n  border-radius: 1rem;\n  background: -webkit-gradient(linear, left top, right top, from(#ff376d), to(#ff8c5a));\n  background: -webkit-linear-gradient(left, #ff376d, #ff8c5a);\n  background: -o-linear-gradient(left, #ff376d, #ff8c5a);\n  background: linear-gradient(to right, #ff376d, #ff8c5a);\n  font-size: 0.26rem;\n}\n.grid img[data-v-4b304b00] {\n  width: auto;\n  height: 1.6rem;\n}\n",""])},c6e6:function(t,a,n){var e=n("69ba");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=n("499e").default;i("1cfcc5a6",e,!0,{})},fbf3:function(t,a,n){t.exports=n.p+"public/img/img3.10afbdc9.png"}}]);