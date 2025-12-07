<template>
  <div class="home-container">
    <div v-if="!isAuthenticated" class="looser-div">
      <h1>Vous n'êtes pas connecté</h1>
      <p>Veuillez vous connecter ou vous inscrire pour accéder au contenu.</p>
    </div>
    <div v-if="isAuthenticated" class="connected-div">
      <h1>Bienvenue dans votre nouvel ERP</h1>
    </div>
  </div>
</template>

<script setup>
import { isAuthenticated } from "../auth";
</script>

<style scoped>
.home-container {
  padding: 20px;
}
</style>
