/**
 * 环境配置文件
 */
let baseURL;

if (process.env.NODE_ENV === "production") {
  // 干一些线上才要做的事情
  baseURL = "http://39.108.177.193:12000/game/";
}
if (process.env.NODE_ENV === "development") {
  // 干一些测试时不可告人的事情  
  baseURL = "http://39.108.177.193:12000/game/";
  // baseURL = "http://192.168.0.104:12000/game/";
  // baseURL = "http://192.168.0.210:12000/game/";
}
export default { baseURL };
