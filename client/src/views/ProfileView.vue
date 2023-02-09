<template>
  <ProfileInfo
    v-if="user"
    :user="user"
    @open-dialog="dialog = true"
  ></ProfileInfo>
  <v-divider></v-divider>
  <ProfileWatchHistory v-if="movies" :movies="movies"></ProfileWatchHistory>
  <v-divider></v-divider>
  <v-dialog v-model="dialog" max-width="500">
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
        <v-btn color="primary" text @click="dialog = false">Отмена</v-btn>
        <v-btn color="primary" text @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import type { MovieModel } from "@/types/movies.types";
import ProfileInfo from "@/components/ProfileInfo.vue";
import ProfileWatchHistory from "@/components/ProfileWatchHistory.vue";
import { useProfileEditForm } from "../use/useProfileEditForm";
import { useUserDataStore } from "@/stores/userDataStore";

const dialog = ref(false);
const authStore = useAuthStore();
const { user, token } = storeToRefs(authStore);

const userDataStore = useUserDataStore();
const { getWatchedHistory } = userDataStore;
const { movies } = storeToRefs(userDataStore);

if (user.value) {
  getWatchedHistory(user.value.id, token.value);
}

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
<style lang=""></style>
