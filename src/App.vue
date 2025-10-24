<script setup>
  import { ref, watch } from 'vue'

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
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <Button label="Verify" />
  <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
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
    <ToggleSwitch v-model="checked">
      <template #handle="{ checked }"></template>
    </ToggleSwitch>
  </div>
</template>

<style scoped></style>
