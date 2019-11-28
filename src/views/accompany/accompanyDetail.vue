<template>
    <div class="container" id="accompanyDetail">
        <navBar :stl="nobg">
            <van-icon
                    class-prefix="icon"
                    name="camera"
                    color="rgba(255,255,255,.6)"
                    class="camera"
                    slot="right"
                    @click="uploadBackimage"
                    v-if="$route.params.userid==$store.state.userInfo.userid"
            />
        </navBar>
        <div class="main">
            <div
                    ref="userbg"
                    class="userbg"
                    :style="'background: url('+ (userInfo.backimage || 'https://picsum.photos/500/500') + ') no-repeat center center'"
            ></div>
            <van-pull-refresh
                    v-model="isLoading"
                    @refresh="isLoading = false"
                    pulling-text=" "
                    loosing-text=" "
                    loading-text=" "
                    success-text=" "
                    :head-height="300"
                    class="refresh"
            >
                <div class="userinfo">
                    <div class="avatar">
                        <img :src="userInfo.image"/>
                        <div class="authentication" v-if="userInfo.level"></div>
                    </div>
                    <div class="username">
                        {{userInfo.nickname}}
                        <span>
              <gander :gander="userInfo.sex" :age="userInfo.age"/>
            </span>
                    </div>
                    <div class="sign">{{userInfo.signname}}</div>
                    <div class="btn-group">
                        <follow :toUserid="$route.params.userid"/>
                        <div
                                class="btn"
                                v-if="$route.params.userid!=$store.state.userInfo.userid"
                                @click="$router.push('/chat/'+$route.params.userid)"
                        >私聊
                        </div>
                        <div class="voice" v-if="!userInfo.voice &&  userInfo.voice != ''">
                            <van-icon class-prefix="icon" name="play"/>
                        </div>
                    </div>
                    <div class="receiptinfo">
                        <dl>
                            <dt
                                    @click="$router.push('/fansList/1/'+$route.params.userid)"
                            >{{myInfo.attentionCount}}
                            </dt>
                            <dd>关注数</dd>
                        </dl>
                        <dl>
                            <dt @click="$router.push('/fansList/2/'+$route.params.userid)">{{myInfo.fansCount}}</dt>
                            <dd>粉丝数</dd>
                        </dl>
                        <dl>
                            <dt>{{myInfo.orderCount}}</dt>
                            <dd>接单数</dd>
                        </dl>
                    </div>
                </div>
                <van-tabs
                        v-model="activeTabs"
                        class="tabs"
                        :color="$store.state.color"
                        :title-active-color="$store.state.color"
                        sticky
                        animated
                        swipeable
                        :offset-top="46+top"
                >
                    <van-tab title="服务" name="0">
                        <div class="tabs-con">
                            <div class="game-list">
                                <van-list
                                        v-model="abilityListLoading"
                                        :finished="abilityFinished"
                                        finished-text="没有更多了"
                                        loading-text=" "
                                        @load="getUserAbilityList"
                                >
                                    <van-skeleton
                                            title
                                            avatar
                                            :row="1"
                                            :loading="abilitySkeletonLoading"
                                            avatar-size="50"
                                            avatar-shape="square"
                                    >
                                        <div
                                                class="game-item"
                                                v-for="(item,index) in abilityList"
                                                :key="index"
                                                @click="downOrder(item.abilityId)"
                                        >
                                            <img :src="item.icon"/>
                                            <div class="game-info">
                                                <h3>{{item.name}}</h3>
                                                <p>技术水平 {{item.grade}} | {{item.server}} | {{item.area}} |
                                                    {{item.remark}}</p>
                                            </div>
                                            <div class="price">
                                                游戏陪练
                                                <span>¥{{item.price}}元起</span>
                                            </div>
                                        </div>
                                    </van-skeleton>
                                </van-list>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="动态" name="1">
                        <div class="tabs-con">
                            <div class="dynamic-list">
                                <van-list
                                        v-model="dynamicListLoading"
                                        :finished="dynamicFinished"
                                        finished-text="没有更多了"
                                        loading-text=" "
                                        @load="getUserDynamic"
                                >
                                    <dynamicItem
                                            @click.native="$router.push('/dynamicDetail/'+item.inforid)"
                                            :info="item"
                                            v-for="item,index in dynamicList"
                                            :key="index"
                                    >
                                        <template slot="title-right">
                                            <div class="tags">
                                                <van-icon class-prefix="icon" name="jing" color="#FFD948"/>
                                                <van-icon class-prefix="icon" name="hot" color="#FFD948"/>
                                            </div>
                                        </template>
                                        <template slot="operation">
                                            <operation
                                                    class="operation"
                                                    :id="item.inforid"
                                                    :forward="item.shardeCount"
                                                    :comment="item.replyCount"
                                                    :zan="item.likeCount"
                                                    :iszan="item.likeStatue"
                                            />
                                        </template>
                                    </dynamicItem>
                                </van-list>
                            </div>
                        </div>
                    </van-tab>
                    <van-tab title="Ta的挑战" name="2" class="userChallengeDetailedWrapper">

                        <div class="userChallengeDetailed">
                            <div class="left">
                                <span class="text">总获胜局数</span>
                                <span class="number">21</span>

                            </div>
                            <div class="right">
                                <span class="number">10</span>
                                <span class="text">总失败局数</span>
                            </div>
                        </div>
                        <div class="pk-list">
                            <pkItem
                                    v-for="(item,index) in pkList"
                                    :key="index"
                                    :id="item.id"
                                    :image="item.image"
                                    :nickName="item.nickName"
                                    :count="item.count"
                                    :successCount="item.successCount"
                                    :userId="item.userId"
                                    :startTime="item.startTime"
                                    :endTime="item.endTime"
                                    :amount="item.amount"
                                    :gameName="item.gameName"
                            />
                        </div>
                    </van-tab>
                    <van-tab title="印象" name="3">
                        <div class="tabs-con impression">
                            <van-rate
                                    v-model="score"
                                    gutter="10px"
                                    :color="$store.state.color"
                                    class="rate"
                                    readonly
                            />
                            <div class="tags">
                                <span>神级操作 2</span>
                                <span>神级操作 2</span>
                                <span>神级操作 2</span>
                                <span>神级操作 2</span>
                            </div>
                            <div class="impression-title">
                                <h3>
                                    评论
                                    <small>123</small>
                                </h3>
                            </div>
                            <div class="impression-list">
                                <div class="impression-item">
                                    <div class="impression-userinfo">
                                        <van-image
                                                fit="cover"
                                                width="28"
                                                height="28"
                                                src="https://picsum.photos/28/28"
                                                class="avatar"
                                        />
                                        <h3>羊羊晴nee</h3>
                                        <gander :gander="0" :age="18"/>
                                    </div>
                                    <div class="impression-text">BitX是一个跨国比特币平台,总部位于新加坡,主要为东南亚和非洲等新兴...</div>
                                    <div class="impression-bottom">
                                        <span>2018-11-27</span>
                                        <operation class="operation" :id="10" :comment="20" :zan="20" :iszan="1"/>
                                    </div>
                                </div>
                                <div class="impression-item">
                                    <div class="impression-userinfo">
                                        <van-image
                                                fit="cover"
                                                width="28"
                                                height="28"
                                                src="https://picsum.photos/28/28"
                                                class="avatar"
                                        />
                                        <h3>羊羊晴nee</h3>
                                        <gander :gander="0" :age="18"/>
                                    </div>
                                    <div class="impression-text">BitX是一个跨国比特币平台,总部位于新加坡,主要为东南亚和非洲等新兴...</div>
                                    <div class="impression-bottom">
                                        <span>2018-11-27</span>
                                        <operation class="operation" :id="10" :comment="20" :zan="20" :iszan="0"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
            </van-pull-refresh>
        </div>
        <div
                class="order-btn"
                v-if="activeTabs==0 && $route.params.userid!=$store.state.userInfo.userid && abilityList.length != 0"
                @click="downOrder"
                :style="'padding-bottom:'+ bottom +'px'"
        >立即下单
        </div>
        <uploadAvatar ref="upload" @uploadSuccess="uploadSuccess" mode="all" height="300" top="150"/>
    </div>
