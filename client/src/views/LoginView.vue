<template>
  <div class="login-bg login-bg-img"></div>
  <v-container fluid class="container pa-0 ma-0">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-alert v-if="showError" type="error" icon="mdi-alert">
          Ошибка аутентификации. Пожалуйста, попробуйте еще раз.
        </v-alert>

        <v-card>
          <v-tabs v-model="tab">
            <v-tab> Вход </v-tab>
            <v-tab> Регистрация </v-tab>
          </v-tabs>
        </v-card>

        <v-card v-show="tab === 0">
          <v-card-title class="headline">Вход</v-card-title>
          <v-card-text>
            <v-form ref="regLoginRef" v-model="loginValid">
              <v-text-field
                label="Логин"
                type="text"
                v-model="loginLogin"
                :rules="loginLoginRules"
              />
              <v-text-field
                label="Пароль"
                type="password"
                v-model="loginPassword"
                :rules="loginPasswordRules"
              />
              <v-btn color="primary" @click="doLogin" class="ma-1">
                <v-icon dark> mdi-login </v-icon
                ><span class="ma-1">Войти</span></v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>

        <v-card v-show="tab === 1">
          <v-card-title class="headline">Регистрация</v-card-title>
          <v-card-text>
            <v-form ref="regFormRef" v-model="regValid">
              <v-text-field
                label="Имя"
                v-model="name"
                :rules="nameRules"
                :maxlength="24"
                :counter="24"
              />
              <v-text-field
                label="Логин"
                type="login"
                v-model="login"
                :rules="loginRules"
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
              <v-btn color="primary" @click="register" class="ma-1">
                <v-icon dark> mdi-account-key </v-icon>
                <span class="ma-1">Зарегистрироваться</span></v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRegForm } from "@/use/useRegForm";
import { useLoginForm } from "@/use/useLoginForm";

const tab = ref(0);

const {
  regFormRef,
  regValid,
  name,
  login,
  password,
  nameRules,
  loginRules,
  passwordRules,
  register,
} = useRegForm();
const {
  regLoginRef,
  loginValid,
  loginFiled: loginLogin,
  password: loginPassword,
  loginRules: loginLoginRules,
  passwordRules: loginPasswordRules,
  doLogin,
  showError,
} = useLoginForm();
</script>
<style scoped>
.login-bg-img {
  background-image: url(https://yastatic.net/s3/passport-auth-customs/customs/_/4vui26y6.jpg);
}
.login-bg {
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
}

.container {
  height: 100vh;
  display: flex;
}
.ma-0 {
  margin: 0;
}

.pa-0 {
  padding: 0;
}
</style>
