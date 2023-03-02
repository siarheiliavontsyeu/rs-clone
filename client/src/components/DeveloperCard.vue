<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card class="ma-3" v-bind="props">
      <div class="d-flex">
        <v-avatar class="ma-3" size="125" rounded="5">
          <v-img :src="developer.avatar">
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="d-flex transition-fast-in-fast-out bg v-card--reveal"
                style="height: 100%"
              >
                <a :href="developer.github" class="github" target="_blank"
                  ><v-icon class="icon" size="x-large">mdi-github</v-icon></a
                >
              </div>
            </v-expand-transition>
          </v-img>
        </v-avatar>
        <div>
          <v-card-title>
            {{ developer.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ developer.title }}
          </v-card-subtitle>
          <v-card-text>
            {{ developer.desc }}
          </v-card-text>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>
<script setup lang="ts">
import type { DeveloperModel } from "@/types/team.types";
defineProps<{
  developer: DeveloperModel;
  idx: number;
}>();
</script>
<style scoped>
@media (max-width: 450px) {
  .d-flex {
    flex-wrap: wrap;
  }
}

.bg {
  background-color: #151d1d;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
}
.icon {
  color: #fff;
}
.github {
  text-decoration: none;
}
</style>
