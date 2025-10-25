<template>
  <div class="game">
    <Card>
      <template #title>
        <div class="game-header">
          <span>Найди пару</span>
          <div class="game-controls">
            <Button 
              label="Новая игра" 
              icon="pi pi-refresh" 
              @click="startNewGame" 
              class="p-button-sm"
            />
            <span class="score">Счёт: {{ score }}</span>
            <span class="timer">Время: {{ formatTime(time) }}</span>
          </div>
        </div>
      </template>
      <template #content>
        <div class="game-container">
          <!-- Игровое поле -->
          <div class="game-board" :class="{ 'game-completed': gameCompleted }">
            <div 
              v-for="card in cards" 
              :key="card.id"
              class="memory-card"
              :class="{ 
                'flipped': card.isFlipped || card.isMatched,
                'matched': card.isMatched
              }"
              @click="flipCard(card)"
            >
              <!-- ПЕРЕДНЯЯ СТОРОНА - только когда карточка не перевернута -->
              <div class="card-front" v-if="!card.isFlipped && !card.isMatched">
                <i class="pi pi-question"></i>
              </div>
              
              <!-- ЗАДНЯЯ СТОРОНА - только когда карточка перевернута или найдена -->
              <div class="card-back" v-else>
                <i :class="card.icon"></i>
              </div>
            </div>
          </div>

          <!-- Сообщение о победе -->
          <Dialog 
            v-model:visible="gameCompleted" 
            modal 
            header="Поздравляем!" 
            :style="{ width: '400px' }"
          >
            <div class="victory-message">
              <i class="pi pi-trophy" style="font-size: 3rem; color: gold;"></i>
              <h3>Вы нашли все пары!</h3>
              <p>Ваш результат: {{ score }} очков</p>
              <p>Затраченное время: {{ formatTime(time) }}</p>
              <Button 
                label="Играть снова" 
                icon="pi pi-replay" 
                @click="startNewGame" 
                class="p-button-success"
              />
            </div>
          </Dialog>

          <!-- Статистика -->
          <Card class="stats-card">
            <template #title>Статистика</template>
            <template #content>
              <div class="stats">
                <div class="stat-item">
                  <span class="stat-label">Найдено пар:</span>
                  <span class="stat-value">{{ matchedPairs }}/8</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Ходы:</span>
                  <span class="stat-value">{{ moves }}</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Лучший счёт:</span>
                  <span class="stat-value">{{ highScore }}</span>
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
import { ref, onMounted, onUnmounted } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

// Иконки для карточек (8 пар)
const cardIcons = [
  'pi pi-heart', 'pi pi-star', 'pi pi-flag', 'pi pi-bell',
  'pi pi-cog', 'pi pi-key', 'pi pi-home', 'pi pi-car'
]

// Состояние игры
const cards = ref([])
const flippedCards = ref([])
const matchedPairs = ref(0)
const moves = ref(0)
const score = ref(0)
const time = ref(0)
const gameCompleted = ref(false)
const highScore = ref(0)
const timer = ref(null)

// Инициализация игры
const initializeGame = () => {
  // Создаем пары карточек
  let gameCards = []
  cardIcons.forEach((icon, index) => {
    gameCards.push(
      { id: index * 2, icon, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, icon, isFlipped: false, isMatched: false }
    )
  })
  
  // Перемешиваем карточки
  cards.value = gameCards.sort(() => Math.random() - 0.5)
}

// Начать новую игру
const startNewGame = () => {
  // Сброс состояния
  flippedCards.value = []
  matchedPairs.value = 0
  moves.value = 0
  score.value = 0
  time.value = 0
  gameCompleted.value = false
  
  // Остановить старый таймер
  if (timer.value) {
    clearInterval(timer.value)
  }
  
  // Инициализировать игру
  initializeGame()
  
  // Запустить таймер
  timer.value = setInterval(() => {
    time.value++
    // Уменьшаем счёт со временем
    if (time.value % 5 === 0 && score.value > 0) {
      score.value = Math.max(0, score.value - 5)
    }
  }, 1000)
}

