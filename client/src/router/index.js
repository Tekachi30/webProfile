import { createRouter, createWebHistory } from "vue-router";

import home from "../views/home.vue";
import about from "../views/about.vue";
import login from "../views/login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "login",
      component: login,
    },
    {
      path: "/home",
      name: "home",
      component: home,
    },
    {
      path: "/about",
      name: "about",
      component: about,
    },
    
  ],
});

export default router;
