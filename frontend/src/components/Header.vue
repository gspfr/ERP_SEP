<template>
  <div class="header-container">
    <h1 class="header-title"><router-link to="/">LA SEPEFREI</router-link></h1>
    <ul>
      <li v-if="isAuthenticated">
        <router-link to="/clients">Clients</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/login">Se connecter</router-link>
      </li>
      <li v-if="!isAuthenticated">
        <router-link to="/register">S'inscrire</router-link>
      </li>
      <li v-if="isAuthenticated">
        <bouton @click="logout" class="logout-button">Se déconnecter</bouton>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated } from "../auth";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("authToken");
  isAuthenticated.value = false;
  router.push("/login");
};

onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem("authToken");
});
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 0 20px;
}

.header-container ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 0;
  padding: 0;
}

.header-container ul li a {
  color: black;
  text-decoration: none;
}

.header-title a {
  color: var(--primary-green);
  text-decoration: none;
}

.logout-button {
  background-color: var(--secondary-pink);
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
