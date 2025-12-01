<template>
  <div class="clients-container">
    <h2>Dashboard des clients</h2>
    <FilterClients
      :clients="clients"
      @update:filters="filters = $event"
      @clientAdded="clients.push($event)"
    />
    <DashboardCliensts
      :clients="filteredClients"
      @clientUpdated="updateClientInList"
      @clientDeleted="removeClientFromList"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DashboardCliensts from "../components/DashboardCliensts.vue";
import FilterClients from "../components/FilterClients.vue";

const clients = ref([]);
const filters = ref({
  search: "",
  status: "",
  order: "asc",
});

const updateClientInList = (updatedClient) => {
  const index = clients.value.findIndex((c) => c.id === updatedClient.id);
  if (index !== -1) {
    clients.value[index] = updatedClient;
  }
};

const removeClientFromList = (deletedClientId) => {
  clients.value = clients.value.filter((c) => c.id !== deletedClientId);
};

const filteredClients = computed(() => {
  let result = clients.value;

  if (filters.value.status) {
    result = result.filter((c) => c.statut === filters.value.status);
  }

  if (filters.value.search) {
    const s = filters.value.search.toLowerCase();
    result = result.filter(
      (c) =>
        (c.nom && c.nom.toLowerCase().includes(s)) ||
        (c.prenom && c.prenom.toLowerCase().includes(s)) ||
        (c.entreprise && c.entreprise.toLowerCase().includes(s))
    );
  }

  if (filters.value.order === "desc") {
    result = [...result].sort((a, b) => b.nom.localeCompare(a.nom));
  } else if (filters.value.order === "asc") {
    result = [...result].sort((a, b) => a.nom.localeCompare(b.nom));
  }

  return result;
});

const fetchclients = async () => {
  try {
    const response = await fetch("http://localhost:3000/clients");
    if (!response.ok) {
      throw new Error("Pas de réponse du serveur");
    }
    clients.value = await response.json();
  } catch (error) {
    console.error("Il y a eu un problème avec votre opération fetch :", error);
  }
};

onMounted(() => {
  fetchclients();
});
</script>

<style scoped>
.clients-container {
  padding: 20px 60px;
}
</style>
