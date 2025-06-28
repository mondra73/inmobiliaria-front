// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import vuetify from './plugins/vuetify'

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
