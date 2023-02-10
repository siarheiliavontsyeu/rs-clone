<template>
  <v-card>
    <v-card-title>
      <h3>Редактирование профиля</h3>
    </v-card-title>
    <v-card-text>
      <v-form ref="formRef" v-model="formValid">
        <v-text-field
          label="Имя"
          v-model="name"
          :rules="nameRules"
          :maxlength="24"
          :counter="24"
        />
        <v-text-field
          label="Пароль"
          type="password"
          v-model="password"
          :rules="passwordRules"
          :maxlength="12"
          :counter="12"
          hint="Латиница, должна быть хотя бы одна заглавная буква, хотя бы одна цифра, от 6 до 12 символов"
        />
        <v-text-field
          label="Повтор пароля"
          type="password"
          v-model="passwordRepeat"
          :rules="passwordRepeatRules"
          :maxlength="12"
          :counter="12"
          @keyup.enter="save"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" text @click="$emit('close-dialog')">Отмена</v-btn>
      <v-btn color="primary" text @click="update">Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { useProfileEditForm } from "../use/useProfileEditForm";
const emit = defineEmits<{
  (e: "close-dialog"): void;
}>();

const update = async () => {
  await save();
  emit("close-dialog");
};

const {
  formRef,
  formValid,
  name,
  password,
  passwordRepeat,
  nameRules,
  passwordRules,
  passwordRepeatRules,
  save,
} = useProfileEditForm();
</script>
