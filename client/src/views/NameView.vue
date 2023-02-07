<template>
  <div>
    Инфо о человеке
    <p>Актер {{ personStore.person.nameRu }}</p>
  </div>
</template>
<script setup lang="ts">
import { usePersonStore } from "@/stores/personStore";
import { useRoute } from "vue-router";

const route = useRoute();
const personStore = usePersonStore();
const personId = route.params.nameId
personStore.getStaffPerson(+personId);
</script>
<style>

</style>