</template>
<script>
    import navBar from "@/components/navbar/navbar.vue";
    import gander from "@/components/user/gander.vue";
    import operation from "@/components/operation/operation.vue";
    import follow from "@/components/operation/follow.vue";
    import uploadAvatar from "@/components/upload/uploadAvatar.vue";
    import dynamicItem from "@/components/dynamic/dynamicItem.vue";
    import pkItem from "@/components/pk/pkItem.vue";

    export default {
        name: "accompanyDetail",
        components: {
            navBar,
            gander,
            operation,
            follow,
            uploadAvatar,
            dynamicItem,
            pkItem
        },
        data() {
            return {
                top: 0,
                isLoading: false,
                activeTabs: "0",
                score: 2,
                bottom: 0,
                userInfo: {},
                myInfo: {
                    fansCount: 0,
                    attentionCount: 0,
                    orderCount: 0
                },
                nobg: "nobg",
                // 服务列表
                abilityPageNum: 1,
                abilityPageSize: 10,
                abilityLHasNextPage: true,
                abilityListLoading: false,
                abilityFinished: false,
                abilitySkeletonLoading: true,
                abilityList: [],
                // 动态列表
                dynamicPageNum: 1,
                dynamicPageSize: 10,
                dynamicLHasNextPage: true,
                dynamicListLoading: false,
                dynamicFinished: false,
                dynamicSkeletonLoading: true,
                dynamicList: [],
                pkList: []
            };
        },
        // watch: {
        //   $route(){
        //     if(this.$route.params.type){
        //       this.activeTabs = this.$route.params.type
        //     }
        //   }
        // },
        created() {
            if (window.navigator.userAgent.match(/APICloud/i)) {
                this.bottom = api.safeArea.bottom;
            }
            this.getUserInfo();
            var systemType = this.$store.state.systemType;
            if (systemType == "android") {
                this.top = 25;
            }
            if (systemType == "ios") {
                this.top = 40;
            }

            this.getListBattles();
        },
        mounted() {
            window.addEventListener("scroll", this.handleScroll, true);
        },
        beforeDestroy: function () {
            window.removeEventListener("scroll", this.handleScroll, true);
        },
        methods: {
            getListBattles() {
                this.$SERVER.getListBattles().then(res => {
                    this.pkList = res.data.list;
                });
            },
            handleScroll(e) {
                var that = this
                if (e.target.scrollTop >= (200 - 46 - this.top)) {
                    that.nobg = "";
                } else {
                    that.nobg = "nobg";
                }
            },
            uploadBackimage() {
                this.$refs.upload.openLoadPopup();
            },
            // 组件上传成功的回调函数
            uploadSuccess(val) {
                var that = this;
                that.$SERVER
                    .updateUseInfo({
                        userid: that.$store.state.userInfo.userid,
                        backimage: val
                    })
                    .then(res => {
                        that.$toast.success(res.data);
                        that.userInfo.backimage = val;
                    });
            },
            getUserInfo() {
                var that = this;
                that.$SERVER
                    .getUserInforById({
                        userid: that.$route.params.userid
                    })
                    .then(res => {
                        that.userInfo = res.data;
                    });
                that.$SERVER
                    .getMyInfo({
                        userId: that.$route.params.userid
                    })
                    .then(res => {
                        that.myInfo = res.data;
                    });
            },
            getUserAbilityList(isClear) {
                var that = this;
                if (isClear) {
                    that.abilityPageNum = 1;
                    that.abilityLHasNextPage = true;
                }
                if (!that.abilityLHasNextPage) {
                    that.abilityListLoading = false;
                    that.abilityFinished = true;
                    that.abilitySkeletonLoading = false;
                    return;
                }
                that.$SERVER
                    .userAbilityList({
                        userid: that.$route.params.userid,
                        pageNum: that.abilityPageNum,
                        pageSize: that.abilityPageSize
                    })
                    .then(res => {
                        that.abilityPageNum = res.data.nextPage;
                        that.abilityLHasNextPage = res.data.hasNextPage;
                        that.abilityFinished = !res.data.hasNextPage;
                        if (isClear) {
                            that.abilityList = res.data.list;
                        } else {
                            that.abilityList = [...that.abilityList, ...res.data.list];
                            that.abilityListLoading = false;
                            that.abilitySkeletonLoading = false;
                        }
                    });
            },
            getUserDynamic(isClear) {
                var that = this;
                if (isClear) {
                    that.dynamicPageNum = 1;
                    that.dynamicLHasNextPage = true;
                }
                if (!that.dynamicLHasNextPage) {
                    that.dynamicListLoading = false;
                    that.dynamicFinished = true;
                    that.dynamicSkeletonLoading = false;
                    return;
                }
                that.$SERVER
                    .getDynamicInformation({
                        userid: that.$route.params.userid,
                        range: 1,
                        pageNum: that.dynamicPageNum,
                        pageSize: that.dynamicPageSize
                    })
                    .then(res => {
                        that.dynamicPageNum = res.data.nextPage;
                        that.dynamicLHasNextPage = res.data.hasNextPage;
                        that.dynamicFinished = !res.data.hasNextPage;
                        if (isClear) {
                            that.dynamicList = res.data.list;
                        } else {
                            that.dynamicList = [...that.dynamicList, ...res.data.list];
                            that.dynamicListLoading = false;
                            that.dynamicSkeletonLoading = false;
                        }
                    });
            },
            downOrder(id) {
                if (this.$route.params.userid == this.$store.state.userInfo.userid) {
                    this.$toast.fail("自己不能向自己下单！");
                    return;
                }
                if (id) {
                    this.$router.push(`/downorder/${this.$route.params.userid}/${id}`);
                } else {
                    this.$router.push(`/downorder/${this.$route.params.userid}`);
                }
            }
        }
    };
