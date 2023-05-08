import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */

// get请求
export function userRegister(params) {
  return http.post("game/user/signup", params);
}
export function sendMail(params) {
  return http.post("game/user/signup/code", params);
}
export function userLogin(params) {
  return http.post("game/user/login", params);
}
export function changeMail(params) {
  return http.post("game/user/change_password/code", params);
}
export function changePasseord(params) {
  return http.post("game/user/change_password", params);
}
export function sendAvatar(params) {
  return http.post("game/user/set_avatar", params);
}
export function userCenter(params) {
  return http.post("/game/user/personal_center", params);
}
