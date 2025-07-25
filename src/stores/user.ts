import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user/index.ts";
import type { LoginFormData } from "@/api/user/type.ts";
import { constantRoutes, asyncRoutes, anyRoute } from "@/router/routes";
import { cloneDeep } from "lodash";
import router from "@/router";

const initLoginUser = {
  name: "",
  avatar: "",
  roles: [],
  routes: [],
  buttons: [],
};

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref(localStorage.getItem("TOKEN") || "");
    const loginUser = ref({ ...initLoginUser });
    const routes = ref([...constantRoutes]);

    async function userLogin(data: LoginFormData) {
      const result = await reqLogin(data);
      console.log("userLogin", result);
      if (result.code === 200) {
        token.value = result.data.token;
        localStorage.setItem("TOKEN", result.data.token);
        return "ok";
      } else {
        return Promise.reject(result.data);
      }
    }

    async function userInfo() {
      const result = await reqUserInfo();
      if (result.code === 200) {
        // @ts-ignore
        this.loginUser = result.data;
        // 1.过滤异步路由, 作为用户菜单展示
        let filterRoutes = filterAsyncRoutes(
          cloneDeep(asyncRoutes),
          result.data.routes
        );
        routes.value = [...constantRoutes, ...filterRoutes];
        console.log("filterRoutes", routes.value);
        // 2.将过滤后的异步路由, 追加到路由器中
        filterRoutes.forEach((route) => {
          router.addRoute(route);
        });
        // 3.添加任意路由
        router.addRoute(anyRoute);
        return "ok";
      } else {
        return Promise.reject(result.message);
      }
    }

    function filterAsyncRoutes(asyncRoutes: any[], userRoutes: string[]) {
      return asyncRoutes.filter((route) => {
        if (userRoutes.includes(route.name)) {
          if (route.children && route.children.length > 0) {
            route.children = filterAsyncRoutes(route.children, userRoutes);
          }
          return true;
        }
      });
    }

    async function userLogout() {
      // 服务器没有logout接口，跳过接口做下一步操作
      const result = await reqLogout();
      if (result.code === 200) {
        token.value = "";
        loginUser.value = { ...initLoginUser };
        localStorage.removeItem("TOKEN");
        return "ok";
      } else {
        return Promise.reject(result.message);
      }
    }

    return {
      token,
      loginUser,
      routes,
      userLogin,
      userInfo,
      userLogout,
    };
  },
  {
    // 啟用持久化
    persist: {
      storage: sessionStorage, // 使用 sessionStorage 來持久化
    },
  }
);
