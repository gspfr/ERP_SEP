<template>
  <div class="dashboard-container">
    <table class="dashboard-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Entreprise</th>
          <th>Statut</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td class="name-cell">
            <img
              class="edit-icon"
              src="../assets/edit.png"
              alt="edit icon"
              @click="openEditForm(client)"
            />
            {{ client.nom }}
          </td>
          <td>{{ client.prenom }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.telephone }}</td>
          <td>{{ client.entreprise }}</td>
          <td :class="['statut-cell', client.statut]">
            <template v-if="editingId === client.id">
              <select
                v-model="editedStatus"
                @change="updateStatus(client)"
                @blur="cancelEdit"
                ref="statusSelect"
              >
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
                <option value="prospect">Prospect</option>
              </select>
            </template>
            <template v-else>
              <span @click="editStatus(client)">{{ client.statut }}</span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ClientForm
    v-if="clientFormVisible"
    :client="selectedClient"
    @close="clientFormVisible = false"
    @updated="onClientUpdated"
    @deleted="onClientDeleted"
  />
</template>

<script setup>
import { ref, defineEmits } from "vue";
import ClientForm from "./ClientForm.vue";

defineProps({
  clients: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["clientUpdated", "clientDeleted"]);

const editingId = ref(null);
const editedStatus = ref("");
const clientFormVisible = ref(false);
const selectedClient = ref(null);

const openEditForm = (client) => {
  selectedClient.value = client;
  clientFormVisible.value = true;
};

const editStatus = (client) => {
  editingId.value = client.id;
  editedStatus.value = client.statut;
};

const onClientUpdated = (updatedClient) => {
  emit("clientUpdated", updatedClient);
  clientFormVisible.value = false;
};

const onClientDeleted = (deletedClient) => {
  emit("clientDeleted", deletedClient);
  clientFormVisible.value = false;
};

const updateStatus = (client) => {
  try {
    fetch(`http://localhost:3000/clients/${client.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...client, statut: editedStatus.value }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut");
      }
      client.statut = editedStatus.value;
      editingId.value = null;
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
  }
};

const cancelEdit = () => {
  editingId.value = null;
};
</script>

<style scoped>
.dashboard-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
}

.dashboard-table thead {
  background-color: var(--secondary-green);
  color: white;
}

.dashboard-table td,
.dashboard-table th {
  padding: 6px;
  border: 1px solid #e0e0e0;
  text-align: center;
}

.statut-cell.actif {
  background-color: #d4edda;
  color: #155724;
}

.statut-cell.inactif {
  background-color: #f8d7da;
  color: #721c24;
}

.statut-cell.prospect {
  background-color: #fff3cd;
  color: #856404;
}

.statut-cell span {
  cursor: pointer;
}

.dashboard-table select {
  border: 1px solid #ccc;
  border-radius: 5px;
}

.name-cell {
  position: relative;
  text-align: center;
}

.name-cell:hover .edit-icon {
  opacity: 1;
}

.edit-icon {
  opacity: 0;
  width: 16px;
  height: 16px;
  position: absolute;
  left: 10px;
}
</style>
