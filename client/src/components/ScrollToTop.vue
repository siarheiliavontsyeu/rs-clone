<template>
  <div ref="topElement"></div>
  <v-btn
    class="scroll-top-btn"
    @click="scrollToTop"
    fab
    color="primary"
    v-show="showScrollTopBtn"
  >
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

const topElement = ref<HTMLElement | null>(null);

const scrollTop = ref(0);
const showScrollTopBtn = computed(() => scrollTop.value > 200);

const scrollToTop = () => {
  if (topElement.value) {
    topElement.value.scrollIntoView({ behavior: "smooth" });
  }
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
}
</style>
