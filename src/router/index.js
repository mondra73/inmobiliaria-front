import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Contacto from "../components/ContactoView.vue";
import Login from "../components/LoginView.vue";
import Propiedades from "../components/PropiedadesView.vue";
import PropiedadesPublicas from "../components/PropiedadesPublicasView.vue";
import PropiedadDetalle from "../components/PropiedadDetalleView.vue";
import Dashboard from "../components/DashboardView.vue";
import NuevaPropiedad from "../components/NuevaPropiedadView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contacto", component: Contacto },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/nueva-propiedad", component: NuevaPropiedad, meta: { requiresAuth: true } },
  { path: "/propiedades", component: Propiedades },
  { path: "/propiedades-publicas", component: PropiedadesPublicas },
  { path: "/propiedad/:id", component: PropiedadDetalle }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ GUARD: Bloqueo de rutas privadas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth-token')

  // ✅ Rutas protegidas
  if (to.meta.requiresAuth) {
    if (!token) return next('/login')

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp < now) {
        localStorage.removeItem('auth-token')
        return next('/login')
      }
      return next()
    } catch {
      localStorage.removeItem('auth-token')
      return next('/login')
    }
  }

  // 🚫 Bloquear acceso a /login si ya tiene sesión válida
  if (to.path === '/login' && token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp > now) {
        return next('/dashboard')
      }
    } catch {
      // Token inválido, dejar pasar
    }
  }

  next()
})


export default router;
