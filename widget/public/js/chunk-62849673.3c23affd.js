(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62849673"],{"2ae6":function(t,e,r){"use strict";r("4917");var i=r("8237"),o=r.n(i),s=(String,String,String,String,String,{props:{appearance:{type:String,default:function(){return"rectangle"},required:!1},mode:{type:String,default:function(){return"all"},required:!1},width:{type:String,default:function(){return window.navigator.userAgent.match(/APICloud/i)?String(api.winWidth):"100%"},required:!1},height:{type:String,default:function(){return window.navigator.userAgent.match(/APICloud/i)?String(api.winHeight):"100%"},required:!1},top:{type:String,default:function(){return"0"},required:!1}},computed:{clip:function(){return"circular"==this.appearance?{w:api.winWidth/2,y:150,borderColor:"#ff9694",borderWidth:0,appearance:"circular"}:{w:this.width,h:this.height,y:this.top,borderColor:"#ff9694",borderWidth:0}}},data:function(){return{safeArea:60,uploadShow:!1}},created:function(){window.navigator.userAgent.match(/APICloud/i)&&"ios"==this.$store.state.systemType&&(this.safeArea=this.safeArea+api.safeArea.bottom)},methods:{openLoadPopup:function(){var t=this;this.$store.state.systemType;if(t.uploadShow=!0,window.navigator.userAgent.match(/APICloud/i)){var e=api.require("FNImageClip");api.getPicture({sourceType:"album",encodingType:"jpg",mediaValue:"pic",destinationType:"url",allowEdit:!1,quality:50,saveToPhotoAlbum:!1},function(r,i){r&&r.data?e.open({rect:{x:0,y:0,w:api.winWidth,h:api.winHeight-t.safeArea},srcPath:r.data,style:{mask:"rgba(0,0,0,0.75)",clip:t.clip},mode:"image"},function(t,e){}):(t.$toast.fail("获取相册失败！"),t.uploadShow=!1)})}},closeUploadPopup:function(){if(window.navigator.userAgent.match(/APICloud/i)){this.uploadShow=!1;var t=api.require("FNImageClip");t.close()}},uploadFn:function(){var t=this;if(t.$toast.loading({duration:0,mask:!0,message:"加载中..."}),window.navigator.userAgent.match(/APICloud/i)){var e=api.require("FNImageClip");e.save({destPath:"fs://images//avatar"+(new Date).getTime()/1e3+".jpg",copyToAlbum:!1,quality:1},function(r,i){if(r){e.close(),t.uploadShow=!1;r.destPath;var s=api.require("qiniuUpfile");s.upfile({file:r.destPath,name:o()(r.destPath)+".jpg"},function(e,r){e.status&&"complete"==e.oper&&(t.$toast.clear(),t.$toast.success("上传成功！"),t.$emit("uploadSuccess",t.$store.state.qiniuaddr+e.info.key))})}})}}}}),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("van-popup",{staticClass:"upload",style:{height:t.safeArea+"px"},attrs:{position:"bottom"},model:{value:t.uploadShow,callback:function(e){t.uploadShow=e},expression:"uploadShow"}},[r("div",{staticClass:"btn-group"},[r("van-button",{staticClass:"btn",attrs:{type:"default",size:"large",hairline:!1},on:{click:t.closeUploadPopup}},[t._v("取消")]),t._v(" "),r("van-button",{staticClass:"btn",attrs:{type:"primary",size:"large",hairline:!1},on:{click:t.uploadFn}},[t._v("确定")])],1)])},n=[],h=r("2455");function u(t){r("3398")}var f=!1,c=u,l="data-v-24b229bb",p=null,d=Object(h["a"])(s,a,n,f,c,l,p);e["a"]=d.exports},3398:function(t,e,r){var i=r("b92e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=r("499e").default;o("d568091c",i,!0,{})},"3c35":function(t,e){(function(e){t.exports=e}).call(this,{})},8237:function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function(){"use strict";var ERROR="input is invalid type",WINDOW="object"===typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"===typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"===typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&"object"===typeof module&&module.exports,AMD=__webpack_require__("3c35"),ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!==typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"===typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t){return function(e){return new Md5(!0).update(e)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Md5},t.update=function(e){return t.create().update(e)};for(var e=0;e<OUTPUT_TYPES.length;++e){var r=OUTPUT_TYPES[e];t[r]=createOutputMethod(r)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"===typeof t)return crypto.createHash("md5").update(t,"utf8").digest("hex");if(null===t||void 0===t)throw ERROR;return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash("md5").update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod};function Md5(t){if(t)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var e=new ArrayBuffer(68);this.buffer8=new Uint8Array(e),this.blocks=new Uint32Array(e)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(t){if(!this.finalized){var e,r=typeof t;if("string"!==r){if("object"!==r)throw ERROR;if(null===t)throw ERROR;if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!Array.isArray(t)&&(!ARRAY_BUFFER||!ArrayBuffer.isView(t)))throw ERROR;e=!0}var i,o,s=0,a=t.length,n=this.blocks,h=this.buffer8;while(s<a){if(this.hashed&&(this.hashed=!1,n[0]=n[16],n[16]=n[1]=n[2]=n[3]=n[4]=n[5]=n[6]=n[7]=n[8]=n[9]=n[10]=n[11]=n[12]=n[13]=n[14]=n[15]=0),e)if(ARRAY_BUFFER)for(o=this.start;s<a&&o<64;++s)h[o++]=t[s];else for(o=this.start;s<a&&o<64;++s)n[o>>2]|=t[s]<<SHIFT[3&o++];else if(ARRAY_BUFFER)for(o=this.start;s<a&&o<64;++s)i=t.charCodeAt(s),i<128?h[o++]=i:i<2048?(h[o++]=192|i>>6,h[o++]=128|63&i):i<55296||i>=57344?(h[o++]=224|i>>12,h[o++]=128|i>>6&63,h[o++]=128|63&i):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++s)),h[o++]=240|i>>18,h[o++]=128|i>>12&63,h[o++]=128|i>>6&63,h[o++]=128|63&i);else for(o=this.start;s<a&&o<64;++s)i=t.charCodeAt(s),i<128?n[o>>2]|=i<<SHIFT[3&o++]:i<2048?(n[o>>2]|=(192|i>>6)<<SHIFT[3&o++],n[o>>2]|=(128|63&i)<<SHIFT[3&o++]):i<55296||i>=57344?(n[o>>2]|=(224|i>>12)<<SHIFT[3&o++],n[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],n[o>>2]|=(128|63&i)<<SHIFT[3&o++]):(i=65536+((1023&i)<<10|1023&t.charCodeAt(++s)),n[o>>2]|=(240|i>>18)<<SHIFT[3&o++],n[o>>2]|=(128|i>>12&63)<<SHIFT[3&o++],n[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],n[o>>2]|=(128|63&i)<<SHIFT[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[e>>2]|=EXTRA[3&e],e>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,t[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var t,e,r,i,o,s,a=this.blocks;this.first?(t=a[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,i=(-1732584194^2004318071&t)+a[1]-117830708,i=(i<<12|i>>>20)+t<<0,r=(-271733879^i&(-271733879^t))+a[2]-1126478375,r=(r<<17|r>>>15)+i<<0,e=(t^r&(i^t))+a[3]-1316259209,e=(e<<22|e>>>10)+r<<0):(t=this.h0,e=this.h1,r=this.h2,i=this.h3,t+=(i^e&(r^i))+a[0]-680876936,t=(t<<7|t>>>25)+e<<0,i+=(r^t&(e^r))+a[1]-389564586,i=(i<<12|i>>>20)+t<<0,r+=(e^i&(t^e))+a[2]+606105819,r=(r<<17|r>>>15)+i<<0,e+=(t^r&(i^t))+a[3]-1044525330,e=(e<<22|e>>>10)+r<<0),t+=(i^e&(r^i))+a[4]-176418897,t=(t<<7|t>>>25)+e<<0,i+=(r^t&(e^r))+a[5]+1200080426,i=(i<<12|i>>>20)+t<<0,r+=(e^i&(t^e))+a[6]-1473231341,r=(r<<17|r>>>15)+i<<0,e+=(t^r&(i^t))+a[7]-45705983,e=(e<<22|e>>>10)+r<<0,t+=(i^e&(r^i))+a[8]+1770035416,t=(t<<7|t>>>25)+e<<0,i+=(r^t&(e^r))+a[9]-1958414417,i=(i<<12|i>>>20)+t<<0,r+=(e^i&(t^e))+a[10]-42063,r=(r<<17|r>>>15)+i<<0,e+=(t^r&(i^t))+a[11]-1990404162,e=(e<<22|e>>>10)+r<<0,t+=(i^e&(r^i))+a[12]+1804603682,t=(t<<7|t>>>25)+e<<0,i+=(r^t&(e^r))+a[13]-40341101,i=(i<<12|i>>>20)+t<<0,r+=(e^i&(t^e))+a[14]-1502002290,r=(r<<17|r>>>15)+i<<0,e+=(t^r&(i^t))+a[15]+1236535329,e=(e<<22|e>>>10)+r<<0,t+=(r^i&(e^r))+a[1]-165796510,t=(t<<5|t>>>27)+e<<0,i+=(e^r&(t^e))+a[6]-1069501632,i=(i<<9|i>>>23)+t<<0,r+=(t^e&(i^t))+a[11]+643717713,r=(r<<14|r>>>18)+i<<0,e+=(i^t&(r^i))+a[0]-373897302,e=(e<<20|e>>>12)+r<<0,t+=(r^i&(e^r))+a[5]-701558691,t=(t<<5|t>>>27)+e<<0,i+=(e^r&(t^e))+a[10]+38016083,i=(i<<9|i>>>23)+t<<0,r+=(t^e&(i^t))+a[15]-660478335,r=(r<<14|r>>>18)+i<<0,e+=(i^t&(r^i))+a[4]-405537848,e=(e<<20|e>>>12)+r<<0,t+=(r^i&(e^r))+a[9]+568446438,t=(t<<5|t>>>27)+e<<0,i+=(e^r&(t^e))+a[14]-1019803690,i=(i<<9|i>>>23)+t<<0,r+=(t^e&(i^t))+a[3]-187363961,r=(r<<14|r>>>18)+i<<0,e+=(i^t&(r^i))+a[8]+1163531501,e=(e<<20|e>>>12)+r<<0,t+=(r^i&(e^r))+a[13]-1444681467,t=(t<<5|t>>>27)+e<<0,i+=(e^r&(t^e))+a[2]-51403784,i=(i<<9|i>>>23)+t<<0,r+=(t^e&(i^t))+a[7]+1735328473,r=(r<<14|r>>>18)+i<<0,e+=(i^t&(r^i))+a[12]-1926607734,e=(e<<20|e>>>12)+r<<0,o=e^r,t+=(o^i)+a[5]-378558,t=(t<<4|t>>>28)+e<<0,i+=(o^t)+a[8]-2022574463,i=(i<<11|i>>>21)+t<<0,s=i^t,r+=(s^e)+a[11]+1839030562,r=(r<<16|r>>>16)+i<<0,e+=(s^r)+a[14]-35309556,e=(e<<23|e>>>9)+r<<0,o=e^r,t+=(o^i)+a[1]-1530992060,t=(t<<4|t>>>28)+e<<0,i+=(o^t)+a[4]+1272893353,i=(i<<11|i>>>21)+t<<0,s=i^t,r+=(s^e)+a[7]-155497632,r=(r<<16|r>>>16)+i<<0,e+=(s^r)+a[10]-1094730640,e=(e<<23|e>>>9)+r<<0,o=e^r,t+=(o^i)+a[13]+681279174,t=(t<<4|t>>>28)+e<<0,i+=(o^t)+a[0]-358537222,i=(i<<11|i>>>21)+t<<0,s=i^t,r+=(s^e)+a[3]-722521979,r=(r<<16|r>>>16)+i<<0,e+=(s^r)+a[6]+76029189,e=(e<<23|e>>>9)+r<<0,o=e^r,t+=(o^i)+a[9]-640364487,t=(t<<4|t>>>28)+e<<0,i+=(o^t)+a[12]-421815835,i=(i<<11|i>>>21)+t<<0,s=i^t,r+=(s^e)+a[15]+530742520,r=(r<<16|r>>>16)+i<<0,e+=(s^r)+a[2]-995338651,e=(e<<23|e>>>9)+r<<0,t+=(r^(e|~i))+a[0]-198630844,t=(t<<6|t>>>26)+e<<0,i+=(e^(t|~r))+a[7]+1126891415,i=(i<<10|i>>>22)+t<<0,r+=(t^(i|~e))+a[14]-1416354905,r=(r<<15|r>>>17)+i<<0,e+=(i^(r|~t))+a[5]-57434055,e=(e<<21|e>>>11)+r<<0,t+=(r^(e|~i))+a[12]+1700485571,t=(t<<6|t>>>26)+e<<0,i+=(e^(t|~r))+a[3]-1894986606,i=(i<<10|i>>>22)+t<<0,r+=(t^(i|~e))+a[10]-1051523,r=(r<<15|r>>>17)+i<<0,e+=(i^(r|~t))+a[1]-2054922799,e=(e<<21|e>>>11)+r<<0,t+=(r^(e|~i))+a[8]+1873313359,t=(t<<6|t>>>26)+e<<0,i+=(e^(t|~r))+a[15]-30611744,i=(i<<10|i>>>22)+t<<0,r+=(t^(i|~e))+a[6]-1560198380,r=(r<<15|r>>>17)+i<<0,e+=(i^(r|~t))+a[13]+1309151649,e=(e<<21|e>>>11)+r<<0,t+=(r^(e|~i))+a[4]-145523070,t=(t<<6|t>>>26)+e<<0,i+=(e^(t|~r))+a[11]-1120210379,i=(i<<10|i>>>22)+t<<0,r+=(t^(i|~e))+a[2]+718787259,r=(r<<15|r>>>17)+i<<0,e+=(i^(r|~t))+a[9]-343485551,e=(e<<21|e>>>11)+r<<0,this.first?(this.h0=t+1732584193<<0,this.h1=e-271733879<<0,this.h2=r-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+e<<0,this.h2=this.h2+r<<0,this.h3=this.h3+i<<0)},Md5.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,i=this.h3;return HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,r=this.h2,i=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),e=new Uint32Array(t);return e[0]=this.h0,e[1]=this.h1,e[2]=this.h2,e[3]=this.h3,t},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var t,e,r,i="",o=this.array(),s=0;s<15;)t=o[s++],e=o[s++],r=o[s++],i+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[63&(t<<4|e>>>4)]+BASE64_ENCODE_CHAR[63&(e<<2|r>>>6)]+BASE64_ENCODE_CHAR[63&r];return t=o[s],i+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[t<<4&63]+"==",i};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}).call(this,__webpack_require__("4362"),__webpack_require__("c8ba"))},b92e:function(t,e,r){e=t.exports=r("2350")(!1),e.push([t.i,"\n.upload .btn-group[data-v-24b229bb] {\n  height: 100%;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n}\n.upload .btn-group .btn[data-v-24b229bb] {\n  height: 100%;\n}\n",""])}}]);