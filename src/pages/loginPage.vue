<template>
  <div class="login-container">
    <Card class="login-card">
      <template #title>
        <div class="login-header">
          <img src="/pek_logo.png" alt="ПЭК" class="login-logo" />
          <h2>Вход в генератор идей</h2>
          <p class="login-subtitle">Войдите в свою учетную запись</p>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="handleSubmit" class="login-form">
          <!-- Поле email с маской -->
          <div class="field">
            <label for="email" class="field-label">
              <i class="pi pi-envelope field-icon"></i>
              Электронная почта
            </label>
            <div class="input-wrapper">
              <InputMask
                id="email"
                v-model="form.email"
                mask="a*@a*.a*"
                placeholder="example@company.com"
                class="input-field"
                :class="{ 'p-invalid': errors.email, 'p-valid': isEmailValid }"
                @blur="validateEmail"
                @complete="onEmailComplete"
                :unmask="true"
              />
            </div>
            <transition name="fade">
              <small class="p-error error-message" v-if="errors.email">
                <i class="pi pi-exclamation-circle"></i>
                {{ errors.email }}
              </small>
            </transition>
            <transition name="fade">
              <small class="p-success success-message" v-if="isEmailValid && form.email">
                <i class="pi pi-check-circle"></i>
                Корректный email
              </small>
            </transition>
          </div>

          <!-- Поле пароля -->
          <div class="field">
            <label for="password" class="field-label">
              <i class="pi pi-lock field-icon"></i>
              Пароль
            </label>
            <div class="input-wrapper">
              <Password
                id="password"
                v-model="form.password"
                placeholder="Введите ваш пароль"
                toggleMask
                :feedback="false"
                :class="{ 'p-invalid': errors.password }"
                @blur="validatePassword"
              />
            </div>
            <transition name="fade">
              <small class="p-error error-message" v-if="errors.password">
                <i class="pi pi-exclamation-circle"></i>
                {{ errors.password }}
              </small>
            </transition>
          </div>

          <!-- Запомнить меня -->
          <div class="remember-me">
            <Checkbox 
              v-model="form.remember_me" 
              binary 
              inputId="remember_me"
              :class="{ 'p-checkbox-checked': form.remember_me }"
            />
            <label for="remember_me" class="remember-label">
              Запомнить меня
            </label>
          </div>

          <!-- Кнопка входа -->
          <Button 
            label="Войти в систему" 
            type="submit"
            class="login-button"
            :loading="loading"
            :disabled="!isFormValid || loading"
          >
            <template #icon>
              <i class="pi pi-sign-in" v-if="!loading"></i>
            </template>
          </Button>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import InputMask from 'primevue/inputmask'
import Card from 'primevue/card'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

const router = useRouter()

// Данные формы
const form = reactive({
  email: '',
  password: '',
  remember_me: false
})

// Состояние
const loading = ref(false)
const errors = reactive({
  email: '',
  password: ''
})

// Валидация
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return form.email && emailRegex.test(form.email)
})

const isFormValid = computed(() => {
  return isEmailValid.value && form.password.length >= 6
})

// Событие когда маска заполнена
const onEmailComplete = () => {
  validateEmail()
}

// Валидация email
const validateEmail = () => {
  if (!form.email) {
    errors.email = 'Email обязателен для заполнения'
  } else if (!isEmailValid.value) {
    errors.email = 'Введите корректный email адрес'
  } else {
    errors.email = ''
  }
}

// Валидация пароля
const validatePassword = () => {
  if (!form.password) {
    errors.password = 'Пароль обязателен для заполнения'
  } else if (form.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов'
  } else {
    errors.password = ''
  }
}

// Обработка отправки формы
const handleSubmit = () => {
  validateEmail()
  validatePassword()

  if (!isFormValid.value) {
    return
  }

  loading.value = true

  // Имитация загрузки
  setTimeout(() => {
    loading.value = false
    alert(`Вход выполнен!\nEmail: ${form.email}\nПароль: ${form.password}`)
    
    // Перенаправление на главную (для демо)
    router.push('/')
  }, 1500)
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--surface-ground);
}

.login-card {
  width: 100%;
  max-width: 440px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid var(--surface-200);
}

.login-header {
  text-align: center;
  margin-bottom: 0.5rem;
}

.login-logo {
  height: 70px;
  margin-bottom: 1.5rem;
}

.login-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-weight: 700;
  font-size: 1.5rem;
}

.login-subtitle {
  margin: 0;
  color: var(--text-color-secondary);
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.field-icon {
  font-size: 0.9rem;
  color: var(--primary-color);
}

/* Обертка для полей ввода */
.input-wrapper {
  width: 100%;
  position: relative;
}

/* Общие стили для всех полей ввода */
:deep(.p-inputmask),
:deep(.p-password .p-password-input) {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 2px solid var(--surface-300);
  transition: all 0.3s ease;
  font-size: 1rem;
  background: var(--surface-ground);
  font-family: inherit;
}

/* Стили для фокуса */
:deep(.p-inputmask:focus),
:deep(.p-password.p-focus .p-password-input) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.1);
  outline: none;
}

/* Стили для невалидных полей */
:deep(.p-inputmask.p-invalid),
:deep(.p-password.p-invalid .p-password-input) {
  border-color: var(--red-500);
}

/* Стили для валидных полей */
:deep(.p-inputmask.p-valid),
:deep(.p-password.p-valid .p-password-input) {
  border-color: var(--green-500);
}

/* Стили для компонента Password */
:deep(.p-password) {
  width: 100%;
}

:deep(.p-password .p-inputtext) {
  width: 100%;
  padding-right: 2.5rem; /* Место для иконки */
}

:deep(.p-password .p-password-toggle) {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  width: auto;
  height: auto;
}

:deep(.p-password .p-password-toggle:hover) {
  color: var(--primary-color);
}

.error-message, .success-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.success-message {
  color: var(--green-600);
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0.5rem 0;
}

.remember-label {
  color: var(--text-color-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  user-select: none;
}

.login-button {
  width: 100%;
  height: 3.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
}

.login-button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.2);
}

/* Анимации */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Адаптивность */
@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .login-header h2 {
    font-size: 1.3rem;
  }
  
  .login-logo {
    height: 60px;
  }
}

/* Стили для карточки и чекбокса */
:deep(.p-card) {
  background: var(--surface-card);
}

:deep(.p-checkbox .p-checkbox-box) {
  border: 2px solid var(--surface-300);
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background: var(--primary-color);
  border-color: var(--primary-color);
}
</style>