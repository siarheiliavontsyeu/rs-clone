import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";

// в папке views лежат страницы
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
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
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/profile",
          name: "profile",
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
          component: () => import("../views/MovieView.vue"),
          children: [
            {
              name: "review",
              path: "",
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
      ],
    },
    {
      path: "/:catchAll(.*)",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
