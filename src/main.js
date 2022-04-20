import Vue from "vue";
import App from "./App.vue";
import './mock'
Vue.config.productionTip = false;
import axios from "axios";
Vue.prototype.$axios = axios;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
