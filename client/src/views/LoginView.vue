<template>
  <div class="login-bg login-bg-img"></div>
  <v-container fluid class="container pa-0 ma-0">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-tabs v-model="tab">
          <v-tab> Login </v-tab>
          <v-tab> Sign Up </v-tab>
        </v-tabs>

        <v-card v-show="tab === 0">
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Login" type="text" />
              <v-text-field label="Password" type="password" />
              <v-btn color="primary">Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>

        <v-card v-show="tab === 1">
          <v-card-title class="headline">Sign Up</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Name" />
              <v-text-field label="Login" type="login" />
              <v-text-field label="Password" type="password" />
              <v-btn color="primary">Sign Up</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";

const tab = ref(0);
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
