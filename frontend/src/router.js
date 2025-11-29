import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Clients from "./views/Clients.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  { path: "/clients", component: Clients, name: "Clients" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
