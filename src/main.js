import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/assets/css/page/style.css";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(ElementUI);
let mainVue = new Vue({
  router,
  store,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
export default mainVue;