// Перевернуть карточку
const flipCard = (card) => {
  // Не переворачиваем если: карточка уже перевернута, найдена пара, или уже перевернуто 2 карточки
  if (card.isFlipped || card.isMatched || flippedCards.value.length === 2) {
    return
  }

  // Переворачиваем карточку
  card.isFlipped = true
  flippedCards.value.push(card)

  // Если перевернуто 2 карточки, проверяем на совпадение
  if (flippedCards.value.length === 2) {
    moves.value++
    checkForMatch()
  }
}

// Проверить совпадение карточек
const checkForMatch = () => {
  const [card1, card2] = flippedCards.value

  if (card1.icon === card2.icon) {
    // Совпадение найдено
    card1.isMatched = true
    card2.isMatched = true
    matchedPairs.value++
    
    // Начисляем очки
    score.value += 50
    
    // Проверяем завершение игры
    if (matchedPairs.value === cardIcons.length) {
      finishGame()
    }
    
    flippedCards.value = []
  } else {
    // Не совпало - переворачиваем обратно через секунду
    setTimeout(() => {
      card1.isFlipped = false
      card2.isFlipped = false
      flippedCards.value = []
    }, 1000)
  }
}

// Завершить игру
const finishGame = () => {
  clearInterval(timer.value)
  gameCompleted.value = true
  
  // Бонус за скорость
  const timeBonus = Math.max(0, 300 - time.value)
  score.value += timeBonus
  
  // Обновляем лучший счёт
  if (score.value > highScore.value) {
    highScore.value = score.value
  }
}

// Форматирование времени
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Загрузка лучшего счёта из localStorage
const loadHighScore = () => {
  const saved = localStorage.getItem('memoryGameHighScore')
  highScore.value = saved ? parseInt(saved) : 0
}

// Сохранение лучшего счёта
const saveHighScore = () => {
  localStorage.setItem('memoryGameHighScore', highScore.value.toString())
}

onMounted(() => {
  loadHighScore()
  startNewGame()
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  saveHighScore()
})
</script>

<style scoped>
.game {
  max-width: 800px;
  margin: 0 auto;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.game-controls {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.score, .timer {
  font-weight: bold;
  font-size: 1.1rem;
}

.score {
  color: var(--primary-color);
}

.timer {
  color: var(--green-500);
}

.game-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  align-items: start;
}

/* Игровое поле */
.game-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  max-width: 520px;
  margin: 0 auto;
  padding: 10px;
  background: var(--surface-50);
  border-radius: 12px;
}

/* Карточка */
.memory-card {
  aspect-ratio: 3/4;
  cursor: pointer;
  box-sizing: border-box;
}

/* ОБЕ СТОРОНЫ КАРТОЧКИ - абсолютно одинаковые по размеру */
.card-front, .card-back {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

/* Передняя сторона - вопросительный знак */
.card-front {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-400));
}

.card-front i {
  font-size: 2rem;
}

/* Задняя сторона - символ */
.card-back {
  background: white;
  border: 2px solid var(--primary-color);
}

.card-back i {
  font-size: 2rem;
  color: var(--primary-color);
}

/* Найденные пары */
.memory-card.matched .card-back {
  background: var(--green-100);
  border-color: var(--green-500);
  transform: scale(0.95);
}

/* Анимация переворота */
.memory-card {
  position: relative;
}

.memory-card .card-front,
.memory-card .card-back {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

/* При наведении */
.memory-card:not(.matched):hover .card-front {
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.victory-message {
  text-align: center;
  padding: 1rem;
}

.victory-message h3 {
  color: var(--primary-color);
  margin: 1rem 0;
}

.stats-card {
  text-align: center;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--surface-200);
}

.stat-label {
  font-weight: 500;
}

.stat-value {
  font-weight: bold;
  color: var(--primary-color);
}

/* Адаптивность */
@media (max-width: 768px) {
  .game-container {
    grid-template-columns: 1fr;
  }
  
  .game-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .game-controls {
    justify-content: space-between;
  }
  
  .game-board {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }
  
  .card-front i,
  .card-back i {
    font-size: 1.5rem;
  }
}
</style>