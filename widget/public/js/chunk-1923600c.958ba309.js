(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1923600c"],{"20fd":function(t,n,e){"use strict";var a=e("d9f6"),o=e("aebd");t.exports=function(t,n,e){n in t?a.f(t,n,o(0,e)):t[n]=e}},2794:function(t,n,e){var a=e("a8f9");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=e("499e").default;o("72d844bc",a,!0,{})},4114:function(t,n,e){var a=e("eb75");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=e("499e").default;o("1485aae2",a,!0,{})},"4e60":function(t,n,e){"use strict";e.r(n);var a=e("cebc"),o=e("75fc"),i=(e("7f7f"),e("ac6a"),e("f3e2"),e("ff6f")),s={available:1,condition:"无使用门槛\n最多优惠12元",reason:"",value:150,name:"优惠券名称",startAt:1489104e3,endAt:1514592e3,valueDesc:"1.5",unitDesc:"金币"},r=(i["a"],{available:1,condition:"无使用门槛\n最多优惠12元",reason:"",value:150,name:"优惠券名称",startAt:1489104e3,endAt:1514592e3,valueDesc:"1.5",unitDesc:"金币"}),l={name:"downOrder",components:{navBar:i["a"]},computed:{dateTime:{get:function(){return new Date(this.form.publishDate)},set:function(t){this.form.publishDate=t}}},watch:{form:{handler:function(t,n){var e=this;this.loading=!0,this.$SERVER.getTotalMoney(t).then(function(t){e.loading=!1,e.price=t.data})},deep:!0}},data:function(){return{activePopupId:0,showPopup:!1,showCoupons:!1,datetime:new Date,price:0,balance:0,userInfo:{},form:{type:"请选择",abilityId:"",publishDate:(new Date).getTime(),playCount:0,remark:""},columns:[{text:"请选择",id:0,disabled:!0}],chosenCoupon:-1,coupons:[r],disabledCoupons:[r],loading:!1}},created:function(){var t=this;this.$SERVER.getUserInforById({userid:this.$route.params.userid}).then(function(n){t.userInfo=n.data}),this.$SERVER.userAbilityList({userid:this.$route.params.userid,pageNum:1,pageSize:9999}).then(function(n){var e=[];n.data.list.forEach(function(n){t.$route.params.id==n.abilityId&&(t.form.abilityId=t.$route.params.id,t.form.type=n.name+"-"+n.server+"-"+n.area),e.push({text:n.name+"-"+n.server+"-"+n.area,id:n.abilityId})}),t.columns=[].concat(Object(o["a"])(t.columns),e)}),this.$SERVER.getBalanceByUserId({userid:this.$store.state.userInfo.userid}).then(function(n){t.balance=n.data.balance})},methods:{showPopupFn:function(t){this.activePopupId=t,this.showPopup=!0},typeOnConfirm:function(t){this.form.abilityId=t.id,this.form.type=t.text,this.showPopup=!1},timeOnConfirm:function(t){var n=t.getTime();this.form.publishDate=n,this.showPopup=!1},time:function(t){return this.$METHOD.format(t,"MM月dd日 hh:mm")},onChangeCoupons:function(t){this.showCoupons=!1,this.chosenCoupon=t},onExchangeCoupons:function(t){this.coupons.push(r)},onSubmit:function(){var t=this;this.form.abilityId&&0!=this.form.abilityId.length?this.form.publishDate&&0!=this.form.publishDate.length?this.form.playCount&&0!=this.form.playCount.length?this.price>this.balance?this.$toast.fail("余额不足，请先充值！"):this.$SERVER.bookOrder(Object(a["a"])({userid:this.$store.state.userInfo.userid},this.form)).then(function(n){t.$toast.success(n.data),t.$router.push("/orderlist")}):this.$toast.fail("请选择游戏局数"):this.$toast.fail("请选择开始时间"):this.$toast.fail("请选择游戏品类")}}},c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container",attrs:{id:"order"}},[e("navBar"),t._v(" "),e("div",{staticClass:"main"},[e("div",{staticClass:"userinfo"},[e("div",{staticClass:"avatar"},[e("van-image",{attrs:{fit:"cover",width:"100%",height:"100%",src:t.userInfo.image}})],1),t._v(" "),e("div",{staticClass:"userinfo-right"},[e("h3",[t._v("\n          "+t._s(t.userInfo.nickname)+"\n          "),t.userInfo.level?e("div",{staticClass:"authentication"}):t._e(),t._v(" "),e("span",[t._v("ID:"+t._s(t.userInfo.userid))])]),t._v(" "),e("p",[t._v(t._s(t.userInfo.signname))])])]),t._v(" "),e("van-cell-group",{staticClass:"cell-group"},[e("van-cell",{attrs:{title:"类型",size:"large","is-link":"",value:t.form.type,"title-class":"duan-cell"},on:{click:function(n){t.showPopupFn(0)}}}),t._v(" "),e("van-cell",{attrs:{title:"时间",size:"large","is-link":"",value:t.$METHOD.format(t.form.publishDate,"MM月dd日 hh:mm")},on:{click:function(n){t.showPopupFn(1)}}}),t._v(" "),e("van-cell",{attrs:{title:"局数",size:"large"}},[e("van-stepper",{attrs:{integer:"",min:"1",max:"30"},model:{value:t.form.playCount,callback:function(n){t.$set(t.form,"playCount",n)},expression:"form.playCount"}})],1),t._v(" "),e("van-cell",{attrs:{title:"价格",size:"large",value:t.price+"金币"}}),t._v(" "),e("van-coupon-cell",{attrs:{currency:"",coupons:t.coupons,"chosen-coupon":t.chosenCoupon,size:"large"},on:{click:function(n){t.showCoupons=!0}}}),t._v(" "),e("van-field",{attrs:{label:"备注",type:"textarea",placeholder:"请输入备注",rows:"1",autosize:""},model:{value:t.form.remark,callback:function(n){t.$set(t.form,"remark",n)},expression:"form.remark"}})],1),t._v(" "),e("van-cell-group",[e("van-cell",{staticClass:"balance",attrs:{size:"large",value:t.form.type,to:"/","value-class":"duan-cell"}},[e("template",{slot:"default"},[e("div",{staticClass:"btn"},[t._v("立即充值")])]),t._v(" "),e("template",{slot:"title"},[e("span",[t._v("\n            钱包支付\n            "),e("small",[t._v("（余额 "+t._s(t.balance)+"金币）")])])])],2)],1),t._v(" "),t._m(0)],1),t._v(" "),e("van-submit-bar",{attrs:{"button-text":"确认支付",loading:t.loading},on:{submit:t.onSubmit}},[e("template",{slot:"default"},[e("span",{staticClass:"price"},[t._v(t._s(t.price)+"金币")])])],2),t._v(" "),e("van-popup",{attrs:{position:"bottom"},model:{value:t.showPopup,callback:function(n){t.showPopup=n},expression:"showPopup"}},[0==t.activePopupId?e("van-picker",{attrs:{"show-toolbar":"",columns:t.columns},on:{cancel:function(n){t.showPopup=!1},confirm:t.typeOnConfirm}}):t._e(),t._v(" "),1==t.activePopupId?e("van-datetime-picker",{attrs:{"min-date":new Date},on:{confirm:t.timeOnConfirm},model:{value:t.datetime,callback:function(n){t.datetime=n},expression:"datetime"}}):t._e()],1),t._v(" "),e("van-popup",{attrs:{position:"bottom"},model:{value:t.showCoupons,callback:function(n){t.showCoupons=n},expression:"showCoupons"}},[e("van-coupon-list",{attrs:{currency:"",coupons:t.coupons,"chosen-coupon":t.chosenCoupon,"disabled-coupons":t.disabledCoupons},on:{change:t.onChangeCoupons,exchange:t.onExchangeCoupons}})],1)],1)},u=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("p",{staticClass:"tips"},[t._v("\n      交易提示：\n      "),e("br"),t._v("此交易仅为娱乐陪玩，不承诺包赢\n    ")])}],d=e("2455");function f(t){e("2794")}var p=!1,h=f,v="data-v-4659db84",m=null,b=Object(d["a"])(l,c,u,p,h,v,m);n["default"]=b.exports},"549b":function(t,n,e){"use strict";var a=e("d864"),o=e("63b6"),i=e("241e"),s=e("b0dc"),r=e("3702"),l=e("b447"),c=e("20fd"),u=e("7cd6");o(o.S+o.F*!e("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var n,e,o,d,f=i(t),p="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,m=void 0!==v,b=0,g=u(f);if(m&&(v=a(v,h>2?arguments[2]:void 0,2)),void 0==g||p==Array&&r(g))for(n=l(f.length),e=new p(n);n>b;b++)c(e,b,m?v(f[b],b):f[b]);else for(d=g.call(f),e=new p;!(o=d.next()).done;b++)c(e,b,m?s(d,v,[o.value,b],!0):o.value);return e.length=b,e}})},"54a1":function(t,n,e){e("6c1c"),e("1654"),t.exports=e("95d5")},"75fc":function(t,n,e){"use strict";var a=e("a745"),o=e.n(a);function i(t){if(o()(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}var s=e("774e"),r=e.n(s),l=e("c8bb"),c=e.n(l);function u(t){if(c()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return r()(t)}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return i(t)||u(t)||d()}e.d(n,"a",function(){return f})},"774e":function(t,n,e){t.exports=e("d2d5")},"95d5":function(t,n,e){var a=e("40c3"),o=e("5168")("iterator"),i=e("481b");t.exports=e("584a").isIterable=function(t){var n=Object(t);return void 0!==n[o]||"@@iterator"in n||i.hasOwnProperty(a(n))}},a8f9:function(t,n,e){n=t.exports=e("2350")(!1),n.push([t.i,"\n.userinfo[data-v-4659db84] {\n  padding: 0.3rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.userinfo .avatar[data-v-4659db84] {\n  width: 1.2rem;\n  height: 1.2rem;\n  border-radius: 1rem;\n  overflow: hidden;\n  margin-right: 0.2rem;\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n}\n.userinfo h3[data-v-4659db84] {\n  font-size: 0.36rem;\n  font-weight: bold;\n  color: #333333;\n}\n.userinfo h3 img[data-v-4659db84] {\n  width: 0.24rem;\n  height: 0.26rem;\n}\n.userinfo h3 span[data-v-4659db84] {\n  font-size: 0.2rem;\n  font-weight: 400;\n  color: #999999;\n}\n.userinfo p[data-v-4659db84] {\n  font-size: 0.24rem;\n  font-weight: 500;\n  color: #999999;\n  padding: 0.1rem 0;\n}\n.btn[data-v-4659db84] {\n  border-radius: 0.6rem;\n  height: 100%;\n  padding: 0 0.2rem;\n  background: #ffc21c;\n  display: inline-block;\n  color: #333;\n}\nsmall[data-v-4659db84] {\n  color: #999999;\n  font-size: 0.28rem;\n}\n.cell-group[data-v-4659db84] {\n  margin-bottom: 0.2rem;\n}\n.tips[data-v-4659db84] {\n  font-size: 0.26rem;\n  font-weight: 400;\n  color: #999999;\n  line-height: 0.4rem;\n  padding: 0.3rem;\n  margin-bottom: 1rem;\n}\n.price[data-v-4659db84] {\n  font-size: 0.34rem;\n  font-weight: bold;\n  color: #ff4e4d;\n  line-height: 0.7rem;\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  padding: 0 0.3rem;\n}\n.balance[data-v-4659db84] {\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.duan-cell[data-v-4659db84] {\n  -webkit-box-flex: inherit;\n  -webkit-flex: inherit;\n      -ms-flex: inherit;\n          flex: inherit;\n}\n",""])},b00e:function(t,n,e){n=t.exports=e("2350")(!1),n.push([t.i,"\n.nobg .van-hairline--bottom::after {\n  border-bottom-width: 0;\n}\n",""])},c8bb:function(t,n,e){t.exports=e("54a1")},d2d5:function(t,n,e){e("1654"),e("549b"),t.exports=e("584a").Array.from},eb75:function(t,n,e){n=t.exports=e("2350")(!1),n.push([t.i,"\n.navbar[data-v-7aa0d3c6] {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 999;\n  background: #fff;\n}\n.navbar .title span[data-v-7aa0d3c6] {\n  font-weight: bold;\n}\n.navbar .left[data-v-7aa0d3c6],\n.navbar .right[data-v-7aa0d3c6] {\n  font-size: 0.4rem;\n}\n.navbar-empty[data-v-7aa0d3c6] {\n  height: 0.92rem;\n}\n/* 风格 */\n.nobg[data-v-7aa0d3c6] {\n  background: none;\n}\n.nobg .title[data-v-7aa0d3c6] {\n  color: #fff;\n}\n.nobg .left[data-v-7aa0d3c6] {\n  color: #fff !important;\n}\n",""])},f2d0:function(t,n,e){var a=e("b00e");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=e("499e").default;o("0274895e",a,!0,{})},ff6f:function(t,n,e){"use strict";e("386d"),String,Boolean,Boolean,Boolean,String;var a={name:"navbar",data:function(){return{top:"",searchShow:!1,value:"",searchEmptyShow:!1}},props:{title:{type:String,default:function(){return this.$route.meta.title},required:!1},goback:{type:Boolean,default:function(){return!0},required:!1},search:{type:Boolean,default:function(){return!1},required:!1},filter:{type:Boolean,default:function(){return!1},required:!1},stl:{type:String,default:function(){},required:!1}},components:{},mounted:function(){var t=this.$store.state.systemType;"android"==t&&(this.top=25),"ios"==t&&(this.top=40,this.searchEmptyShow=!0)},methods:{onClickLeft:function(){this.goback&&this.$router.go(-1)},openSearchFn:function(){this.search&&(this.searchShow=!0)},searchFn:function(){console.log("搜索")}}},o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{position:"relative"}},[e("div",{staticClass:"navbar",class:t.stl?t.stl:"",attrs:{id:"navbar"}},[e("div",{staticClass:"top",style:"padding-top:"+t.top+"px"}),t._v(" "),e("van-nav-bar",{staticStyle:{background:"none"},attrs:{"z-index":999},on:{"click-left":function(n){t.onClickLeft()},"click-right":function(n){t.openSearchFn()}}},[e("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[e("span",[t._v(t._s(t.title))]),t._v(" "),t._t("title")],2),t._v(" "),t.goback?e("van-icon",{staticClass:"left",attrs:{slot:"left",name:"arrow-left"},slot:"left"}):t._e(),t._v(" "),t.search?e("svg-icon",{staticClass:"right",attrs:{slot:"right","icon-class":"search"},slot:"right"}):t._t("right",null,{slot:"right"})],2)],1),t._v(" "),t.stl?t._e():e("div",{staticClass:"navbar-empty",style:"padding-top:"+t.top+"px"}),t._v(" "),e("van-popup",{attrs:{position:"top","get-container":"body"},model:{value:t.searchShow,callback:function(n){t.searchShow=n},expression:"searchShow"}},[t.searchEmptyShow&&!t.stl?e("div",{staticClass:"navbar-empty"}):t._e(),t._v(" "),e("van-search",{attrs:{placeholder:"请输入搜索关键词"},on:{blur:t.searchFn},model:{value:t.value,callback:function(n){t.value=n},expression:"value"}})],1)],1)},i=[],s=e("2455");function r(t){e("f2d0"),e("4114")}var l=!1,c=r,u="data-v-7aa0d3c6",d=null,f=Object(s["a"])(a,o,i,l,c,u,d);n["a"]=f.exports}}]);