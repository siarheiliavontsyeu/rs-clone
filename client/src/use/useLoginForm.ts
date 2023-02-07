import { ref, computed } from "vue";
import router from "@/router";
import useBackend from "./useBackend";
import type { AuthBodyModel, AuthResponseModel } from "@/types/auth.types";
import { HttpMethod } from "@/types/fetch.types";

const baseUrl = "http://178.172.172.131:4000/";

export function useLoginForm() {
  const regLoginRef = ref<HTMLFormElement | null>(null);
  const loginValid = ref(false);
  const login = ref("");
  const password = ref("");
  const loginRules = computed(() => [
    (v: string) => !!v || "Логин обязателен!",
  ]);
  const passwordRules = computed(() => [
    (v: string) => !!v || "Пароль обязателен!",
  ]);

  const doLogin = async () => {
    if (regLoginRef.value) {
      const { valid }: { valid: boolean } = await regLoginRef.value.validate();
      if (valid) {
        console.log("ok");
        // router.push({ name: "home" });
        const { loading, response, headers, error } = await useBackend<
          AuthResponseModel,
          AuthBodyModel
        >({
          url: baseUrl + "login",
          method: HttpMethod.POST,
          additionalUrl: "",
          body: { login: login.value, password: password.value },
        });
        console.log(loading, response, headers, error);
      } else {
        console.log("not ok");
      }
    }
  };
  return {
    regLoginRef,
    loginValid,
    login,
    password,
    loginRules,
    passwordRules,
    doLogin,
  };
}
