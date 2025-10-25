import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import Button from "primevue/button"
import ToggleSwitch from 'primevue/toggleswitch';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';

import router from './router'

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark',
        }
    }
});

app.component('Button', Button);
app.component('ToggleSwitch', ToggleSwitch);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('Card', Card);

app.use(router)
app.mount('#app');