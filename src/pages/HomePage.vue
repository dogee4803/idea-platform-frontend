<template>
  <div class="home">
    <Card class="quote-card">
      <template #title>Добро пожаловать!</template>
      <template #content>
        <div class="quote-section">
          <i class="pi pi-quote-left quote-icon"></i>
          <p class="quote-text">{{ currentQuote.text }}</p>
          <p class="quote-author">— {{ currentQuote.author }}</p>
          <Button 
            label="Новая цитата" 
            icon="pi pi-refresh" 
            @click="getRandomQuote" 
            class="p-button-text"
          />
        </div>
        
        <Divider />
        
        <div class="stats-grid">
          <Card class="stat-card">
            <template #content>
              <div class="stat-item">
                <i class="pi pi-lightbulb stat-icon"></i>
                <div>
                  <h3>125</h3>
                  <p>Идей подано</p>
                </div>
              </div>
            </template>
          </Card>
          
          <Card class="stat-card">
            <template #content>
              <div class="stat-item">
                <i class="pi pi-check-circle stat-icon"></i>
                <div>
                  <h3>42</h3>
                  <p>Идей внедрено</p>
                </div>
              </div>
            </template>
          </Card>
          
          <Card class="stat-card">
            <template #content>
              <div class="stat-item">
                <i class="pi pi-star stat-icon"></i>
                <div>
                  <h3>15</h3>
                  <p>Достижений</p>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const quotes = ref([
  { text: "Инновация отличает лидера от догоняющего.", author: "Стив Джобс" },
  { text: "Лучший способ предсказать будущее — создать его.", author: "Питер Друкер" },
  { text: "Идеи меняют мир, но только если они реализованы.", author: "Стивен Кови" },
  { text: "Ваши идеи — это семена великих свершений.", author: "Робин Шарма" },
  { text: "Каждая большая проблема — это возможность проявить себя.", author: "Дейл Карнеги" }
])

const currentQuote = ref({})

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.value.length)
  currentQuote.value = quotes.value[randomIndex]
}

onMounted(() => {
  getRandomQuote()
})
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
}

.quote-card {
  text-align: center;
}

.quote-section {
  padding: 2rem 0;
}

.quote-icon {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.quote-text {
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.quote-author {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.stat-card {
  text-align: center;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.stat-icon {
  font-size: 2rem;
  color: var(--primary-color);
}

.stat-item h3 {
  margin: 0;
  font-size: 2rem;
  color: var(--primary-color);
}

.stat-item p {
  margin: 0;
  color: #666;
}
</style>