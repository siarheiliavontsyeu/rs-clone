import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";

// в папке views лежат страницы
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      meta: { title: "Войти" },
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      name: "main-view",
      redirect: "home",
      component: MainView,
      children: [
        {
          path: "/home",
          name: "home",
          meta: { title: "Все о фильмах" },
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/about",
          name: "about",
          meta: { title: "Все о нас" },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          meta: { title: "Все о вас" },
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/ProfileView.vue"),
        },

        {
          path: "/name/:nameId",
          name: "name",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/NameView.vue"),
        },
        {
          path: "/movie/:movieId",
          name: "movie",
          redirect: { name: "review" },
          component: () => import("../views/MovieView.vue"),
          children: [
            {
              name: "review",
              path: "review",
              component: () => import("../views/MovieViews/ReviewView.vue"),
            },
            {
              name: "award",
              path: "awards",
              component: () => import("../views/MovieViews/AwardView.vue"),
            },
            {
              name: "premiere",
              path: "premiere",
              component: () => import("../views/MovieViews/PremiereView.vue"),
            },
            {
              name: "image",
              path: "images",
              component: () => import("../views/MovieViews/ImageView.vue"),
            },
          ],
        },
        {
          path: "/filters",
          name: "filters",
          meta: { title: "Что ищем?" },
          component: () => import("../views/FiltersView.vue"),
        },
        {
          path: "/films",
          name: "films",
          component: () => import("../views/MoviesList.vue"),
        },
        {
          path: "/serials",
          name: "serials",
          component: () => import("../views/SerialsList.vue"),
        },
      ],
    },
    {
      path: "/:catchAll(.*)",

      meta: { title: "Страницы нет" },
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Смотрим";
  next();
});

export default router;
