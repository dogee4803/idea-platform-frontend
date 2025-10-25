<template>
  <div class="header-container">
    <!-- Левая часть: логотип и название -->
    <h2 class="header">
      <img src="/pek_logo.png" alt="ПЭК" class="logo" />
    </h2>

    <!-- Правая часть: переключатель темы и пользователь -->
    <div class="header-right-section">
      <!-- Переключатель темы -->
      <div class="toggle-container">
        <div class="toggle-text">
          <i
            :class="[
              'pi',
              { 'pi-sun': !checked, 'pi-moon': checked },
              'toggle-icon'
            ]"
          />
        </div>
        <ToggleSwitch v-model="checked" class="custom-toggle">
          <template #handle="{ checked }"></template>
        </ToggleSwitch>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ToggleSwitch from 'primevue/toggleswitch'


// Считываем состояние тёмной темы из localStorage
const checked = ref(localStorage.getItem('darkMode') === 'enabled')

// Считываем ФИО пользователя из sessionStorage (или задаём заглушку)
const userFullName = ref(sessionStorage.getItem('name') || 'Пользователь С.Л.')

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

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header {
  font-size: 2.5rem;
  text-align: left;
}

/* Логотип */
.logo {
  height: 3rem;
  width: auto;
  display: block;
}

/* Правая часть (переключатель + пользователь) */
.header-right-section {
  display: flex;
  align-items: center;
  gap: 20px; /* Расстояние между переключателем и пользователем */
}

/* Стили переключателя темы */
.toggle-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle-icon {
  font-size: 1.5rem;
  transition: all 0.3s;
}

.pi-sun {
  color: rgb(255, 183, 0);
}

.pi-moon {
  color: lightblue;
}

/* Стили PrimeVue ToggleSwitch */
.p-toggleswitch {
  --switch-height: 50px;
  --switch-width: 100px;
}

.p-toggleswitch-slider {
  border-radius: 25px;
  height: 30px;
  width: 60px;
}

.p-toggleswitch-handle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
</style>