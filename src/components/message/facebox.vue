<template>
  <scroller lock-x height="175px" ref="faceScroll">
    <div class="facebox">
      <div v-for="item in facelist" class="faceitem">
        <emotion is-gif @click.native="faceclick(item)">{{item}}</emotion>
      </div>
      <div v-for="item in spacelist" class="faceitem">
        <div class="vux-emotion"></div>
      </div>
    </div>
  </scroller>  
</template>

<script>
// import { Scroller, WechatEmotion as Emotion } from "vux";

import Scroller from 'vux/src/components/scroller'
import Emotion from 'vux/src/components/wechat-emotion'

export default {
  components: {
    Emotion,
    Scroller
  },
  data() {
    return {
      count: 0,
      spacelist: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      let w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      this.count =
        parseInt((w - 20) / 34) -
        this.facelist.length % parseInt((w - 20) / 34);
      for (let i = 0; i < this.count; i++) {
        this.spacelist.push("");
      }
    });
  },
  methods: {
    faceclick(item) {
      this.$emit("itemClick", item);
    }
  },
  props: ["facelist"]
};
</script>
<style lang="less" scoped>
div,
input,
button {
  box-sizing: border-box;
}
.weui-btn_primary{
  background: #4a93ec!important;
}
.weui-btn_primary:not(.weui-btn_disabled):active{
  background: #2f73c5!important;
}

.facebox {
  display: flex;
  padding: 10px;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.facebox .faceitem {
  display: block;
  margin: 5px;
}
.facebox .vux-emotion {
  width: 24px;
  height: 24px;
}
.funcbox {
  height: 175px;
  background: #FAFAFA;
  padding: 15px;
  width: 100%;
  overflow: hidden;
}
.funcbox .funcimg {
  display: block;
  margin: 0px auto;
  width: 42px;
  margin-bottom: 5px;
}
.funcbox .funclist {
  width: 25%;
  text-align: center;
  float: left;
  height: 70px;
  font-size: 10px;
  color: #666;
  margin-bottom: 10px;
}
</style>