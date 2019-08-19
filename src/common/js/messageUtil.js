/**
 *聊天消息
 */
var messageUtil = function() {

    //打开数据库
    this.openDb = function() {
        var db = api.require('db');
        var ret = db.openDatabaseSync({
            name: 'soul'
        });
        // console.log(ret);
    };

    //创建表
    this.createTable = function() {
        /**
         *msgid 消息ID
         *msgtype 文本:TxtMsg,语音:VcMsg,图片:ImgMsg
         *userid 本人ID
         *frienduserid 好友ID
         *content 消息内容
         *sendtime 发送时间
         *direction 本人：SEND发送；RECEIVE接收
         *status Y成功 N失败
         *isread Y是 N否
         **/
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "CREATE TABLE IF NOT EXISTS message(msgid int, msgtype varchar(255),userid varchar(255), frienduserid varchar(255), " +
                " content varchar(255), image varchar(255), voice varchar(255),duration int,sendtime varchar(255), " +
                " direction varchar(255),status varchar(10),nickname varchar(255),avatar varchar(255),isread varchar(10))"
        });
        // console.log(ret);
    };

    //删除表
    this.dropTable = function() {
        var db = api.require('db');
        db.executeSqlSync({
            name: 'soul',
            sql: 'drop TABLE message'
        });
    };
    //关闭数据库
    this.closeDb = function() {
        var db = api.require('db');
        var ret = db.closeDatabaseSync({
            name: 'soul'
        });
    };

    this.saveTxtMessages = function(msg) {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "insert into message(msgid,msgtype,userid,frienduserid,content,sendtime,direction,status,nickname,avatar,isread) values('" +
                msg.id + "','RC:TxtMsg','" + msg.userid + "','" + msg.frienduserid + "','" + msg.content + "','" + msg.sendtime +
                "','" + msg.direction + "','" + msg.status + "','" + msg.nickname + "','" + msg.avatar + "','" + msg.isread + "')"
        });
        // console.log(ret);
    };

    this.saveVcMessages = function(msg) {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "insert into message(msgid,msgtype,userid,frienduserid,voice,duration,content,sendtime,direction,status,nickname,avatar,isread) values('" +
                msg.id + "','RC:VcMsg','" + msg.userid + "','" + msg.frienduserid + "','" + msg.voice + "','" + msg.duration + "','[语音]','" + msg.sendtime + "','" +
                msg.direction + "','" + msg.status + "','" + msg.nickname + "','" + msg.avatar + "','" + msg.isread + "')"
        });
        // console.log(ret);
    };

    this.saveImgMessages = function(msg) {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "insert into message(msgid,msgtype,userid,frienduserid,image,content,sendtime,direction,status,nickname,avatar,isread) values('" +
                msg.id + "','RC:ImgMsg','" + msg.userid + "','" + msg.frienduserid + "','" + msg.image + "','[图片]','" + msg.sendtime + "','" +
                msg.direction + "','" + msg.status + "','" + msg.nickname + "','" + msg.avatar + "','" + msg.isread + "')"
        });
        // console.log(ret);
    };

    this.updateMessages = function(id, status) {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "update message set status='" + status + "' where msgid=" + id
        });
        // console.log(ret);
    };

    this.deletefriendMessages = function(frienduserid) {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "delete from message where frienduserid='" + frienduserid + "'"
        });
        // console.log(ret)
    };

    this.deleteAllMessagesByuserid = function(userid) {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "delete from message where userid='" + userid + "'"
        });
        // console.log(ret)
    };

    this.deleteAllMessages = function() {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "delete from message"
        });
    };

    // 未读消息列表
    this.showMessageLists = function(userid) {
        var db = api.require('db');
        var ret = db.selectSqlSync({
            name: 'soul',
            sql: "select a.msgid,a.msgtype,a.userid,a.frienduserid,a.content,a.sendtime,a.image, a.voice,a.duration,a.direction,a.status,a.nickname,a.avatar,b.unreadmessages from message a, " +
                "(select userid,frienduserid, max(sendtime)sendtime,sum(case when isread = 'N' then 1 else 0 end) as unreadmessages from message where status='Y' group by userid,frienduserid) b " +
                " where a.userid = b.userid and a.frienduserid=b.frienduserid and a.sendtime=b.sendtime and a.userid='" + userid + "' order by a.sendtime desc"
        });
        // console.log(ret);
        if (ret.status) {
            return ret.data;
        } else {
            return [];
        }
    };

    //聊天记录
    this.showMessages = function(userid, friendId) {
        var db = api.require('db');
        var ret = db.selectSqlSync({
            name: 'soul',
            sql: "SELECT msgid,msgtype,userid,frienduserid,content,sendtime,direction,status,image,voice,duration,nickname,avatar FROM message where userid='" + userid + "' and frienduserid='" + friendId + "' AND status ='Y' ORDER BY sendtime desc LIMIT 25"
        });
        // console.log(ret);
        if (ret.status) {
            return ret.data;
        } else {
            return [];
        }
    };

    this.unReadMessages = function(userid) {
        var db = api.require('db');
        var ret = db.selectSqlSync({
            name: 'soul',
            sql: "SELECT count(1) as unreadmessages FROM message where userid='" + userid + "' AND status ='Y' AND isread='N'"
        });
        // console.log(ret);
        if (ret.status) {
            return ret.data;
        } else {
            return [];
        }
    };

    this.updateRead = function(frienduserid) {
        var db = api.require('db');
        var ret = db.executeSqlSync({
            name: 'soul',
            sql: "update message set isread='Y' where frienduserid='" + frienduserid + "'"
        });
        // console.log(ret);
    };
}

export default new messageUtil();