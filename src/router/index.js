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
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/nueva-propiedad', component: NuevaPropiedad, meta: { requiresAuth: true } }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token')

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!token) {
      // No hay token → redirigí a login
      return next('/login')
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Math.floor(Date.now() / 1000)

      if (payload.exp < now) {
        // Token vencido → limpiar y redirigir a login
        localStorage.removeItem('auth-token')
        return next('/login')
      }

      // Token válido → dejar pasar
      return next()
    } catch {
      // Token inválido o mal formado
      localStorage.removeItem('auth-token')
      return next('/login')
    }
  }

  // Si la ruta no necesita autenticación, seguir
  next()
})


export default router;
