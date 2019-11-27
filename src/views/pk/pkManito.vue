<template>
    <div class="container">
        <navBar/>
        <div class="main">
            <div class="chunk">
                <img src="../../assets/images/img1.png" alt="">
                <div>仲喵_MG</div>
                <div>ID:19901220</div>
                <div>首单返12元上车找主播加群</div>
                <div>挑战TA</div>
            </div>
            <div class="chunk2">
                <van-cell class="pkManito__van-cell hook" title="对战游戏类型" value="王者荣耀"/>
                <van-cell class="pkManito__van-cell" is-link title="对战局数" @click="showPopup"
                          :value="gameNumber + '局'"></van-cell>
                <van-cell size="large" title="个人/团队">
                    <van-radio-group v-model="form.isGroup" class="radio">
                        <van-radio :name="0" :checked-color="$store.state.color">个人</van-radio>
                        <van-radio :name="1" :checked-color="$store.state.color">团队</van-radio>
                    </van-radio-group>
                </van-cell>
                <van-popup class="pkManito__van-cell"
                           v-model="show"
                           position="bottom"
                           :style="{ height: '40%' }">
                    <van-picker :columns="columns" @change="onChange"/>
                </van-popup>
                <van-cell-group class="pkManito__van-cell">
                    <van-field class="pkManito__van-field"
                               v-model="gameId"
                               label="游戏ID(昵称)"
                               placeholder="请输入游戏ID(昵称)"
                    />
                </van-cell-group>
                <van-cell-group class="pkManito__van-cell">
                    <van-field class="pkManito__van-field"
                               v-model="pkNumber"
                               label="团队人数"
                               placeholder="请输入团队人数"
                    />
                </van-cell-group>
            </div>
            <div class="chunk3">
                <div class="remark">
                    备注： <br>
                    为了挑战赛顺利进行及结果判定，备注信息请填写完整。 <br>
                    备注包括：游戏终端、服务器、输赢判定规则等...
                </div>
                <div>确认挑战即同意《XXX用户协议》</div>
            </div>
            <div class="chunk4">
                <span v-text="1000 + '金币'"></span>
                <div>确定支付</div>
            </div>
        </div>
    </div>
</template>

<script>
    import navBar from "@/components/navbar/navbar.vue"

    export default {
        components: {
            navBar
        },
        data() {
            return {
                columns: [1, 2, 3, 4, 5], // 局数数组
                show: false, // 局数的显示隐藏
                gameId: null, // 游戏id
                gameNumber: 2, // 游戏数量
                pkNumber: null, // pk数量
                form: {
                    isGroup: 0,
                    startTimeStr: "",
                    endTimeStr: ""
                },
            };
        },
        methods: {
            showPopup() {
                this.show = true;
            },
            onChange(picker, value, index) {
                this.gameNumber = value
                this.show = false;
            }
        }
    }
</script>

<style lang="less">
    .pkManito__van-field {
        input {
            text-align: right;
        }
    }

    .pkManito__van-cell {
        .van-cell__title{
            font-weight: 500;
            font-size: 15px;
        }
        .van-field__body{
            font-weight: 500;
            font-size: 15px;
        }
        font-weight: 500;
        font-size: 15px;
    }

    .pkManito__van-cell.hook {
        .van-cell__value {
            color: #333;
        }
    }
</style>

<style lang="less" scoped>
    .main {
        line-height: 1;
    }

    .radio {
        display: flex;
        justify-content: space-around;
    }

    .chunk {
        text-align: center;
        padding: 15px 0 25px 0;

        img {
            width: 60px;
            height: 60px;
            display: block;
            border-radius: 100px;
            background-color: white;
            margin: 0 auto;
        }

        div:nth-child(2) {
            margin-top: 5px;
            font-size: 14px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);

        }

        div:nth-child(3) {
            margin-top: 5px;
            font-size: 10px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);

        }

        div:nth-child(4) {
            margin-top: 10px;
            font-size: 12px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
        }
        div:nth-child(5){
            transform:rotate(-10deg);
            position: fixed;
            top: 150px;
            left: 140px;
            color: #ec5e6a;
            border: 1px solid #ec5e6a;
            font-size: 18px;
            width:89px;
            line-height: 36px;
            height:36px;
            border-radius: 5px;
        }
    }

    .chunk3 {
        margin-top: 15px;
        padding-bottom: 122px;

        .remark {
            padding: 15.5px 0 32px 14px;
            font-size: 13px;
            font-weight: 400;
            color: rgba(179, 179, 179, 1);
            line-height: 20px;
            background-color: white;
        }

        div:nth-child(2) {
            font-size: 13px;
            color: rgba(153, 153, 153, 1);
            text-align: center;
            margin-top: 15px;
        }
    }

    .chunk4 {
        background-color: white;
        position: fixed;
        bottom: 0;
        width: 100%;
        font-size: 0;

        span {
            display: inline-block;
            vertical-align: top;
            width: 255px;
            text-indent: 112.5px;
            height: 49px;
            line-height: 49px;
            font-size: 17px;
            font-weight: bold;
            color: rgba(255, 78, 77, 1);
        }

        div {
            display: inline-block;
            vertical-align: top;
            width: 120px;
            height: 49px;
            line-height: 49px;
            text-align: center;
            background: rgba(255, 217, 72, 1);
            font-size: 14px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);

        }
    }

</style>
