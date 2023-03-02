<template>
  <v-toolbar>
    <v-menu bottom offset-y open-on-hover>
      <template #activator="{ props }">
        <v-btn text v-bind="props">
          <v-icon dark> mdi-account-circle </v-icon>
          <span class="ma-1" v-if="user">{{ user?.name }}</span>
          <span class="ma-1" v-else>Гость</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <template v-if="user">
          <v-list-item @click="$router.push({ name: 'profile' })">
            <v-list-item-title>
              <v-icon dark> mdi-card-account-details </v-icon>
              <span class="ma-1">Профиль</span></v-list-item-title
            >
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>
              <v-icon dark> mdi-logout </v-icon>
              <span class="ma-1">Выйти</span></v-list-item-title
            >
          </v-list-item>
        </template>
        <template v-else>
          <v-list-item @click="$router.push({ name: 'login' })">
            <v-list-item-title>
              <v-icon dark> mdi-login </v-icon>
              <span class="ma-1">Войти</span></v-list-item-title
            >
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { logout } = authStore;
const { user } = storeToRefs(authStore);
</script>
