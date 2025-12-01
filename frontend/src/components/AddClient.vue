<template>
  <div class="addclient-container">
    <button @click="clicked = true">Ajouter un Utilisateur</button>
    <div v-if="clicked" class="popup-overlay">
      <form class="popup-form" @submit.prevent="postClient">
        <input
          v-model="nom"
          type="text"
          name="nom"
          placeholder="Nom"
          required
        />
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
        <div class="popup-actions">
          <button type="submit">Ajouter</button>
          <button type="button" @click="clicked = false">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const clicked = ref(false);
const nom = ref("");
const prenom = ref("");
const email = ref("");
const telephone = ref("");
const entreprise = ref("");
const statut = ref("");

const emit = defineEmits(["clientAdded"]);

const postClient = async () => {
  try {
    const response = await fetch("http://localhost:3000/clients", {
      method: "POST",
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
    });
    if (response.ok) {
      const newClient = await response.json();
      emit("clientAdded", newClient);
      clicked.value = false;
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du client :", error);
  }
};
</script>

<style scoped>
.addclient-container {
  display: flex;
  align-items: center;
  margin: 20px;
}

.addclient-container button {
  background-color: var(--secondary-pink);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 30px;
}

.popup-overlay {
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

.popup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  padding: 50px;
  border-radius: 10px;
}

.popup-form input,
.popup-form select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
