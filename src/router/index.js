import VueRouter from "vue-router";
import Cookies from "js-cookie";
// 使用element-ui Message做消息提醒
import { Message } from "element-ui";

// 引入用到的组件
import LoginIndex from "../views/LoginIndex";
import MainIndex from "../views/MainIndex";
import RegisterIndex from "../views/RegisterIndex";
import UserCenter from "../views/UserCenter.vue";
import ChangePassword from "../views/ChangePassword.vue";
import PostTopic from "../views/PostTopic.vue";
import AdminIndex from "../views/AdminIndex.vue";
import HomeIndex from "../views/HomeIndex.vue";
import TopicCenter from "../views/TopicCenter.vue";
import AuditTopic from "../views/AuditTopic.vue";
import ViewTopic from "../views/ViewTopic.vue";
import MyTopic from "../views/MyTopic.vue";
import ChatRoom from "../views/ChatRoom.vue";
import AuditList from "../views/AuditList.vue";
import AllowUser from "../views/AllowUser.vue";
import ReportList from "../views/ReportList.vue";
import BackMoney from "../views/BackMoney.vue";
import MySold from "../views/MySold.vue";
import MyBought from "../views/MyBought.vue";
import MyPost from "../views/MyPost.vue";
import MyCollection from "../views/MyCollection.vue";
// 创建并暴露路由
const router = new VueRouter({
  //   history: createWebHistory(process.env.BASE_URL),
  // mode: "history",
  routes: [
    { name: "main-index", path: "/main", component: MainIndex },
    { name: "login-index", path: "/login", component: LoginIndex },
    { name: "register-index", path: "/register", component: RegisterIndex },
    { name: "center-index", path: "/center", component: UserCenter },
    { name: "change-password", path: "/password", component: ChangePassword },
    { name: "post-topic", path: "/post-topic", component: PostTopic },
    {
      name: "admin-index",
      path: "/admin",
      component: AdminIndex,
      children: [
        {
          name: "audit",
          path: "/audit",
          component: AuditList,
        },
        {
          name: "allow",
          path: "/allow",
          component: AllowUser,
        },
        {
          name: "report",
          path: "/report",
          component: ReportList,
        },
        {
          name: "back",
          path: "/back",
          component: BackMoney,
        },
      ],
      beforeEnter: (to, form, next) => {
        console.log(to, form);
        if (!Cookies.get("permission")) {
          Message.error("无权限查看");
        } else {
          next();
        }
      },
    },
    { name: "home-index", path: "/home", component: HomeIndex },
    { name: "audit", path: "/audit-topic", component: AuditTopic },
    { name: "view", path: "/view-topic", component: ViewTopic },
    { name: "my-topic", path: "/my-topic", component: MyTopic },
    {
      name: "topic-center",
      path: "/topic-center",
      component: TopicCenter,
      children: [
        {
          name: "my-collection",
          path: "/my-collection",
          component: MyCollection,
        },
        {
          name: "my-post",
          path: "/my-post",
          component: MyPost,
        },
        {
          name: "my-sold",
          path: "/my-sold",
          component: MySold,
        },
        {
          name: "my-bought",
          path: "/my-bought",
          component: MyBought,
        },
      ],
    },
    { name: "chat-room", path: "/chat-room", component: ChatRoom },
  ],
});
router.beforeEach((to, form, next) => {
  console.log(to, form);
  if (
    !Cookies.get("token") &&
    to.name !== "home-index" &&
    to.name !== "login-index" &&
    to.name !== "register-index" &&
    to.path !== "/"
  ) {
    Message.error("请先登录");
    return { name: "home-index" };
  } else next();
});
export default router;
