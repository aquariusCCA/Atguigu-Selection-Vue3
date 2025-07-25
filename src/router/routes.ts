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
		path: '/404',
		component: () => import('@/views/404/index.vue'),
		name: '404',
		meta: {
			name: '404',
			hidden: true,
			icon: ''
		}
	},
];

// 异步路由
export const asyncRoutes = [
  {
    path: "/product",
    component: () => import("@/layout/index.vue"),
    name: "Product",
    redirect: "/product/attr",
    meta: {
      name: "商品管理",
      hidden: false,
      icon: "Star",
    },
    children: [
      {
        path: "/product/attr",
        component: () => import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          name: "属性管理",
          hidden: false,
          icon: "Coin",
        },
      },
      {
        path: "/product/sku",
        component: () => import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          name: "SKU管理",
          hidden: false,
          icon: "Goods",
        },
      },
      {
        path: "/product/spu",
        component: () => import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          name: "SPU管理",
          hidden: false,
          icon: "Handbag",
        },
      },
      {
        path: "/product/trademark",
        component: () => import("@/views/product/trademark/index.vue"),
        name: "Trademark",
        meta: {
          name: "品牌管理",
          hidden: false,
          icon: "Apple",
        },
      },
    ],
  },
];

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
