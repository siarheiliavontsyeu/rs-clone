import { ref, computed } from "vue";
import router from "@/router";

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

  const doLogin = () => {
    if (regLoginRef.value) {
      regLoginRef.value.validate().then(({ valid }: { valid: boolean }) => {
        if (valid) {
          console.log("ok");
          router.push({ name: "home" });
        } else {
          console.log("not ok");
        }
      });
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
