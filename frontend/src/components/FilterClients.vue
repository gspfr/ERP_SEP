<template>
  <div class="filterclient-container">
    <div class="filters-container">
      <input
        v-model="search"
        type="text"
        placeholder="Rechercher par nom, prénom ou entreprise"
      />

      <select v-model="selectedStatus">
        <option value="">Tous les statuts</option>
        <option value="actif">Actif</option>
        <option value="inactif">Inactif</option>
        <option value="prospect">Prospect</option>
      </select>

      <select v-model="alphabeticalOrder">
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>
    <GraphClients :clients="clients" />
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import GraphClients from "./GraphClients.vue";

const props = defineProps({
  clients: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["update:filters"]);

const search = ref("");
const selectedStatus = ref("");
const alphabeticalOrder = ref("asc");

watch([search, selectedStatus, alphabeticalOrder], () => {
  emit("update:filters", {
    search: search.value,
    status: selectedStatus.value,
    order: alphabeticalOrder.value,
  });
});
</script>

<style scoped>
.filterclient-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.filters-container {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
}

.filters-container input,
.filters-container select {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.filters-container input {
  min-width: 275px;
}
</style>
