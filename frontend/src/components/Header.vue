<template>
  <div class="header-container">
    <h1 class="header-title"><router-link to="/">LA SEPEFREI</router-link></h1>
    <ul>
      <li><router-link to="/clients">Clients</router-link></li>
      <li><router-link to="/login">Se connecter</router-link></li>
      <li><router-link to="/register">S'inscrire</router-link></li>
    </ul>
  </div>
</template>

<script setup></script>

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
</style>
