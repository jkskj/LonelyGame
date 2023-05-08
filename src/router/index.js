import VueRouter from "vue-router";

// 引入用到的组件
import LoginIndex from "../views/LoginIndex";
import MainIndex from "../views/MainIndex";
import RegisterIndex from "../views/RegisterIndex";
import UserCenter from "../views/UserCenter.vue";
import ChangePassword from "../views/ChangePassword.vue";
import PostTopic from "../views/PostTopic.vue";
// 创建并暴露路由
export default new VueRouter({
  //   history: createWebHistory(process.env.BASE_URL),
  // mode: "history",
  routes: [
    { name: "main-index", path: "/main", component: MainIndex },
    { name: "login-index", path: "/login", component: LoginIndex },
    { name: "register-index", path: "/register", component: RegisterIndex },
    { name: "center-index", path: "/center", component: UserCenter },
    { name: "change-password", path: "/password", component: ChangePassword },
    { name: "post-topic", path: "/post-topic", component: PostTopic },
  ],
});
