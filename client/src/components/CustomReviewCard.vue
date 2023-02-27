<template>
  <div class="review" :class="review.type.toLowerCase()">
    <div class="header">
      <div>{{ username }}</div>
      <div>{{ date }}</div>
    </div>
    <div class="content">
      <v-expansion-panels>
        <v-expansion-panel
          :title="review.title || 'Коммент'"
          :text="review.text"
        >
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="footer">
      <v-btn class="ma-2" variant="text" color="green-darken-1"
        ><v-icon start icon="mdi-thumb-up"></v-icon>Полезно
        {{ review.useful }}</v-btn
      >
      <v-btn class="ma-2" variant="text" color="red"
        ><v-icon start icon="mdi-thumb-down"></v-icon>Нет
        {{ review.useless }}</v-btn
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CritiqueModel } from "@/types/movies.types";
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";

const props = defineProps<{
  review: CritiqueModel;
}>();
const authStore = useAuthStore();

const date = computed(() => {
  const date_ = new Date(props.review.at);
  const reviewDate = date_.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const hours =
    date_.getHours() < 10 ? `0${date_.getHours()}` : date_.getHours();
  const minutes =
    date_.getMinutes() < 10 ? `0${date_.getMinutes()}` : date_.getMinutes();
  const time = `${hours}:${minutes}`;

  return `${reviewDate} в ${time}`;
});

const username = ref("");
authStore.getUserById(props.review.userId).then((user) => {
  username.value = user?.name || "Аноним";
});
</script>
<style scoped>
.review {
  padding: 16px 24px;
  margin-bottom: 10px;
}

.positive {
  background-color: rgba(59, 179, 59, 0.1);
}

.negative {
  background-color: rgba(255, 0, 0, 0.08);
}

.neutral {
  background-color: rgba(0, 0, 0, 0.05);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(var(--v-theme-on-surface-variant));
  padding-bottom: 20px;
}
</style>
