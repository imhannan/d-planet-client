import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: { requiresGuest: true },
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      meta: { requiresGuest: true },
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { requiresAuth: true },
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      meta: { requiresAuth: true },
      component: () => import("@/layouts/AdminLayout.vue"),
      children: [
        {
          path: "dashboard",
          name: "admin.dashboard",
          component: () => import("@/views/admin/IndexView.vue"),
        },
        {
          path: "users",
          name: "admin.users",
          component: () => import("@/views/admin/UsersView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  if (to.meta?.requiresAuth && !auth.isLoggedIn) {
    next({ name: "home" });
  } else if (to.meta?.requiresGuest && auth.isLoggedIn) {
    console.log("redirecting to dashboard");
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
