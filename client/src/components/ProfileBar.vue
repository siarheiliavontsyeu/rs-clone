<template>
  <v-toolbar>
    <v-menu bottom offset-y open-on-hover v-if="user">
      <template #activator="{ props }">
        <v-btn text v-bind="props">
          <v-icon dark> mdi-account-circle </v-icon>
          <span class="ma-1">{{ user?.name }}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>
            <v-icon dark> mdi-logout </v-icon>
            <span class="ma-1">Выйти</span></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu bottom offset-y open-on-hover v-else>
      <template #activator="{ props }">
        <v-btn text v-bind="props">
          <v-icon dark> mdi-account-circle </v-icon>
          <span class="ma-1">Гость</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="toLoginPage">
          <v-list-item-title>
            <v-icon dark> mdi-login </v-icon>
            <span class="ma-1">Войти</span></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { logout, toLoginPage } = authStore;
const { user } = storeToRefs(authStore);
</script>
