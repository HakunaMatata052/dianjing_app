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
   * 登录
   * @param {Object} params {telephone,password}
   */
  async login(params = {}) {
    try {
      let result = await this.axios("post", "login", params);
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
  async getExpress(params = {}) {
    try {
      let result = await this.axios("post", "banner/getBanners", params);
      if (result) {
        return result;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new Api();