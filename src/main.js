import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "flowbite/src/flowbite";
import "./assets/style/tailwind.scss";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import VueSweetalert2 from "vue-sweetalert2";
import VueMask from 'v-mask'
Vue.use(VueMask)

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
