import { ref } from "vue";
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user/index.ts";
import type { LoginFormData } from "@/api/user/type.ts";
import { constantRoutes, asyncRoutes, anyRoute } from "@/router/routes";
import { cloneDeep } from "lodash";
import router from "@/router";
import { setToken, removeToken } from "@/utils/auth";

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
    const loginUser = ref({ ...initLoginUser });
    const routes = ref([...constantRoutes]);

    async function userLogin(data: LoginFormData) {
      const result = await reqLogin(data);
      if (result.code === 200) {
        setToken(result.data.token);
        return "ok";
      } else {
        return Promise.reject(result.data);
      }
    }

    async function userInfo() {
      const result = await reqUserInfo();
      if (result.code === 200) {
        // @ts-ignore
        loginUser.value = result.data;
        // 1.过滤异步路由, 作为用户菜单展示
        let filterRoutes = filterAsyncRoutes(
          cloneDeep(asyncRoutes),
          result.data.routes
        );
        routes.value = [...constantRoutes, ...filterRoutes];
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
        loginUser.value = { ...initLoginUser };
        removeToken();
        return "ok";
      } else {
        return Promise.reject(result.message);
      }
    }

    return {
      loginUser,
      routes,
      userLogin,
      userInfo,
      userLogout,
    };
  }
);
