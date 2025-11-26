<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const clients = ref([]);

const fetchclients = async () => {
  try {
    const response = await fetch("http://localhost:3000/clients");
    if (!response.ok) {
      throw new Error("Pas de réponse du serveur");
    }
    clients.value = await response.json();
    console.log(clients.value);
  } catch (error) {
    console.error("Il y a eu un problème avec votre opération fetch :", error);
  }
};

onMounted(() => {
  fetchclients();
});
</script>

<style scoped></style>
