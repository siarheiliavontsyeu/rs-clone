<template>
  <MyLoaderVue v-if="searchStore.isLoading" />
  <div v-else>
    Инфо о человеке
    <p>Актер {{ personStore.person.nameRu }}</p>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { usePersonStore } from "@/stores/personStore";
import { useSearchStore } from "@/stores/searchStore";
import MyLoaderVue from "@/components/MyLoader.vue";

const route = useRoute();
const searchStore = useSearchStore();
const personStore = usePersonStore();
const personId = route.params.nameId;
watch(() => route.params.nameId, (newValue, oldValue) => {
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
