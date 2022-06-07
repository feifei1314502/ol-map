import Vue from "vue";
import App from "./App.vue";

import './mock'
Vue.config.productionTip = false;
import axios from "axios";
Vue.prototype.$axios = axios;
import sgui from "southgisui";
import "southgisui/lib/sgui-theme/index.css";
var dragReserveSize = { left: 25, right: 25, top: 25, bottom: 25 };
Vue.use(sgui, { size: "small", draggable: true, dragReserveSize });
new Vue({
  render: (h) => h(App),
}).$mount("#app");


