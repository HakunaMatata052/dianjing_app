import * as method from "@/common/js/mixin.js";
import store from "../../store/store";
import messageUtil from "@/common/js/messageUtil.js";
import API from "@/server/apis.js"; // 引入api接口

var rongyun = function () {
    this.rong = null
    this.$store = store
    this.$METHOD = method
    this.$SERVER = API
    this.initRongyun = function () {
        this.rong = api.require("rongCloud2");
        var that = this;
        var rongyunToken = that.$METHOD.getStore("rongyunToken");
        if (!that.$METHOD.getStore("token")) {
            console.log("未登录！");
            return;
        }
        if (rongyunToken == null || rongyunToken == "") {
            that.getRongyunToken();
            return false;
        }
        //初始化
        that.rong.init(function (ret, err) {
            if (ret.status == "success") {
                //监听接收在线消息
                that.receiveMessageListener();
                //连接
                that.connect();
            } else {}
        });
    };
    this.getRongyunToken = function () {
        this.rong = api.require("rongCloud2");
        this.$SERVER
            .getRongyunToken({
                userid: this.$store.state.userInfo.userid
            })
            .then(res => {
                this.$METHOD.setStore("rongyunToken", res.rongyun.token);
                this.initRongyun();
            });
    }
    this.connect = function () {
        this.rong = api.require("rongCloud2");
        var that = this;
        var rongyunToken = that.$METHOD.getStore("rongyunToken");
        that.rong.connect({
                token: rongyunToken
            },
            function (ret, err) {
                console.log(ret);
                if (ret.status == "success") {
                    //获取列表中未读消息保存到本地
                    var list = messageUtil.showMessageLists(
                        that.$store.state.userInfo.userid
                    );
                    console.log(list);
                    if (list.length > 0) {
                        for (let i = 0; i < list.length; i++) {
                            that.rong.getUnreadCount({
                                    conversationType: "PRIVATE",
                                    targetId: list[i].frienduserid
                                },
                                function (unreadret, unreaderr) {
                                    // $(".unreadcount").text($(".unreadcount").text() * 1 + unreadret.result * 1);
                                    that.rong.getHistoryMessages({
                                            conversationType: "PRIVATE",
                                            targetId: list[i].frienduserid,
                                            oldestMessageId: list[i].msgid,
                                            count: unreadret.result
                                        },
                                        function (ret, err) {
                                            if (ret.result.length > 0) {
                                                for (let j = 0; i < list.length; j++) {
                                                    console.log(list[i]);
                                                    var message = list[i];
                                                    if (message.objectName == "RC:TxtMsg") {
                                                        var message = {
                                                            id: message.messageId,
                                                            userid: that.$store.state.userInfo.userid,
                                                            frienduserid: message.targetId,
                                                            content: message.content.text,
                                                            sendtime: message.sentTime,
                                                            direction: message.messageDirection,
                                                            status: "Y",
                                                            nickname: list[i].nickname,
                                                            avatar: list[i].image,
                                                            isread: "N"
                                                        };
                                                        messageUtil.saveTxtMessages(message);
                                                    } else if (message.objectName == "RC:ImgMsg") {} else if (message.objectName == "RC:VcMsg") {
                                                        var message = {
                                                            id: message.messageId,
                                                            userid: that.$store.state.userInfo.userid,
                                                            frienduserid: message.targetId,
                                                            voice: message.content.voicePath,
                                                            duration: message.content.duration,
                                                            sendtime: message.sentTime,
                                                            direction: message.messageDirection,
                                                            status: "Y",
                                                            nickname: list[i].nickname,
                                                            avatar: list[i].image,
                                                            isread: "N"
                                                        };
                                                        messageUtil.saveVcMessages(message);
                                                    }
                                                }
                                                // that.$emit("receive");
                                            }
                                        }
                                    );
                                }
                            );
                        }
                    }

                    //未读消息数
                    // var msg = new messageUtil();
                    // var unReadMessages = msg.unReadMessages($api.getStorage("userid"));
                    // api.sendEvent({
                    //   name: "unreadmessages",
                    //   extra: {
                    //     unreadmessages: unReadMessages[0].unreadmessages
                    //   }
                    // });
                }
            }
        );
    }
    this.receiveMessageListener = function () {
            this.rong = api.require("rongCloud2");
            var that = this;
            that.rong.setOnReceiveMessageListener(function (ret, err) {
                console.log(ret);
                if (ret.result) {
                    // 查询昵称和头像
                    that.$SERVER
                        .getUserInforById({
                            userid: ret.result.message.targetId
                        })
                        .then(res => {
                            var sound = "widget://res/notice/girl.mp3";
                            if (that.$store.state.userInfo.sex * 1 == 0) {
                                sound = "widget://res/notice/boy.mp3";
                            }
                            var notifycontent = ret.result.message.content.text;
                            if (
                                ret.result.message.objectName == "RC:TxtMsg" &&
                                ret.result.message.content.text.indexOf("img") >= 0
                            ) {
                                notifycontent = "[表情]";
                            } else if (ret.result.message.objectName == "RC:VcMsg") {
                                notifycontent = "[语音]";
                            }
                            // 消息提醒
                            api.notification({
                                sound: sound,
                                notify: {
                                    title: res.data.nickname,
                                    content: notifycontent,
                                    extra: {
                                        type: "chat",
                                        value: ret.result.message.targetId
                                    }
                                }
                            });

                            //保存消息到本地数据库
                            if (ret.result.message.objectName == "RC:TxtMsg") {
                                var message = {
                                    id: ret.result.message.messageId,
                                    userid: that.$store.state.userInfo.userid,
                                    frienduserid: ret.result.message.targetId,
                                    content: ret.result.message.content.text,
                                    sendtime: ret.result.message.sentTime,
                                    direction: ret.result.message.messageDirection,
                                    status: "Y",
                                    nickname: res.data.nickname,
                                    avatar: res.data.image,
                                    isread: "N"
                                };
                                messageUtil.saveTxtMessages(message);
                            } else if (ret.result.message.objectName == "RC:ImgMsg") {} else if (ret.result.message.objectName == "RC:VcMsg") {
                                var message = {
                                    id: ret.result.message.messageId,
                                    userid: that.$store.state.userInfo.userid,
                                    frienduserid: ret.result.message.targetId,
                                    voice: ret.result.message.content.voicePath,
                                    duration: ret.result.message.content.duration,
                                    sendtime: ret.result.message.sentTime,
                                    direction: ret.result.message.messageDirection,
                                    status: "Y",
                                    nickname: res.data.nickname,
                                    avatar: res.data.image,
                                    isread: "N"
                                };
                                messageUtil.saveVcMessages(message);
                            }
                            // that.$emit('receiveMessageListener')
                            

                            //消息添加到聊天页面
                            // ret.result.message.avatar = res.data.image;
                            // api.sendEvent({
                            //     name: "appendrecivemsg",
                            //     extra: {
                            //         message: ret.result.message
                            //     }
                            // });

                            //刷新消息列表页面
                            // api.sendEvent({
                            //     name: "initmessage"
                            // });
                            //更新个人中心未读消息，更新个人中心我的约会和我的伴游，更新粉丝金币
                            // api.sendEvent({
                            //     name: "mine"
                            // });

                            //消息图标更新
                            // var unReadMessages = messageUtil.unReadMessages($store.state.userInfo.userid);
                            // if (unReadMessages.length > 0) {
                            //     api.sendEvent({
                            //         name: "unreadmessages",
                            //         extra: {
                            //             unreadmessages: unReadMessages[0].unreadmessages
                            //         }
                            //     });
                            // }
                        });
                }
            });
        },
        this.sendTextMessageListener = function (targetId, msg, nickname, avatar) {
            this.rong = api.require("rongCloud2");
            var that = this;
            that.rong.sendTextMessage({
                    conversationType: "PRIVATE",
                    targetId: targetId,
                    text: msg,
                    extra: "" + "" + ""
                },
                function (msgret, msgerr) {
                    console.log(msgret);
                    if (msgret.result != null) {
                        if (msgret.status == "prepare") {
                            //保存消息到本地数据库
                            var message = {
                                id: msgret.result.message.messageId,
                                userid: that.$store.state.userInfo.userid,
                                frienduserid: msgret.result.message.targetId,
                                content: msgret.result.message.content.text,
                                sendtime: msgret.result.message.sentTime,
                                direction: msgret.result.message.messageDirection,
                                status: "Y",
                                nickname: nickname,
                                avatar: avatar,
                                isread: "Y"
                            };
                            messageUtil.saveTxtMessages(message);
                        } else if (msgret.status == "success") {
                            //发送成功后移除loading
                            messageUtil.updateMessages(msgret.result.message.messageId, "Y");
                        } else if (msgret.status == "error") {
                            //发送失败后的护理，一般讲loading图片变为 “！”；
                            // var msg = new messageUtil();
                            // msg.updateMessages(msgret.result.message.messageId, "N");
                        }
                    }
                }
            );
        }

}


export default new rongyun();