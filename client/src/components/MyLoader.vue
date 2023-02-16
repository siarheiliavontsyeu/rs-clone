<template>
  <div class="loader">
    <v-progress-circular indeterminate color="#f50" :size="128"></v-progress-circular>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
