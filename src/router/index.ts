import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "testView",
      path: "/test",
      component: () => import("@/views/TestView.vue"), // 懒加载TestView组件
      meta: { showInMenu: false },
    },
  ],
});

export default router;
