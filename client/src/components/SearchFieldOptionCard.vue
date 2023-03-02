<template>
  <v-list-item @click="onPick">
    <router-link
      :to="
        item.isMovie
          ? { name: 'movie', params: { movieId: item.id } }
          : { name: 'name', params: { nameId: item.id } }
      "
      class="d-flex link"
    >
      <div>
        <img :src="item.img" class="card-img" alt="" />
      </div>
      <div>
        <v-list-item-title>{{ item.nameRu }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.nameEn }}</v-list-item-subtitle>
      </div>
    </router-link>
  </v-list-item>
</template>
<script setup lang="ts">
import { useSearchStore } from "@/stores/searchStore";
import type { itemType } from "./SearchField.vue";
const searchStore = useSearchStore();
defineProps<{ item: itemType }>();
const emit = defineEmits(["clear"]);

const onPick = () => {
  searchStore.setIsLoading();
  emit("clear");
};
</script>
<style scoped>
.card-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}
</style>
