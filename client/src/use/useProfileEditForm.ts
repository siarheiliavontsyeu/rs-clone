import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";

export function useProfileEditForm() {
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  const { update } = authStore;
  const formRef = ref<HTMLFormElement | null>(null);
  const formValid = ref(false);
  const name = ref(user.value?.name || "");
  const password = ref("");
  const passwordRepeat = ref("");
  const nameRules = computed(() => [
    (v: string) => !!v || "Имя обязательно!",
    (v: string) => v.length >= 3 || "Имя должно быть не менее 3 символов!",
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

  const save = async () => {
    if (formRef.value) {
      const { valid }: { valid: boolean } = await formRef.value.validate();
      if (valid && user.value) {
        await update(name.value, user.value.login, password.value);
      }
    }
  };
  return {
    formRef,
    formValid,
    name,
    password,
    passwordRepeat,
    nameRules,
    passwordRules,
    passwordRepeatRules,
    save,
  };
}
