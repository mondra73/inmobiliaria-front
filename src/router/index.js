import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Contacto from '../components/ContactoView.vue';
import Login from '../components/LoginView.vue';
import Dashboard from '../components/DashboardView.vue';
import NuevaPropiedad from '../components/NuevaPropiedadView.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contacto', component: Contacto },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/nueva-propiedad', component: NuevaPropiedad }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
