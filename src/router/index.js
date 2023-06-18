import VueRouter from "vue-router";

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
    { name: "admin-index", path: "/admin", component: AdminIndex },
    { name: "home-index", path: "/home", component: HomeIndex },
    { name: "audit", path: "/audit-topic", component: AuditTopic },
    { name: "view", path: "/view-topic", component: ViewTopic },
    { name: "my-topic", path: "/my-topic", component: MyTopic },
    { name: "topic-center", path: "/topic-center", component: TopicCenter },
    { name: "chat-room", path: "/chat-room", component: ChatRoom },
  ],
});
