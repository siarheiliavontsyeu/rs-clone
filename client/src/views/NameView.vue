<template>
  <div v-if="searchStore.isLoading" class="loader">
    <v-progress-circular indeterminate :size="128"></v-progress-circular>
  </div>
  <div v-else>
    Инфо о человеке
    <p>Актер {{ personStore.person.nameRu }}</p>
  </div>
</template>
<script setup lang="ts">
import { usePersonStore } from "@/stores/personStore";
import { watch } from "vue";
import { useSearchStore } from "@/stores/searchStore";
import { useRoute } from "vue-router";

const route = useRoute();
const searchStore = useSearchStore();
const personStore = usePersonStore();
const personId = route.params.nameId;
watch(() => route.params.personId, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    personStore.getStaffPerson(+newValue);
  }
},
  { deep: true })
personStore.getStaffPerson(+personId);
</script>
<style scoped>
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
