import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { ElementTiptapPlugin } from "element-tiptap";
// 引入 ElementUI 样式
import "element-ui/lib/theme-chalk/index.css";
// 引入 import element-tiptap 样式
import "element-tiptap/lib/index.css";
import router from "./router"; // 引入路由
import VueRouter from "vue-router";
import store from "./store";
import jsCookie from "js-cookie";
// import SocketService from "@/api/socket";
// // 对服务端进行websocket的连接
// SocketService.Instance.connect();

// Vue.prototype.$socket = SocketService.Instance;
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
Vue.use(
  new VueSocketIO({
    // 生产环境建议关闭，开发环境打开(在控制台看到socket连接和事件监听的信息)
    debug: true,
    connection: SocketIO("http://localhost:8081/"),
    options: {
      // 创建时是否自动连接 我们这里设定为false,在指定页面再开启
      autoConnect: true,
    },
    // 如果没有使用到 store 可不写
    // vuex: {
    //   store,
    //   actionPrefix: 'SOCKET_',// vuex action 前缀
    //   mutationPrefix: 'SOCKET_', // vuex mutation 前缀
    // },
  })
);
Vue.prototype.$cookie = jsCookie;
Vue.config.productionTip = false;
Vue.use(ElementUI);
// 安装 element-tiptap 插件
Vue.use(ElementTiptapPlugin, {
  lang: "zh", // 设置语言为中文
});
Vue.use(VueRouter);
new Vue({
  render: (h) => h(App),
  router,
  store,
  sockets: {
    connecting() {
      console.log("正在连接");
    },
    connect() {
      console.log("连接成功");
    },
    disconnect() {
      console.log("断开连接");
    },
    connect_failed() {
      console.log("连接失败");
    },
    error() {
      console.log("错误发生，并且无法被其他事件类型所处理");
    },
    reconnecting() {
      console.log("正在重连");
    },
    reconnect_failed() {
      console.log("重连失败");
    },
    reconnect() {
      console.log("重连成功");
    },
    welcome: (data) => {
      //全局监听订阅事件，需要与后端约定好
      console.log("welcome data", data);
    },
  },
}).$mount("#app");

// 限制按钮点击事件，在结果返回以前不能继续点击
// Vue.directive("btn-control", {
//   // 插入dom 时做的事情
//   inserted: function (el, bind) {
//     el.addEventListener("click", () => {
//       el.disabled = true;
//       bind.value().then(() => {
//         el.disabled = false;
//       });
//     });
//   },
// });
// Vue 定义自定义指令:防止按钮重复提交
// Vue.directive("btn-timeout", {
//   inserted(el, bind) {
//     el.addEventListener("click", () => {
//       if (!el.disabled) {
//         el.disabled = true;
//         bind.value.func();
//         setTimeout(() => {
//           el.disabled = false;
//         }, bind.value.time || 1000);
//       }
//       else{
//         this.$message('60秒');
//       }
//     });
//   },
// });
// import "lib-flexible/flexible";
// import "postcss-import";
