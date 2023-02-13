<template>
  <FullPageBg></FullPageBg>
  <v-container fluid>
    <v-card class="ma-2 pa-2">
      <h2><v-icon dark> mdi-account-group-outline </v-icon> Наша команда</h2>
    </v-card>
    <DeveloperCard
      v-for="(developer, index) in developers"
      :key="developer.github"
      :developer="developer"
      :idx="index"
    >
    </DeveloperCard>
  </v-container>
</template>
<script setup lang="ts">
import DeveloperCard from "@/components/DeveloperCard.vue";
import FullPageBg from "@/components/FullPageBg.vue";
import data from "@/constants/team.json";
const { developers } = data;
</script>
<style></style>
