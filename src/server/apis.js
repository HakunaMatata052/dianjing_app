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
    try {
      let result = await this.axios("post", "express/getExpress", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 轮播图banner
   */
  async getBanners(params = {}) {
    try {
      let result = await this.axios("post", "banner/getBanners", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
  /**
   * 速配列表
   * @param {Object} params {pageNum ,pageSize,type}
   */
  async getUserList(params = {}) {
    try {
      let result = await this.axios("post", "user/getUserList", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
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
}

export default new Api();