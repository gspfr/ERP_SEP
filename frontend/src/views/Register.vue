<template>
  <div class="register-container">
    <h2>Formulaire d'inscription</h2>
    <form @submit.prevent="register">
      <input v-model="nom" placeholder="Nom" required />
      <input v-model="prenom" placeholder="Prénom" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const nom = ref("");
const prenom = ref("");
const email = ref("");
const password = ref("");
const register = async () => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        mot_de_passe: password.value,
      }),
    });

    if (response.ok) {
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      nom.value = "";
      prenom.value = "";
      email.value = "";
      password.value = "";
    } else {
      const errorData = await response.json();
      alert("Erreur lors de l'inscription : " + errorData.message);
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
}

.register-container form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.register-container input {
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-container button {
  padding: 10px;
  background-color: var(--secondary-pink);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
