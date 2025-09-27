import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import About from "../views/AboutView.vue";
import Contacto from "../components/ContactoView.vue";
import Login from "../components/LoginView.vue";
import Propiedades from "../components/PropiedadesView.vue";
import PropiedadesPublicas from "../components/PropiedadesPublicasView.vue";
import PropiedadDetalle from "../components/PropiedadDetalle/PropiedadDetalleView.vue";
import Dashboard from "../components/DashboardView.vue";
import Operaciones from "../components/OperacionesView.vue";
import NuevaOperacionView from "../components/NuevaOperacionView.vue";
import ClientesView from "../components/ClientesView.vue"
import NuevoCliente from "../components/NuevoClienteView.vue";
import NuevaPropiedad from "../components/NuevaPropiedad/NuevaPropiedadView.vue";
import NotFoundView from "../components/NotFoundView.vue";
import NosotrosView from "../components/NosotrosView.vue";
import DetalleClienteView from "../components/DetalleClienteView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/contacto", component: Contacto },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/operaciones", component: Operaciones, meta: { requiresAuth: true } },
  { path: "/nueva-operacion", component: NuevaOperacionView, meta: { requiresAuth: true } },
  { path: "/clientes", component: ClientesView, meta: { requiresAuth: true } },
  { path: "/cliente/:id", component: DetalleClienteView, meta: { requiresAuth: true } },
  { path: "/nuevo-cliente", component: NuevoCliente, meta: { requiresAuth: true } },
  { path: "/nueva-propiedad", component: NuevaPropiedad, meta: { requiresAuth: true } },
  { path: "/propiedades", component: Propiedades,  meta: { requiresAuth: true } },
  { path: "/propiedades-publicas", component: PropiedadesPublicas },
  { path: "/propiedad/:id", component: PropiedadDetalle },
  { path: "/nosotros", component: NosotrosView },
  { path: '/:pathMatch(.*)*', component: NotFoundView }
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
