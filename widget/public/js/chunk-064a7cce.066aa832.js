(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-064a7cce"],{"20fd":function(t,e,a){"use strict";var s=a("d9f6"),n=a("aebd");t.exports=function(t,e,a){e in t?s.f(t,e,n(0,a)):t[e]=a}},"3b1b":function(t,e,a){"use strict";a.r(e);var s=a("75fc"),n=a("ff6f"),l=a("78df"),i=(n["a"],l["a"],{name:"orderList",components:{navBar:n["a"],orderItem:l["a"]},data:function(){return{activeType:0,activeState:0,top:"",searchShow:!1,value:"",list:[],refreshLoading:!1,listLoading:!1,finished:!1,pageSize:20,pageNum:1,hasNextPage:!0}},created:function(){},methods:{getList:function(t){var e=this;if(t&&(e.pageNum=1,e.hasNextPage=!0),!e.hasNextPage)return e.refreshLoading=!1,e.listLoading=!1,void(this.finished=!0);e.$SERVER.getOrders({userid:e.$store.state.userInfo.userid,pageSize:e.pageSize,pageNum:e.pageNum,status:e.activeState,type:e.activeType}).then(function(a){e.pageNum=a.data.nextPage,e.hasNextPage=a.data.hasNextPage,e.finished=!a.data.hasNextPage,t?(e.list=a.data.list,e.refreshLoading=!1):(e.list=[].concat(Object(s["a"])(e.list),Object(s["a"])(a.data.list)),e.listLoading=!1)})}}}),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container",attrs:{id:"orderlist"}},[a("navBar",{attrs:{title:""}},[a("van-tabs",{staticClass:"title-tabs",attrs:{slot:"title",color:t.$store.state.color,"title-active-color":t.$store.state.color,animated:""},on:{click:function(e){t.getList(!0)}},slot:"title",model:{value:t.activeType,callback:function(e){t.activeType=e},expression:"activeType"}},[a("van-tab",{attrs:{title:"我的订单",name:1}}),t._v(" "),a("van-tab",{attrs:{title:"我的接单",name:2}})],1)],1),t._v(" "),a("div",{staticClass:"main"},[a("van-tabs",{attrs:{color:t.$store.state.color,"title-active-color":t.$store.state.color,animated:"","swipe-threshold":5},on:{click:function(e){t.getList(!0)}},model:{value:t.activeState,callback:function(e){t.activeState=e},expression:"activeState"}},[a("van-tab",{attrs:{title:"全部",name:0}}),t._v(" "),a("van-tab",{attrs:{title:"未接单",name:1}}),t._v(" "),a("van-tab",{attrs:{title:"进行中",name:2}}),t._v(" "),a("van-tab",{attrs:{title:"已完成",name:3}}),t._v(" "),a("van-tab",{attrs:{title:"已取消",name:4}})],1),t._v(" "),a("van-pull-refresh",{on:{refresh:function(e){t.getList(!0)}},model:{value:t.refreshLoading,callback:function(e){t.refreshLoading=e},expression:"refreshLoading"}},[a("van-list",{attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.getList},model:{value:t.listLoading,callback:function(e){t.listLoading=e},expression:"listLoading"}},[a("orderItem",{attrs:{list:t.list,type:t.activeType,state:t.activeState}})],1)],1)],1)],1)},o=[],c=a("2455");function d(t){a("4021")}var u=!1,f=d,v=null,p=null,g=Object(c["a"])(i,r,o,u,f,v,p);e["default"]=g.exports},4021:function(t,e,a){var s=a("c670");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=a("499e").default;n("1b3476e4",s,!0,{})},4114:function(t,e,a){var s=a("eb75");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=a("499e").default;n("1485aae2",s,!0,{})},"4f36":function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,"\n.cell-group[data-v-724ac6f8] {\n  margin-top: 0.2rem;\n}\n.cell-group .order-id[data-v-724ac6f8] {\n  font-size: 0.22rem;\n  font-weight: 500;\n  color: #999999;\n}\n.cell-group .order-state[data-v-724ac6f8] {\n  font-size: 0.22rem;\n  color: #ffd948;\n}\n.cell-group .label[data-v-724ac6f8] {\n  font-size: 0.26rem;\n  font-weight: 400;\n  color: #999999;\n  line-height: 0.7rem;\n}\n.cell-group .content[data-v-724ac6f8] {\n  font-size: 0.26rem;\n  font-weight: 500;\n  color: #333333;\n  line-height: 0.7rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.cell-group .content .user[data-v-724ac6f8] {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.cell-group .content span[data-v-724ac6f8] {\n  color: #999999;\n}\n.cell-group .avatar[data-v-724ac6f8] {\n  width: 0.44rem;\n  height: 0.44rem;\n  border-radius: 50%;\n  margin-right: 0.2rem;\n  overflow: hidden;\n  -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n          flex-shrink: 0;\n}\n.cell-group .cell[data-v-724ac6f8] {\n  padding: 0;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n}\n.cell-group .cell .cell-left[data-v-724ac6f8] {\n  width: 1.6rem;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n  padding: 0.06rem 0.3rem;\n  border-right: 0.02rem solid #ebedf0;\n  text-align: right;\n}\n.cell-group .cell .cell-right[data-v-724ac6f8] {\n  text-align: left;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0 0.3rem;\n}\n.order-item .btn-group[data-v-724ac6f8] {\n  background: #fff;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  padding: 0.3rem;\n  -webkit-justify-content: space-around;\n      -ms-flex-pack: distribute;\n          justify-content: space-around;\n}\n.order-item .btn-group .btn[data-v-724ac6f8] {\n  width: 2.8rem;\n  height: 0.66rem;\n  line-height: 0.66rem;\n  border-radius: 0.34rem;\n  font-size: 0.26rem;\n  font-weight: 500;\n  text-align: center;\n  border: 0.02rem solid #ffd948;\n  color: #999999;\n  margin: 0 0.2rem;\n}\n.order-item .btn-group .btn.emphasize[data-v-724ac6f8] {\n  background: #ffd948;\n  color: #333333;\n}\n",""])},"549b":function(t,e,a){"use strict";var s=a("d864"),n=a("63b6"),l=a("241e"),i=a("b0dc"),r=a("3702"),o=a("b447"),c=a("20fd"),d=a("7cd6");n(n.S+n.F*!a("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,a,n,u,f=l(t),v="function"==typeof this?this:Array,p=arguments.length,g=p>1?arguments[1]:void 0,h=void 0!==g,b=0,m=d(f);if(h&&(g=s(g,p>2?arguments[2]:void 0,2)),void 0==m||v==Array&&r(m))for(e=o(f.length),a=new v(e);e>b;b++)c(a,b,h?g(f[b],b):f[b]);else for(u=m.call(f),a=new v;!(n=u.next()).done;b++)c(a,b,h?i(u,g,[n.value,b],!0):n.value);return a.length=b,a}})},"54a1":function(t,e,a){a("6c1c"),a("1654"),t.exports=a("95d5")},"75fc":function(t,e,a){"use strict";var s=a("a745"),n=a.n(s);function l(t){if(n()(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}var i=a("774e"),r=a.n(i),o=a("c8bb"),c=a.n(o);function d(t){if(c()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return r()(t)}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return l(t)||d(t)||u()}a.d(e,"a",function(){return f})},"774e":function(t,e,a){t.exports=a("d2d5")},"78df":function(t,e,a){"use strict";a("c5f6"),Array,Number,Number;var s={props:{list:{type:Array,default:function(){return[]},required:!0},type:{type:Number,default:function(){return 0},required:!1},state:{type:Number,default:function(){return 0},required:!1}},methods:{updateOrderStatus:function(t,e){var a=this;this.$SERVER.updateOrderStatus({orderId:t,status:e}).then(function(t){a.$toast.success(t.data)})}}},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"order-list"},t._l(t.list,function(e,s){return a("div",{key:s,staticClass:"order-item"},[a("van-cell-group",{staticClass:"cell-group"},[a("van-cell",{attrs:{size:"large",center:!0}},[a("div",{staticClass:"order-id",attrs:{slot:"title"},slot:"title"},[t._v("订单编号："+t._s(e.orderId))]),t._v(" "),t.type?t._e():a("div",{staticClass:"order-state",attrs:{slot:"default"},slot:"default"},[t._v("订单状态：我已接单")])]),t._v(" "),a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[1===t.type?a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("预约大神")]):2===t.type?a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("服务对象")]):a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("用户")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[a("div",{staticClass:"user",on:{click:function(a){t.$router.push("/accompanyDetail/"+e.userId)}}},[a("van-image",{staticClass:"avatar",attrs:{fit:"cover",src:e.image||"img/avatar-w.png"}}),t._v("\n            "+t._s(e.nickName)+"\n          ")],1)])]),t._v(" "),a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("品类")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[t._v(t._s(e.name))])]),t._v(" "),a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("时间")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[t._v(t._s(t.$METHOD.format(e.publishDate,"MM月dd日 hh:mm")))])]),t._v(" "),a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("局数")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[t._v(t._s(e.playCount)+"局")])]),t._v(" "),a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("价格")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[t._v(t._s(e.totalMoney)+"币")])])],1),t._v(" "),a("div",{staticClass:"btn-group"},[e.customerUserId!==t.$store.state.userInfo.userid&&2===e.status?a("div",{staticClass:"btn emphasize",on:{click:function(a){t.updateOrderStatus(e.orderId,3)}}},[t._v("确认交易完成")]):t._e(),t._v(" "),e.customerUserId!==t.$store.state.userInfo.userid&&3===e.status?a("div",{staticClass:"btn emphasize"},[t._v("申请售后")]):t._e(),t._v(" "),e.customerUserId!==t.$store.state.userInfo.userid&&1===e.status?a("div",{staticClass:"btn emphasize"},[t._v("提醒接单")]):t._e(),t._v(" "),e.customerUserId===t.$store.state.userInfo.userid&&1===e.status?a("div",{staticClass:"btn emphasize",on:{click:function(a){t.updateOrderStatus(e.orderId,2)}}},[t._v("接受订单")]):t._e(),t._v(" "),e.customerUserId===t.$store.state.userInfo.userid&&1===e.status?a("div",{staticClass:"btn emphasize",on:{click:function(a){t.updateOrderStatus(e.orderId,4)}}},[t._v("拒接此单")]):t._e(),t._v(" "),t.type?a("div",{staticClass:"btn",on:{click:function(a){t.$router.push("/orderdetail/"+e.orderId)}}},[t._v("订单详情")]):t._e()]),t._v(" "),t.type?t._e():a("van-cell-group",{staticClass:"cell-group"},[a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("下单时间")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[t._v(t._s(t.$METHOD.format(e.createTime,"MM月dd日 hh:mm")))])]),t._v(" "),a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("过期时间")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[t._v("\n          "+t._s(t.$METHOD.format(e.publishDate,"MM月dd日 hh:mm"))+"\n          "),a("span",[t._v("过期即订单自动取消")])])]),t._v(" "),a("van-cell",{staticClass:"cell",attrs:{size:"large",center:!0,"title-class":"cell-left","value-class":"cell-right"}},[a("div",{staticClass:"label",attrs:{slot:"title"},slot:"title"},[t._v("备注")]),t._v(" "),a("div",{staticClass:"content",attrs:{slot:"default"},slot:"default"},[t._v(t._s(e.remark))])])],1)],1)}),0)},l=[],i=a("2455");function r(t){a("83e7")}var o=!1,c=r,d="data-v-724ac6f8",u=null,f=Object(i["a"])(s,n,l,o,c,d,u);e["a"]=f.exports},"83e7":function(t,e,a){var s=a("4f36");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=a("499e").default;n("1291c117",s,!0,{})},"95d5":function(t,e,a){var s=a("40c3"),n=a("5168")("iterator"),l=a("481b");t.exports=a("584a").isIterable=function(t){var e=Object(t);return void 0!==e[n]||"@@iterator"in e||l.hasOwnProperty(s(e))}},b00e:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,"\n.nobg .van-hairline--bottom::after {\n  border-bottom-width: 0;\n}\n",""])},c670:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,"",""])},c8bb:function(t,e,a){t.exports=a("54a1")},d2d5:function(t,e,a){a("1654"),a("549b"),t.exports=a("584a").Array.from},eb75:function(t,e,a){e=t.exports=a("2350")(!1),e.push([t.i,"\n.navbar[data-v-7aa0d3c6] {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 999;\n  background: #fff;\n}\n.navbar .title span[data-v-7aa0d3c6] {\n  font-weight: bold;\n}\n.navbar .left[data-v-7aa0d3c6],\n.navbar .right[data-v-7aa0d3c6] {\n  font-size: 0.4rem;\n}\n.navbar-empty[data-v-7aa0d3c6] {\n  height: 0.92rem;\n}\n/* 风格 */\n.nobg[data-v-7aa0d3c6] {\n  background: none;\n}\n.nobg .title[data-v-7aa0d3c6] {\n  color: #fff;\n}\n.nobg .left[data-v-7aa0d3c6] {\n  color: #fff !important;\n}\n",""])},f2d0:function(t,e,a){var s=a("b00e");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var n=a("499e").default;n("0274895e",s,!0,{})},ff6f:function(t,e,a){"use strict";a("386d"),String,Boolean,Boolean,Boolean,String;var s={name:"navbar",data:function(){return{top:"",searchShow:!1,value:"",searchEmptyShow:!1}},props:{title:{type:String,default:function(){return this.$route.meta.title},required:!1},goback:{type:Boolean,default:function(){return!0},required:!1},search:{type:Boolean,default:function(){return!1},required:!1},filter:{type:Boolean,default:function(){return!1},required:!1},stl:{type:String,default:function(){},required:!1}},components:{},mounted:function(){var t=this.$store.state.systemType;"android"==t&&(this.top=25),"ios"==t&&(this.top=40,this.searchEmptyShow=!0)},methods:{onClickLeft:function(){this.goback&&this.$router.go(-1)},openSearchFn:function(){this.search&&(this.searchShow=!0)},searchFn:function(){console.log("搜索")}}},n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{position:"relative"}},[a("div",{staticClass:"navbar",class:t.stl?t.stl:"",attrs:{id:"navbar"}},[a("div",{staticClass:"top",style:"padding-top:"+t.top+"px"}),t._v(" "),a("van-nav-bar",{staticStyle:{background:"none"},attrs:{"z-index":999},on:{"click-left":function(e){t.onClickLeft()},"click-right":function(e){t.openSearchFn()}}},[a("div",{staticClass:"title",attrs:{slot:"title"},slot:"title"},[a("span",[t._v(t._s(t.title))]),t._v(" "),t._t("title")],2),t._v(" "),t.goback?a("van-icon",{staticClass:"left",attrs:{slot:"left",name:"arrow-left"},slot:"left"}):t._e(),t._v(" "),t.search?a("svg-icon",{staticClass:"right",attrs:{slot:"right","icon-class":"search"},slot:"right"}):t._t("right",null,{slot:"right"})],2)],1),t._v(" "),t.stl?t._e():a("div",{staticClass:"navbar-empty",style:"padding-top:"+t.top+"px"}),t._v(" "),a("van-popup",{attrs:{position:"top","get-container":"body"},model:{value:t.searchShow,callback:function(e){t.searchShow=e},expression:"searchShow"}},[t.searchEmptyShow&&!t.stl?a("div",{staticClass:"navbar-empty"}):t._e(),t._v(" "),a("van-search",{attrs:{placeholder:"请输入搜索关键词"},on:{blur:t.searchFn},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1)],1)},l=[],i=a("2455");function r(t){a("f2d0"),a("4114")}var o=!1,c=r,d="data-v-7aa0d3c6",u=null,f=Object(i["a"])(s,n,l,o,c,d,u);e["a"]=f.exports}}]);