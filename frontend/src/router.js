import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Clients from "./views/Clients.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/clients", component: Clients, name: "Clients" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/register", component: Register, name: "Register" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  if (
    to.name !== "Home" &&
    to.name !== "Login" &&
    to.name !== "Register" &&
    !isAuthenticated
  ) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
