<template>
  <div class="home">
    <h1>Добро пожаловать в Idea Platform!</h1>
    <p>Платформа для генерации идей сотрудниками</p>
    <div class="actions">
      <Button label="Посмотреть идеи" @click="$router.push('/ideas')" />
      <Button label="Предложить идею" severity="success" />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'

export default {
  name: 'HomeView',
  components: {
    Button
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>