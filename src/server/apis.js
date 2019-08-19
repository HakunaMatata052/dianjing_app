import Axios from "./axios";

class Api extends Axios {
  /**
   * 获取商品数据
   * @param {Object} params typeid
   */
  async getData(params = {}) {
    try {
      let result = await this.axios("get", "/Home/Kaiyun/indexData", params);
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取数据失败",
          response: result,
          data: params,
          url: "/Home/Kaiyun/indexData"
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 获取游戏列表
   * @param {Object} params {pageNum ,pageSize}
   */
  async getGames(params = {}) {
    try {
      let result = await this.axios("post", "game/getGames", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 发送验证码
   * @param {Object} params {telephone}
   */
  async sendchecknum(params = {}) {
    try {
      let result = await this.axios("post", "user/sendchecknum", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 登录
   * @param {Object} params {telephone,password}
   */
  async login(params = {}) {
    try {
      let result = await this.axios("post", "user/login", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 注册
   * @param {Object} params {telephone,password,checknum}
   */
  async register(params = {}) {
    try {
      let result = await this.axios("post", "user/register", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 修改密码
   * @param {Object} params {userid,password,newpassword}
   */
  async resetPassword(params = {}) {
    try {
      let result = await this.axios("post", "user/resetPassword", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 资讯列表
   * @param {Object} params {pageNum ,pageSize}
   */
  async getExpress(params = {}) {
    return this.axios("post", "express/getExpress", params);
  }
  /**
   * 轮播图banner
   */
  async getBanners(params = {}) {
    return await this.axios("post", "banner/getBanners", params);
  }
  /**
   * 速配列表
   * @param {Object} params {pageNum ,pageSize,type}
   */
  async getUserList(params = {}) {
    return await this.axios("post", "user/getUserList", params);
  }
  /**
   * 查询用户信息（粉丝数，关注数，接单数）
   * @param {Object} params {userId}
   */
  async getMyInfo(params = {}) {
    try {
      let result = await this.axios("post", "user/getMyInfo", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }


  /**
   * 查询用户信息（资料）
   * @param {Object} params {userId}
   */
  async getUserInforById(params = {}) {
    try {
      let result = await this.axios("post", "user/getUserInforById", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 更新 定位/在线状态
   * @param {Object} params { userId ,position,loginstate/ lng ,lat}
   */
  async openUpdate(params = {}) {
    try {
      let result = await this.axios("post", "user/openUpdate", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }


  /**
   * 下订单
   * @param {Object} params {userid ,customerUserId,publishDate,publishDate,abilityId}
   */
  async bookOrder(params = {}) {
    try {
      let result = await this.axios("post", "order/bookOrder", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 订单列表
   * @param {Object} params {pageNum ,pageSize,userid,state}
   */
  async getOrders(params = {}) {
    try {
      let result = await this.axios("post", "order/getOrders", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 订单详情
   * @param {Object} params {pageNum ,pageSize,userid,state}
   */
  async orderDetails(params = {}) {
    try {
      let result = await this.axios("post", "order/orderDetails", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }


  /**
   * 实时获取订单价格
   * @param {Object} params {playCount ,abilityId}
   */
  async getTotalMoney(params = {}) {
    try {
      let result = await this.axios("post", "order/getTotalMoney", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 更新用户
   * @param {Object} params {userid}
   */
  async updateUseInfo(params = {}) {
    try {
      let result = await this.axios("post", "user/updateUseInfo", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 用户服务列表
   * @param {Object} params {userid,pageNum,pageSize}
   */
  async userAbilityList(params = {}) {
    try {
      let result = await this.axios("post", "ability/userAbilityList", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 视频列表
   * @param {Object} params {userid,pageNum,pageSize}
   */
  async getVideoList(params = {}) {
    try {
      let result = await this.axios("post", "video/getVideoList", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 关注粉丝列表
   * @param {Object} params {queryType,userid,pageNum,pageSize}
   */
  async getFansAndAttList(params = {}) {
    try {
      let result = await this.axios("post", "user/getFansAndAttList", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 添加/取消关注
   * @param {Object} params {queryType,userid,pageNum,pageSize}
   */
  async fans(params = {}) {
    try {
      let result = await this.axios("post", "user/fans", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }


  /**
   * 查询余额
   * @param {Object} params {userid}
   */
  async getBalanceByUserId(params = {}) {
    try {
      let result = await this.axios("post", "wallet/getBalanceByUserId", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }


  /**
   * 模糊搜索用户列表
   * @param {Object} params {username,pageNum,pageSize}
   */
  async search(params = {}) {
    try {
      let result = await this.axios("post", "search/search", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * 更新订单状态
   * @param {Object} params {orderId,status}
   */
  async updateOrderStatus(params = {}) {
    try {
      let result = await this.axios("post", "order/updateOrderStatus", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }


  /**
   * 发布视频
   * @param {Object} params {orderId,status}
   */
  async postVideo(params = {}) {
    try {
      let result = await this.axios("post", "video/postVideo", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 银行卡列表
   * @param {Object} params {userid}
   */
  async getBankCardList(params = {}) {
    return await this.axios("post", "bankCard/getBankCardList", params);
  }
  /**
   * 设置默认银行卡
   * @param {Object} params {bankCardId}
   */
  async updateCardBank(params = {}) {
    return await this.axios("post", "bankCard/updateCardBank", params);
  }
  /**
   * 删除银行卡
   * @param {Object} params {bankCardId}
   */
  async delCardBank(params = {}) {
    return await this.axios("post", "bankCard/delCardBank", params);
  }
  /**
   * 银行列表
   */
  async getBankList(params = {}) {
    return await this.axios("post", "bankCard/getBankList", params);
  }

  /**
   * 添加银行卡
   * @param {Object} params {accountname,cardaddress,cardno,bankId,userId}
   */
  async addCardBank(params = {}) {
    return await this.axios("post", "bankCard/addCardBank", params);
  }


  /**
   * 提现
   * @param {Object} params {exchangeCardEnd,amount,bankCardId,channel,userId}
   */
  async withdraw(params = {}) {
    return await this.axios("post", "exchange/withdraw", params);
  }
  /**
   * 提现信息
   * @param {Object} params {userId}
   */
  async withdrawInfo(params = {}) {
    return await this.axios("post", "exchange/withdrawInfo", params);
  }
  /**
   * 提现列表
   * @param {Object} params {userId，pageNum，pageSize}
   */
  async withdrawList(params = {}) {
    return await this.axios("post", "exchange/withdrawList", params);
  }
  /**
   * 收到礼物列表
   * @param {Object} params {userId，pageNum，pageSize}
   */
  async getUserGiftList(params = {}) {
    return await this.axios("post", "gift/getUserGiftList", params);
  }
  /**
   * 视频详情
   * @param {Object} params {videoid}
   */
  async getVideoInfo(params = {}) {
    return await this.axios("post", "video/getVideoInfo", params);
  }

  /**
   * 发布评论
   * @param {Object} params {pid,type:1 视频，2动态 ,fromUserId}
   */
  async addEvaluate(params = {}) {
    return await this.axios("post", "evaluate/addEvaluate", params);
  }

  /**
   * 评论列表
   * @param {Object} params {pid,type:1 视频，2动态 ,pageNum,pageSize}
   */
  async getEvaluates(params = {}) {
    return await this.axios("post", "evaluate/getEvaluates", params);
  }
  
  /**
   * 子评论列表
   * @param {Object} params {msgId,type:1 视频，2动态 ,pageNum,pageSize}
   */
  async getEvaluateDetail(params = {}) {
    return await this.axios("post", "evaluate/getEvaluateDetail", params);
  }
  
  /**
   * 点赞
   * @param {Object} params {sourceId,userId}
   */
  async agree(params = {}) {
    return await this.axios("post", "dotAgree/agree", params);
  }

    
  /**
   * 获取融云token
   * @param {Object} params {sourceId,userId}
   */
  async getRongyunToken(params = {}) {
    return await this.axios("post", "user/rongyun", params);
  }
    
  /**
   * 发布动态
   * @param {Object} params {sourceId,userId}
   */
  async addDynamicInformation(params = {}) {
    return await this.axios("post", "dynaInformation/addDynamicInformation", params);
  }

  /**
   * 动态列表
   * @param {Object} params {sourceId,userId}
   */
  async getDynamicInformation(params = {}) {
    return await this.axios("post", "dynaInformation/getDynamicInformation", params);
  }
  
   
}

export default new Api();