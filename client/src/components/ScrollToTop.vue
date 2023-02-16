<template>
  <v-btn
    class="scroll-top-btn"
    @click="scrollToTop"
    fab
    v-show="showScrollTopBtn"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";


const scrollTop = ref(0);
const showScrollTopBtn = computed(() => scrollTop.value > 200);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleScroll = () => {
  scrollTop.value = window.pageYOffset || document.documentElement.scrollTop;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.scroll-top-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  color: #f50;
}
</style>
