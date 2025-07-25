import router from "@/router";
// @ts-ignore
import NProgress from "nprogress";
import { useUserStore } from "@/stores/modules/user";
import { getToken } from "@/utils/auth";

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = useUserStore();
  // 1.存在token
  if (getToken()) {
    if (to.path === "/login") {
      next("/");
    } else {
      // 用户信息存在, 放行
      if (userStore.loginUser.name) {
        next();
      } else {
        // 用户信息不存在, 获取一次用户信息, 再放行
        try {
          await userStore.userInfo();
          //刷新的时候, 有可能获取到用户信息后, 异步路由还没有加载完毕, 出现页面空白的效果, 加上 {...to}
          next({ ...to, replace: true });
        } catch (e) {
          // 当获取不到用户信息, 清空token及用户信息, 回到登录页
          userStore.userLogout();
          next({ path: "/login" });
        }
      }
    }
  } else {
    // 2.不存在token
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done();
});
