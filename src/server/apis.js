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
   * 获取商品数据
   * @param {Object} params typeid
   */
  async getData2(params = {}) {
    try {
      let result = await this.axios("post", "queryApi/getservicespeople", params,{
        LOADINGHIDE:true
      });
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取数据失败",
          response: result,
          data: params,
          url: "queryApi/getservicespeople"
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

      /**
   * 获取游戏列表
   * @param {Object} params typeid
   */
  async getGameList(params = {}) {
    try {
      let result = await this.axios("get", "v2/list", params);
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取数据失败",
          response: result,
          data: params,
          url: "v2/list"
        };
        throw err;
      }
    } catch (err) {
      throw err;
    }
  }

}

export default new Api();
