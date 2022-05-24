import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Register from "../views/Register.vue";
import Home from "../views/Home.vue";
import RequestForm from "../views/RequestForm.vue";
import MyRequests from "../views/MyRequests.vue";
import RequestDetails from "../views/RequestDetails.vue";
import UserChat from "../views/UserChat.vue";
import AdminChat from "../views/AdminChat.vue";

import { auth } from "@/api/auth";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      auth: true,
    },
  },
  {
    path: "/request-form",
    name: "RequestForm",
    component: RequestForm,
  },
  {
    path: "/my-requests",
    name: "MyRequests",
    component: MyRequests,
  },
  {
    path: "/request-details",
    name: "RequestDetails",
    component: RequestDetails,
  },
  {
    path: "/user-chat",
    name: "UserChat",
    component: UserChat,
  },
  {
    path: "/admin-chat",
    name: "AdminChat",
    component: AdminChat,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (to.matched.some((record) => record.meta.auth) && !user) {
      next("/login");
    } else {
      if (user) {
        store.dispatch("setIsAdmin", user.uid === "NOgpPp4ca5b9wwqmAyBWS73IoCa2");
        store.dispatch("setUser", user);
      }

      next();
    }
  });
});

export default router;
