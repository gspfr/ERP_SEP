<template>
  <div class="clientform-container">
    <form class="clientform" @submit.prevent="submitForm">
      <h2>Formulaire Client</h2>
      <input v-model="nom" type="text" name="nom" placeholder="Nom" required />
      <input
        v-model="prenom"
        type="text"
        name="prenom"
        placeholder="Prénom"
        required
      />
      <input
        v-model="email"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        v-model="telephone"
        type="tel"
        name="telephone"
        placeholder="Téléphone"
        required
      />
      <input
        v-model="entreprise"
        type="text"
        name="entreprise"
        placeholder="Entreprise"
        required
      />
      <select v-model="statut" name="statut" required>
        <option value="" disabled selected>Statut</option>
        <option value="actif">Actif</option>
        <option value="inactif">Inactif</option>
        <option value="prospect">Prospect</option>
      </select>
      <div class="clientform-actions">
        <button type="submit">Mettre à jour</button>
        <button type="button" @click="deleteClient">Supprimer</button>
        <button type="button" @click="emit('close')">Annuler</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, watch } from "vue";

const props = defineProps({
  client: Object,
});

const emit = defineEmits(["close", "updated", "deleted"]);

const nom = ref("");
const prenom = ref("");
const email = ref("");
const telephone = ref("");
const entreprise = ref("");
const statut = ref("");

const submitForm = async () => {
  try {
    const reponse = await fetch(
      `http://localhost:3000/clients/${props.client.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom.value,
          prenom: prenom.value,
          email: email.value,
          telephone: telephone.value,
          entreprise: entreprise.value,
          statut: statut.value,
        }),
      }
    );
    if (reponse.ok) {
      const updatedClient = await reponse.json();
      emit("updated", updatedClient);
      emit("close");
    }
  } catch (error) {
    console.error("Erreur lors de la soumission du formulaire :", error);
  }
};

const deleteClient = async () => {
  try {
    const reponse = await fetch(
      `http://localhost:3000/clients/${props.client.id}`,
      {
        method: "DELETE",
      }
    );
    if (reponse.ok) {
      emit("deleted", props.client.id);
      emit("close");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du client :", error);
  }
};

watch(
  () => props.client,
  (client) => {
    if (client) {
      nom.value = client.nom || "";
      prenom.value = client.prenom || "";
      email.value = client.email || "";
      telephone.value = client.telephone || "";
      entreprise.value = client.entreprise || "";
      statut.value = client.statut || "";
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.clientform-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.clientform {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 50px;
  border-radius: 10px;
}

.clientform input,
.clientform select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.clientform-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.clientform-actions button {
  background-color: var(--secondary-pink);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 30px;
}
</style>
