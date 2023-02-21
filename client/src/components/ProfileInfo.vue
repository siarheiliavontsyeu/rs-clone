<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <h2><v-icon dark> mdi-badge-account </v-icon>Профиль</h2>
      </v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
  <v-container>
    <v-row align="center">
      <v-col cols="12" sm="2" md="2">
        <v-avatar size="120">
          <v-icon size="120" dark :title="user?.name">
            mdi-account-circle
          </v-icon>
        </v-avatar>
      </v-col>
      <v-col cols="12" sm="6" md="8">
        <h3>Имя: {{ user.name }}</h3>
        <p>Логин: {{ user.login }}</p>
        <p>Подписка: {{ user.subscription }}</p>
        <v-btn class="mt-5 submit" @click="$emit('open-dialog')"
          ><v-icon>mdi-pencil</v-icon> Редактирование профиля</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import type { UserModel } from "../types/user.types";
const props = defineProps<{
  user: UserModel;
}>();

const emit = defineEmits<{
  (e: "open-dialog"): void;
}>();
</script>
<style scoped>
.submit {
  display: block;
  box-sizing: border-box;
  height: 52px;
  margin: auto;
  padding: 15px 26px 15px 22px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  color: #fff;
  border: 0 solid transparent;
  border-radius: 100px;
  outline: none;
  background: linear-gradient(135deg, #f50 69.91%, #d6bb00);
  transition: transform 0.2s ease-out;
  margin-bottom: 16px;
}
</style>
