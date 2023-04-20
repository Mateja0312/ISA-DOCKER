import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { nextTick } from "vue/types/umd";
import store from "../store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HomeJuncture.vue"),
  },
  {
    path: "*",
    component: () => import("../views/Page404.vue"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("../views/Registration.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/centers",
    name: "Centers",
    component: () => import("../views/Centers.vue"),
  },
  {
    path: "/center/:id",
    name: "Center",
    component: () => import("../views/Center.vue"),
    props: true,
    beforeEnter: (to, from, next) => {
      const role = store.state.user.role ?? null;
      if (!role) {
        return false;
      } else next();
    },
  },
  {
    path: "/feedback-response/:id",
    name: "FeedbackRespond",
    component: () => import("../views/FeedbackRespond.vue"),
    props: true,
  },
  {
    path: "/questionnaire",
    name: "Questionnaire",
    component: () => import("../views/Questionnaire.vue"),
  },
  {
    path: "/feedback",
    name: "Feedback",
    component: () => import("../views/Feedback.vue"),
  },
  {
    path: "/feedback-response",
    name: "FeedbackRespondList",
    component: () => import("../views/FeedbackRespondList.vue"),
  },
  {
    path: "/feedback-history",
    name: "FeedbackHistory",
    component: () => import("../views/FeedbackHistory.vue"),
  },
  {
    path: "/feedback-history/:id",
    name: "MyFeedback",
    component: () => import("../views/MyFeedback.vue"),
    props: true,
  },
  {
    path: "/feedback-response-history",
    name: "FeedbackResponseHistory",
    component: () => import("../views/FeedbackResponseHistory.vue"),
  },
  {
    path: "/feedback-response-history/:id",
    name: "FeedbackResponse",
    component: () => import("../views/FeedbackResponse.vue"),
    props: true,
  },
  {
    path: "/center-visits",
    name: "CenterVisits",
    component: () => import("../views/CenterVisits.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
