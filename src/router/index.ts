import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { nextTick } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/peoples",
      name: "Peoples",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/PeoplesView.vue"),
      meta: {
        title: "Peoples",
      },
    },
    {
      path: "/peoples/:id",
      name: "PeopleDetail",
      props: (route) => ({ id: Number(route.params.id) }),
      component: () => import("@/views/PeopleDetailView.vue"),
    },
    {
      path: "/favorites",
      name: "Favorites",
      component: () => import("@/views/FavoritesView.vue"),
      meta: {
        title: "Favorites",
      },
    },
    {
      path: "/:notFound(.*)",
      name: "NotFound",
      meta: {
        title: "404",
      },
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

const DEFAULT_TITLE: string = "Default title";
const DEFAULT_DESCRIPTION: string = "Default description";
router.afterEach((to) => {
  nextTick(() => {
    document.title = String(to.meta.title) || DEFAULT_TITLE;
    const meta =
      document.querySelector<HTMLElement>('meta[name="description"]') || false;
    if (meta) {
      meta.setAttribute(
        "content",
        String(to.meta.description) || DEFAULT_DESCRIPTION
      );
    }
  });
});

export default router;
