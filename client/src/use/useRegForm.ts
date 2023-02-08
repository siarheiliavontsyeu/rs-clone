import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

export function useRegForm() {
  const authStore = useAuthStore();
  const { registration } = authStore;
  const { showSuccess } = storeToRefs(authStore);
  const regFormRef = ref<HTMLFormElement | null>(null);
  const regValid = ref(false);
  const name = ref("");
  const login = ref("");
  const password = ref("");
  const passwordRepeat = ref("");
  const nameRules = computed(() => [
    (v: string) => !!v || "Имя обязательно!",
    (v: string) => v.length >= 3 || "Имя должно быть не менее 3 символов!",
  ]);
  const loginRules = computed(() => [
    (v: string) => !!v || "Логин обязателен!",
    (v: string) => v.length >= 3 || "Логин должен быть не менее 3 символов!",
  ]);
  const passwordRules = computed(() => [
    (v: string) => !!v || "Пароль обязателен!",
    (v: string) =>
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(v) ||
      "Латиница, должна быть хотя бы одна заглавная буква, хотя бы одна цифра, от 6 до 12 символов",
  ]);
  const passwordRepeatRules = computed(() => [
    (v: string) => !!v || "Повтор пароля обязателен!",
    (v: string) =>
      v === password.value || "Повтор пароля и пароль должны совпадать!",
    (v: string) =>
      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(v) ||
      "Латиница, должна быть хотя бы одна заглавная буква, хотя бы одна цифра, от 6 до 12 символов",
  ]);

  const register = async () => {
    if (regFormRef.value) {
      const { valid }: { valid: boolean } = await regFormRef.value.validate();
      if (valid) {
        const isReg = await registration(
          name.value,
          login.value,
          password.value
        );
        if (isReg) {
          router.push({ name: "login" });
        }
      }
    }
  };
  return {
    regFormRef,
    regValid,
    name,
    login,
    password,
    passwordRepeat,
    nameRules,
    loginRules,
    passwordRules,
    passwordRepeatRules,
    showSuccess,
    register,
  };
}
