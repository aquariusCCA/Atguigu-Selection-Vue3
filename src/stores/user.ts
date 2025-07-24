import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { reqLogin } from "@/api/user/index.ts";
import type { LoginFormData } from "@/api/user/type.ts";

export const useUserStore = defineStore("user", () => {
  const token = ref(localStorage.getItem("TOKEN") || "");

  async function userLogin(data: LoginFormData) {
    const result = await reqLogin(data);
    if (result.code === 200) {
      token.value = result.data;
      localStorage.setItem("TOKEN", result.data);
      return "ok";
    } else {
      return Promise.reject(result.data);
    }
  }

  return {
    token,
    userLogin,
  };
});
