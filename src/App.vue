<script setup>
  function toggleDarkMode() {
      document.documentElement.classList.toggle('my-app-dark');
  }
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <Button label="Verify" />
  <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
</template>

<style scoped></style>
