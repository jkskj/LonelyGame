import http from "../utils/http";
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */

// post请求
//注册
export function userRegister(params) {
  return http.post("/game/user/signup", params);
}
//发邮箱验证码
export function sendMail(params) {
  return http.post("/game/user/signup/code", params);
}
//登录
export function userLogin(params) {
  return http.post("/game/user/login", params);
}
//修改密码的邮箱验证码
export function changeMail(params) {
  return http.post("/game/user/change_password/code", params);
}
//修改密码
export function changePasseord(params) {
  return http.post("/game/user/change_password", params);
}
//修改头像
export function sendAvatar(params) {
  return http.post("/game/user/set_avatar", params);
}
//获取个人信息
export function userCenter(params) {
  return http.post("/game/user/personal_center", params);
}
//上传图片
export function uploadPicture(params) {
  return http.post("/game/upload", params);
}
//发贴
export function createPost(params) {
  return http.post("/game/createposts", params);
}
//审核帖子
export function auditPost(params) {
  return http.post("/game/admin/audit/set", params);
}
//封禁用户
export function banUser(params) {
  return http.post("/game/admin/ban", params);
}
//解封用户
export function allowUser(params) {
  return http.post("/game/admin/allow", params);
}
//查看帖子详情
export function viewTopic(params) {
  return http.post("/game/detail", params);
}
//实名认证
export function toReal(params) {
  return http.post("/game/user/real_name", params);
}
//举报用户
export function reportUser(params) {
  return http.post("/game/user/report_user", params);
}
//收藏/取消收藏
export function collectTopic(params) {
  return http.post("/game/buyer/fav", params);
}
//开价
export function givePrice(params) {
  return http.post("/game/buyer/give_price", params);
}
//更改封面
export function changCover(params) {
  return http.post("/game/change_cover", params);
}
//退钱
export function backMoney(params) {
  return http.post("/game/admin/back_money", params);
}
//搜索帖子
export function search(params) {
  return http.post("/game/search", params);
}

//get请求
//获取已发布贴
export function getMyPost(params) {
  return http.get("/game/seller/posted_posts", params);
}
//获取收藏
export function getMyCollection(params) {
  return http.get("/game/buyer/favposts", params);
}
//获取已卖出
export function getMySold(params) {
  return http.get("/game/seller/sold_posts", params);
}
//获取已买到
export function getMyBought(params) {
  return http.get("/game/buyer/bought", params);
}
//获取待审核的举报
export function getReport(params) {
  return http.get("/game/admin/report", params);
}
//获取待审核交易贴
export function getAudit(params) {
  return http.get("/game/admin/audit", params);
}
//获取推荐页
export function getRecommend(params) {
  return http.get("/game/buyer/posts?page=1", params);
}
//查看开价列表
export function getPrice(params) {
  return http.get("/game/buyer/gave", params);
}
