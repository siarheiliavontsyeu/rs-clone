import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { UserModel } from "@/types/user.types";
import useBackend from "@/use/useBackend";
import type { AuthBodyModel, AuthResponseModel } from "@/types/auth.types";
import { HttpMethod } from "@/types/fetch.types";
import router from "@/router";

const baseUrl = "http://178.172.172.131:4000/";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserModel | null>(null);
  const token = ref<string | null>(null);
  const showError = ref(false);
  const showLoading = ref(false);

  const userInLocalStorage = localStorage.getItem("user");
  if (userInLocalStorage) {
    user.value = JSON.parse(userInLocalStorage);
  }

  const tokenInLocalStorage = localStorage.getItem("token");
  if (tokenInLocalStorage) {
    token.value = JSON.parse(tokenInLocalStorage);
  }

  watch(
    () => user,
    (state) => {
      localStorage.setItem("user", JSON.stringify(state.value));
    },
    { deep: true }
  );

  watch(
    () => token,
    (state) => {
      localStorage.setItem("token", JSON.stringify(state.value));
    },
    { deep: true }
  );

  const login = async (login: string, password: string) => {
    const { loading, response, error } = await useBackend<
      AuthResponseModel,
      AuthBodyModel
    >({
      url: baseUrl + "login",
      method: HttpMethod.POST,
      additionalUrl: "",
      body: { login, password },
    });
    if (!error.value) {
      showError.value = false;
      if (response?.value) {
        token.value = response.value.token;
      }
    } else {
      showError.value = true;
    }
    showLoading.value = loading.value;
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // router.push("/login");
  };

  return { user, token, login, logout, showError };
});
