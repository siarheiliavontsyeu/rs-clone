import { ref, computed } from "vue";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export function useLoginForm() {
  const authStore = useAuthStore();
  const { showError, token } = storeToRefs(authStore);
  const { login } = authStore;
  const regLoginRef = ref<HTMLFormElement | null>(null);
  const loginValid = ref(false);
  const loginFiled = ref("");
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
        await login(loginFiled.value, password.value);
        if (token.value) {
          router.push({ name: "home" });
        }
      }
    }
  };
  return {
    regLoginRef,
    loginValid,
    loginFiled,
    password,
    loginRules,
    passwordRules,
    doLogin,
    showError,
  };
}
