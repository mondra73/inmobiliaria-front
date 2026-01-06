import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import vuetify from './plugins/vuetify'
import './assets/fonts/fonts.css';

if (window.location.hostname === 'espinosainmob.onrender.com') {
  window.location.href = `https://www.espinosainmob.com.ar${window.location.pathname}${window.location.search}`;
} else {
  const app = createApp(App)
  app.use(vuetify)
  app.use(router)
  app.mount('#app')
}