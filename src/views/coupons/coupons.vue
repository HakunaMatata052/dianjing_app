<template>
    <div class="container">
        <navBar/>
        <div class="main">
            <div class="chunk">
                <div>3000</div>
                <div>我的积分</div>
                <div>了解兑换规则</div>
            </div>
            <div class="chunk2">
                <div class="min-title">
                    <div class="ic"></div>
                    <div class="text">积分兑换卡券</div>
                </div>
                <div class="wra">
                    <div class="card">
                        <div>限量</div>
                        <div>永久陪玩券</div>
                        <div>5w积分兑换</div>
                        <div>立即兑换</div>
                    </div>
                    <div class="card2">
                        <div>限量</div>
                        <div>永久陪玩券</div>
                        <div>5w积分兑换</div>
                        <div>立即兑换</div>
                    </div>
                    <div class="card3">
                        <div>限量</div>
                        <div>永久陪玩券</div>
                        <div>5w积分兑换</div>
                        <div>立即兑换</div>
                    </div>
                </div>
            </div>
            <div class="chunk3">
                <div class="min-title">
                    <div class="ic"></div>
                    <div class="text">轻松赚积分</div>
                </div>
                <div class="wra">
                    <div>
                        <span>svg</span>
                        <span>登录</span>
                        <span>+10积分</span>
                        <span v-show="1">已完成</span>
                        <span v-show="0">去发布</span>
                    </div>
                    <div>
                        <span>svg</span>
                        <span>发视频</span>
                        <span>+10积分</span>
                        <span v-show="0">已完成</span>
                        <span v-show="1">去发布</span>
                    </div>
                    <div>
                        <span>svg</span>
                        <span>发动态</span>
                        <span>+10积分</span>
                        <span v-show="0">已完成</span>
                        <span v-show="1">去发布</span>
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

    .min-title {
        padding: 14px 0;

        .ic {
            width: 3px;
            height: 17px;
            background: rgba(255, 217, 72, 1);
            border-radius: 2px;
            display: inline-block;
            vertical-align: top;
            margin-right: 10px;
        }

        .text {
            display: inline-block;
            vertical-align: top;
            font-size: 17px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
        }
    }

    .chunk {
        width: 375px;
        height: 125px;
        background: rgba(255, 217, 72, 1);
        font-size: 14px;
        line-height: 20px;
        text-align: center;

        div:nth-child(1) {
            font-size: 45px;
            line-height: 45px;
            font-weight: normal;
            color: rgba(51, 51, 51, 1);
            padding-top: 15px;
        }
    }

    .chunk2 {
        padding: 0 15px;

        .wra {
            overflow-y: scroll;
            white-space: nowrap;

            > div {
                width: 140px;
                height: 175px;

                border-radius: 5px;
                display: inline-block;
                margin-right: 10px;
                text-align: center;

                div:nth-child(1) {
                    width: 42px;
                    line-height: 18px;
                    height: 18px;
                    margin-top: 18px;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    font-size: 12px;
                }

                div:nth-child(2) {
                    margin: 22px auto 0 auto;
                    font-size: 20px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }

                div:nth-child(3) {
                    margin: 10px auto 0 auto;
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(255, 255, 255, 1);
                }

                div:nth-child(4) {
                    margin: 25px auto 0 auto;
                    width: 73px;
                    height: 24px;
                    line-height: 24px;
                    background: rgba(255, 217, 72, 1);
                    border-radius: 20px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                }
            }

            .card {
                background: linear-gradient(0deg, rgba(254, 106, 42, 1), rgba(253, 166, 43, 1));

                div:nth-child(1) {
                    background: rgba(255, 234, 0, 1);
                    color: rgba(254, 108, 42, 1);
                }
            }

            .card2 {
                background: linear-gradient(-9deg, rgba(98, 98, 255, 1), rgba(148, 148, 255, 1));

                div:nth-child(1) {
                    background: rgba(98, 98, 255, 1);
                    color: rgba(255, 255, 255, 1);
                }
            }

            .card3 {
                background: linear-gradient(-9deg, rgba(255, 214, 57, 1), rgba(255, 228, 124, 1));

                div:nth-child(1) {
                    background: rgba(51, 51, 51, 1);
                    color: rgba(255, 217, 72, 1);
                }
            }
        }
    }

    .chunk3 {
        padding: 0 15px;
        margin-top: 10px;

        .wra {
            > div {
                font-size: 0;
                line-height: 35px;
                padding: 10px 0;

                span {
                    vertical-align: top;
                    display: inline-block;
                    text-align: center;
                }

                span:nth-child(1) {
                    font-size: 14px;
                    width: 35px;
                    height: 35px;
                    background: rgba(254, 125, 79, 1);
                    border-radius: 15px;
                    line-height: 35px;

                    color: white;
                }

                span:nth-child(2) {
                    width: 150px;
                    text-indent: 10px;
                    text-align: left;
                    font-size: 15px;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                }

                span:nth-child(3) {
                    width: 80px;
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(232, 0, 0, 1);
                }

                span:nth-child(4) {
                    width: 75px;
                    height: 31px;
                    background: rgba(204, 204, 204, 1);
                    border-radius: 16px;
                    font-size: 13px;
                    line-height: 31px;
                    color: white;
                }

                span:nth-child(5) {
                    width: 75px;
                    height: 31px;
                    background: rgba(255, 217, 72, 1);
                    border-radius: 16px;
                    font-size: 13px;
                    line-height: 31px;
                    color: black;
                }
            }
        }

    }
</style>
