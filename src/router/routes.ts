// 常量路由
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta: {
      name: "登录",
      hidden: true,
      icon: "",
    },
  },
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    name: "Layout",
    redirect: "/home",
    meta: {
      name: "",
      hidden: false,
      icon: "",
    },
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        name: "Home",
        meta: {
          name: "首页",
          hidden: false,
          icon: "House",
        },
      },
    ],
  },
  {
    path: "/test",
    component: () => import("@/views/TestView.vue"),
    name: "Test",
    meta: {
      name: "测试",
      hidden: true,
      icon: "",
    },
  },
];

// 异步路由
export const asyncRoutes = [];

// 任意路由
export const anyRoute = {
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  name: "Any",
  meta: {
    name: "任意",
    hidden: true,
    icon: "",
  },
};