</script>
<style lang="less">
    .refresh {
        .van-pull-refresh__track {
            background: #f5f5f5;
        }
    }
</style>
<style lang="less" scoped>
    .userChallengeDetailedWrapper{
        background-color: white;
        .userChallengeDetailed {
            height: 65px;
            line-height: 65px;
            background: url("./bg.png") no-repeat;
            background-size: 340px 65px;
            color: white;
            font-size: 0;
            margin-left: 15px;
            margin-top: 17.5px;
            margin-bottom: 17.5px;

            > div {
                display: inline-block;
                vertical-align: top;
                height: 65px;
                line-height: 65px;
                width: 50%;

                span {
                    font-size: 15px;
                    height: 65px;
                    line-height: 65px;
                    display: inline-block;
                    vertical-align: top;
                    font-weight: bold;
                }

                .number {
                    font-size: 30px;
                }
            }

            .left {
                .text {
                    color: #333;
                    margin: 0 20px 0 10px;
                }
            }

            .right {
                .number {
                    margin: 0 20px 0 20px;
                }
            }
        }
        .pk-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            background-color: #ffd948;
            padding: 10px;
        }
    }


    .userbg {
        position: absolute;
        width: 100%;
        height: 300px;
        background-size: cover;

        img {
            width: 100%;
            height: auto;
        }
    }

    .userinfo {
        background: rgba(255, 255, 255, 1);
        border-radius: 5px 5px 0px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 15px;
        margin-top: 200px;

        .avatar {
            position: relative;
            z-index: 99;
            top: -30px;
            margin-bottom: -30px;

            img {
                width: 75px;
                height: 75px;
                border-radius: 50%;
            }

            .authentication {
                position: absolute;
                bottom: 0;
                right: 0;
                background: url(../../assets/images/authentication.png) no-repeat center center;
                background-size: 100%;
                width: 20px;
                height: 26px;
            }
        }

        .username {
            font-size: 14px;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            padding: 8px 0;
        }

        .sign {
            font-size: 12px;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
        }

        .btn-group {
            padding: 10px 0;
            display: flex;
            justify-content: space-around;
            width: 100%;
            padding: 15px 0;
            border-bottom: 1px solid rgba(245, 245, 245, 1);
            margin-bottom: 15px;

            .btn {
                width: 100px;
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                font-weight: bold;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(255, 217, 72, 1);
                border-radius: 16px;
                text-align: center;
                color: rgba(51, 51, 51, 1);
            }

            .voice {
                width: 100px;
                height: 32px;
                line-height: 32px;
                font-size: 14px;
                font-weight: bold;
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(255, 217, 72, 1);
                border-radius: 16px;
                color: rgba(51, 51, 51, 1);
                padding: 0 5px;
                box-sizing: border-box;

                .icon {
                    font-size: 26px;
                    color: rgba(255, 217, 72, 1);
                }
            }

            .nofollow {
                background: rgba(255, 217, 72, 1);
            }
        }

        .receiptinfo {
            display: flex;
            width: 100%;
            justify-content: space-around;
            text-align: center;

            dl {
                dt {
                    font-size: 15px;
                    font-weight: bold;
                }

                dd {
                    font-size: 12px;
                    font-weight: 500;
                    color: rgba(153, 153, 153, 1);
                    padding: 8px 0;
                }
            }
        }
    }

    .tabs {
        margin-top: 15px;

        .tabs-con {
            background: #fff;

            .game-list {
                padding: 10px;

                .game-item {
                    border: 1px solid rgba(243, 243, 243, 1);
                    border-radius: 5px;
                    position: relative;
                    padding: 10px 10px 20px 10px;
                    margin-bottom: 25px;

                    img {
                        width: 50px;
                        height: 50px;
                        border-radius: 10px;
                        position: absolute;
                        left: 10px;
                        top: 10px;
                    }

                    .game-info {
                        padding-left: 60px;
                        height: 50px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;

                        h3 {
                            font-size: 16px;
                            font-weight: bold;
                            color: rgba(51, 51, 51, 1);
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        p {
                            font-size: 12px;
                            font-weight: 400;
                            color: rgba(153, 153, 153, 1);
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }
                    }

                    .price {
                        width: 130px;
                        font-size: 12px;
                        position: absolute;
                        left: 50%;
                        bottom: -15px;
                        margin-left: -130/2px;
                        border: 1px solid rgba(255, 217, 72, 1);
                        border-radius: 30px;
                        padding: 3px 5px;
                        text-align: center;
                        background: #fff;

                        span {
                            color: #ff4545;
                        }
                    }
                }
            }
        }
    }

    .impression {
        padding: 10px;

        .rate {
            display: flex;
            justify-content: center;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 0;

            span {
                margin-right: 10px;
                margin-bottom: 10px;
                font-size: 12px;
                color: rgba(102, 102, 102, 1);
                background: #eee;
                border-radius: 5px;
                padding: 5px 10px;
            }
        }

        .impression-title {
            position: relative;
            padding-left: 10px;

            h3 {
                font-size: 15px;
                font-weight: bold;
                color: rgba(51, 51, 51, 1);

                small {
                    font-size: 13px;
                    font-weight: 400;
                    color: rgba(153, 153, 153, 1);
                    margin-left: 10px;
                }

                &::before {
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: block;
                    content: "";
                    width: 3px;
                    height: 16px;
                    background: rgba(255, 217, 72, 1);
                    border-radius: 2px;
                }
            }
        }

        .impression-list {
            .impression-item {
                padding: 15px 0;

                .impression-userinfo {
                    font-size: 14px;
                    font-weight: bold;
                    color: rgba(51, 51, 51, 1);
                    display: flex;
                    align-items: center;

                    .avatar {
                        border-radius: 50%;
                        overflow: hidden;
                    }

                    & * {
                        margin-right: 10px;
                    }
                }

                .impression-text {
                    padding: 12px 0;
                    font-size: 12px;
                    font-weight: 400;
                    color: rgba(102, 102, 102, 1);
                    line-height: 20px;
                    border-bottom: 1px solid rgba(245, 245, 245, 1);
                }

                .impression-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 5px 0;

                    span {
                        font-size: 10px;
                        font-weight: 400;
                        color: rgba(153, 153, 153, 1);
                        line-height: 17px;
                    }

                    & * {
                        width: 30%;
                    }
                }
            }
        }
    }

    .order-btn {
        width: 100%;
        height: 55px;
        line-height: 55px;
        background: rgba(255, 217, 74, 1);
        font-size: 17px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        text-align: center;
    }
</style>
