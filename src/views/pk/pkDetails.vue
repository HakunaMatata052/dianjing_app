<template>
    <div class="container">
        <navBar/>
        <div class="main">
            <div class="pk_chunk">
                <div class="odd">对战游戏类型：<span>王者荣耀</span></div>
                <div class="even">游戏ID (昵称)：<span>李白</span></div>
                <div class="odd">挑战金： <span class="number" v-text="1000+'元'"></span></div>
                <div class="even">个人对决赛</div>
                <div class="odd">可接受挑战时间段：<span class="date">15:30-18:30</span></div>
            </div>

            <div class="pk_chunk2">
                <div>对战规则：</div>
                <div>对战规则对战规则对战规则对战规则对战规则对战规则对战规则对战规则对战规对战规则对战规则对战规则对战规则对战规则对战规则对战规则对战规则对战规则对战规则</div>
            </div>

            <div class="pk_chunk3">
                <div class="bottom">挑战TA</div>
            </div>
        </div>
    </div>
</template>

<script>
    import navBar from "@/components/navbar/navbar.vue"

    export default {
        name: "pkDetails",
        components: {
            navBar
        },
        data() {
            return {};
        },
        methods: {}
    };
</script>

<style lang="less" scoped>
    .pk_chunk {
        margin-top: 15.5px;
        line-height: 40px;
        font-size: 15px;
        text-indent: 15.5px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);

        > div {
            .number {
                color: rgba(238, 0, 0, 1);
                font-weight: bold;
            }

            .date {
                color: rgba(153, 153, 153, 1);
            }
        }

        .odd {
            background: white;
        }

        .even {
            background: #fafafa;
        }
    }

    .pk_chunk2 {
        margin-top: 15.5px;
        padding: 18.5px 15.5px 40px 15.5px;
        background-color: white;

        > div:nth-child(1) {
            font-size: 15px;
            line-height: 30px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
        }

        > div:nth-child(2) {
            height: 67px;
            font-size: 13px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
        }
    }

    .pk_chunk3 {
        padding: 60px 0;
        text-align: center;

        > div {
            width: 270px;
            height: 44px;
            line-height: 44px;
            background: rgba(255, 217, 72, 1);
            border-radius: 5px;
            font-size: 17px;
            margin: 0 auto;
            font-weight: bold;
            color: #333;
        }
    }
</style>
