import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { UserModel, UserRegistrationModel } from "@/types/user.types";
import useBackend from "@/use/useBackend";
import type { AuthBodyModel, AuthResponseModel } from "@/types/auth.types";
import { HttpMethod } from "@/types/fetch.types";
import router from "@/router";
import { BASE_URL } from "@/constants/backend";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<UserModel | null>(null);
  const token = ref<string | null>(null);
  const showError = ref(false);
  const showLoading = ref(false);
  const showSuccess = ref(false);

  const userInLocalStorage = localStorage.getItem("user");
  if (userInLocalStorage) {
    user.value = JSON.parse(userInLocalStorage);
  }

  const tokenInLocalStorage = localStorage.getItem("token");
  if (tokenInLocalStorage) {
    token.value = JSON.parse(tokenInLocalStorage);
  }

  watch(
    () => showError,
    () => {
      setTimeout(() => {
        showError.value = false;
      }, 3000);
    },
    { deep: true }
  );

  watch(
    () => showSuccess,
    () => {
      setTimeout(() => {
        showSuccess.value = false;
      }, 3000);
    },
    { deep: true }
  );

  watch(
    () => user,
    (currentUser) => {
      if (currentUser.value) {
        localStorage.setItem("user", JSON.stringify(currentUser.value));
      }
    },
    { deep: true }
  );

  watch(
    () => token,
    (currentToken) => {
      if (currentToken.value) {
        localStorage.setItem("token", JSON.stringify(currentToken.value));
      }
    },
    { deep: true }
  );

  const login = async (login: string, password: string) => {
    const { loading, response, error } = await useBackend<
      AuthResponseModel,
      AuthBodyModel
    >({
      url: BASE_URL + "login",
      method: HttpMethod.POST,
      additionalUrl: "",
      body: { login, password },
    });
    if (!error.value) {
      showError.value = false;
      if (response?.value) {
        token.value = response.value.token;
        user.value = response.value.user;
      }
    } else {
      showError.value = true;
    }
    showLoading.value = loading.value;
  };

  const registration = async (
    name: string,
    login: string,
    password: string
  ) => {
    const { loading, response, error } = await useBackend<
      UserModel,
      UserRegistrationModel
    >({
      url: BASE_URL + "registration",
      method: HttpMethod.POST,
      additionalUrl: "",
      body: { login, name, password },
    });
    if (!error.value) {
      showError.value = false;
      if (response?.value) {
        showLoading.value = loading.value;
        showSuccess.value = true;
        return true;
      }
    } else {
      showError.value = true;
      showLoading.value = loading.value;
      return false;
    }
  };

  const update = async (name: string, login: string, password: string) => {
    if (token.value && user.value) {
      const { loading, response, error } = await useBackend<
        UserModel,
        UserRegistrationModel
      >({
        url: BASE_URL + "users",
        method: HttpMethod.PUT,
        additionalUrl: "/" + user.value.id,
        body: { login, name, password },
        token: token.value,
      });
      if (!error.value) {
        showError.value = false;
        if (response?.value) {
          showLoading.value = loading.value;
          showSuccess.value = true;
          user.value = response.value;
          return true;
        }
      } else {
        showError.value = true;
        showLoading.value = loading.value;
        return false;
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    token.value = null;
    user.value = null;
    router.push({ name: "login" });
  };

  return {
    user,
    token,
    showError,
    showSuccess,
    login,
    logout,
    registration,
    update,
  };
});
