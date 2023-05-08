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