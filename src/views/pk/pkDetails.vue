<template>
    <div class="container">
        <navBar title="" stl="nobg"/>
        <div class="main">
            <div class="pk_chunk">
                <div>
                    <img class="user" src="https://github.githubassets.com/images/spinners/octocat-spinner-128.gif"
                         alt=""><br>
                    <span>周杰伦</span>
                </div>
                <div>
                    <img src="../../assets/images/pk_det_img2.png" alt="">
                </div>
                <div>
                    <img class="user" src="https://github.githubassets.com/images/spinners/octocat-spinner-128.gif"
                         alt=""><br>
                    <span>蔡旭辉</span>
                </div>
            </div>
            <div class="pk_chunk_2">
                <div>2019-08-31 16:08</div>
                <div>
                    对决游戏：
                    <span>王者荣耀</span>
                </div>
                <div>
                    游戏规则：
                    <span class="pk_chunk_2_content">王者荣耀王者荣耀王者荣耀王者荣耀王者荣耀王者荣耀</span>
                    <span class="pk_chunk_2_details">挑战详情</span>
                </div>
            </div>
            <div class="pk_chunk_3">
                <div>请选择对战结果</div>
                <div class="wra">
                    <div><img src="../../assets/images/pk_det_img3.png" alt=""></div>
                    <div><img src="../../assets/images/pk_det_img4.png" alt=""></div>
                    <div><img src="../../assets/images/pk_det_img5.png" alt=""></div>
                </div>
            </div>
            <div class="pk_chunk_4">
                <div>申请平台介入胜负判决</div>
                <div>
                    温馨提示：若双方对胜负产生分歧，可申请平台介入判决胜负。
                </div>
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
        height: 180px;
        background: url("../../assets/images/pk_det_img.png");
        background-size: 375px 180px;
        font-size: 0;
    }

    .pk_chunk div {
        display: inline-block;
        margin-top: 35px;
        text-align: center;
        margin-right: 20px;
    }

    .pk_chunk div .user {
        border: 5px solid #fff;
        border-radius: 100px;
    }

    .pk_chunk div:nth-child(1) {
        margin-left: 65px;
    }

    .pk_chunk div span {
        height: 15px;
        font-size: 15px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
    }

    .pk_chunk div img {
        width: 66px;
        height: 66px;
        display: inline-block;
        margin-bottom: 15px;
    }

    .pk_chunk div:nth-child(2) img {
        width: 60px;
        height: 90px;
    }

    .pk_chunk_2 {
        padding: 20px 15px 30px 15px;
        background-color: white;
    }

    .pk_chunk_2 div:nth-child(1) {
        height: 11px;
        font-size: 13px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        margin-bottom: 15px;
    }

    .pk_chunk_2 div:nth-child(2) {
        height: 15px;
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 15px;
    }

    .pk_chunk_2 div .pk_chunk_2_content {
        display: inline-block;
        vertical-align: top;
        width: 200px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden
    }

    .pk_chunk_2 div .pk_chunk_2_details {
        display: inline-block;
        vertical-align: top;
        text-decoration: underline;
        color: #FFD948;
    }

    .pk_chunk_2 div:nth-child(3) {
        height: 15px;
        font-size: 15px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 15px;
    }

    .pk_chunk_3 {
        padding: 20px 0;
        background-color: white;
        margin-top: 15px;
    }

    .pk_chunk_3 div:nth-child(1) {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        margin: 0 auto;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
    }

    .pk_chunk_3 .wra {
        font-size: 0;
        margin-top: 30px;
        display: flex;
    }

    .pk_chunk_3 .wra div {
        flex: 1;
        display: inline-block;
        vertical-align: bottom;
    }

    .pk_chunk_3 .wra div img {
        width: 100px;
        height: 132px;
        display: block;
        margin: 0 auto;
    }

    .pk_chunk_4 {
        padding: 30px 0 60px 0;
    }

    .pk_chunk_4 div:nth-child(1) {
        width: 220px;
        height: 44px;
        margin: 0 auto 20px auto;
        line-height: 44px;
        text-align: center;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
    }

    .pk_chunk_4 div:nth-child(2) {
        width: 340px;
        height: 13px;
        margin: 0 auto;
        font-size: 12px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
    }
</style>