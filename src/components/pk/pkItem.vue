<template>
  <div class="item">
    <img :src="image" class="avatar" @click.stop="$router.push(`/accompanyDetail/${userId}`)"/>
    <h3>{{nickName}}</h3>
    <div class="vad">
      <div class="num">
        获胜
        <span>{{successCount}}</span>
      </div>
      <div class="num">
        <span>{{count-successCount}}</span>失败
      </div>
    </div>
    <div class="info">
      <dl>
        <dt>对战游戏</dt>
        <dd>{{gameName}}</dd>
      </dl>
      <dl>
        <dt>挑战金</dt>
        <dd>
          <span>{{amount}}金币</span>
        </dd>
      </dl>
      <dl>
        <dt>可接受挑战时间段</dt>
        <dd>{{$METHOD.format(startTime,"hh:mm")}}-{{$METHOD.format(endTime,"hh:mm")}}</dd>
      </dl>
    </div>
    <div class="btn" @click="$router.push('/pkDetails/'+id)">挑战TA</div>
  </div>
</template>

<script>
export default {
  props: ["id","image","nickName","count","successCount","userId","startTime","endTime","amount","gameName"]
};
</script>

<style lang="less" scoped>
.item {
  width: 171px;
  height: 235px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  text-align: center;
  margin-top: 35px;
  margin-bottom: 30px;
  padding-top: 32px;
  .avatar {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    display: block;
    border: 5px solid #fff;
    position: absolute;
    left: 50%;
    top: -32px;
    margin-left: -33px;
  }
  h3 {
    font-size: 13px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 40px;
  }
  .vad {
    display: flex;
    justify-content: space-between;
    background: url(../../assets/images/bg4.png) no-repeat center center;
    background-size: 100%;
    width: 140px;
    height: 27px;
    line-height: 27px;
    margin: 0 auto 10px;
    padding: 0 10px;
    .num {
      font-size: 12px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      &:last-child {
        color: #fff;
      }
      span {
        font-size: 18px;
        font-family: Bahnschrift;
        font-weight: bold;
        padding: 0 10px;
      }
    }
  }
  .info {
    dl {
      margin-bottom: 10px;
      dt {
        font-size: 13px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
      dd {
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        span {
          color: #ee0101;
        }
      }
    }
  }
  .btn {
    width: 100px;
    height: 35px;
    line-height: 35px;
    background: rgba(255, 217, 72, 1);
    box-shadow: 0px 5px 5px 0px rgba(87, 70, 4, 0.1);
    border-radius: 18px;
    margin: 0 auto;
    font-size: 15px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
  }
}
</style>