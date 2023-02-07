import { ref, computed } from "vue";

export function useRegForm() {
  const regFormRef = ref<HTMLFormElement | null>(null);
  const regValid = ref(false);
  const name = ref("");
  const login = ref("");
  const password = ref("");
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

  const register = () => {
    if (regFormRef.value) {
      regFormRef.value.validate().then(({ valid }: { valid: boolean }) => {
        if (valid) {
          console.log("ok");
        } else {
          console.log("not ok");
        }
      });
    }
  };
  return {
    regFormRef,
    regValid,
    name,
    login,
    password,
    nameRules,
    loginRules,
    passwordRules,
    register,
  };
}
