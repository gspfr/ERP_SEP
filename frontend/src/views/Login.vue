<template>
  <div class="login-container">
    <h2>Se connecter</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { isAuthenticated } from "../auth";

const email = ref("");
const password = ref("");

const router = useRouter();

const login = async () => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        mot_de_passe: password.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      isAuthenticated.value = true;
      alert("Connexion réussie !");
      email.value = "";
      password.value = "";
      router.push("/");
    } else {
      const errorData = await response.json();
      alert("Erreur lors de la connexion : " + errorData.message);
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    alert("Une erreur est survenue. Veuillez réessayer plus tard.");
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
}

.login-container form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.login-container input {
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-container button {
  padding: 10px;
  background-color: var(--secondary-pink);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
