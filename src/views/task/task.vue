<template>
    <div class="container">
        <navBar/>
        <div class="main">
            <div class="chunk">
                <div class="item">
                    <div>
                        <span>完成资料</span>
                        <br>
                        <span>首次完成 +10金币</span>
                    </div>
                    <div v-show="1">
                        <span>去完成</span>
                    </div>
                    <div v-show="0">
                        <span>已完成</span>
                    </div>
                </div>
                <div class="item" v-for="(i) in 3">
                    <div>
                        <span>其他任务</span>
                        <br>
                        <span>首次完成 +10金币</span>
                    </div>
                    <div v-show="0">
                        <span>去完成</span>
                    </div>
                    <div v-show="1">
                        <span>已完成</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navBar from "@/components/navbar/navbar.vue"

    export default {
        name: "coupons",
        components: {
            navBar
        },
        data() {
            return {};
        },
        methods: {}
    }
</script>

<style lang="less" scoped>
    .main {
        line-height: 1;
    }

    .main {
        .chunk {
            background-color: white;
            margin-top: 15px;
            padding-bottom: 60px;
            .item {
                font-size: 0;
                border-bottom: 1px solid #f5f5f5;
                padding: 0 20px;
                margin-bottom: 1px;

                > div {
                    display: inline-block;
                    vertical-align: top;
                    padding: 15px 0;
                }

                > div:nth-child(1) {
                    width: 260px;
                    font-size: 15px;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                }

                > div:nth-child(1) span:nth-child(3) {
                    font-size: 13px;
                    line-height: 20px;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                }

                > div:nth-child(2) {
                    width: 75px;

                    span {
                        display: inline-block;
                        text-align: center;
                        width: 75px;
                        height: 31px;
                        background: rgba(255, 217, 72, 1);
                        border-radius: 16px;
                        font-size: 13px;
                        line-height: 31px;
                        color: black;
                    }
                }

                > div:nth-child(3) {
                    width: 75px;

                    span {
                        display: inline-block;
                        text-align: center;
                        width: 75px;
                        height: 31px;
                        background: rgba(204, 204, 204, 1);
                        border-radius: 16px;
                        font-size: 13px;
                        line-height: 31px;
                        color: white;
                    }
                }
            }
        }
    }
</style>
