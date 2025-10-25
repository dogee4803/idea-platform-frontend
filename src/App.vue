<script setup>
  import { ref, watch } from 'vue'
  import NavBar from './components/NavBar.vue'
  import Header from './components/Header.vue'

  // Считываем состояние тёмной темы из localStorage
  const checked = ref(localStorage.getItem('darkMode') === 'enabled')

  // Функция переключения тёмной темы
  function toggleDarkMode() {
    const isDarkMode = checked.value
    document.documentElement.classList.toggle('my-app-dark', isDarkMode)
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled')
  }

  // Следим за изменением переключателя
  watch(checked, toggleDarkMode)

  // Если при загрузке странички darkMode = 'enabled', сразу включаем тёмную тему
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.add('my-app-dark')
  }
</script>

<template>
  <Header />
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<style scoped></style>
