<template>
    <div>
        <Tabs value="/">
            <TabList>
                <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
                    <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                        <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
                            <i :class="tab.icon" />
                            <span>{{ tab.label }}</span>
                        </a>
                    </router-link>
                </Tab>
            </TabList>
        </Tabs>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';

const items = ref([
    { label: 'Главная', icon: 'pi pi-home', route: '/' },
    { label: 'Мои идеи', icon: 'pi pi-lightbulb', route: '/ideas' },
    { label: 'Подать идею', icon: 'pi pi-plus-circle', route: '/submit-idea' },
    { label: 'Модерация', icon: 'pi pi-check-circle', route: '/moderation' },
    { label: 'Достижения', icon: 'pi pi-star', route: '/achievements' },
    { label: 'Игра', icon: 'pi pi-play', route: '/game' },
    { label: 'Профиль', icon: 'pi pi-user', route: '/profile' }
])
</script>

<style scoped>
/* Стили для активной вкладки */
:deep(.p-tablist .p-tab.p-highlight) {
    background-color: var(--primary-color);
    color: white;
}

:deep(.p-tablist .p-tab) {
    padding: 1rem;
    transition: background-color 0.3s;
}

:deep(.p-tablist .p-tab:hover) {
    background-color: #e9ecef;
}

:deep(.p-tablist .p-tab.p-highlight:hover) {
    background-color: var(--primary-600);
}

.text-inherit {
    text-decoration: none;
    color: inherit;
}

:deep(.p-tablist .p-tab i) {
    margin-right: 0.5rem;
}
</style>