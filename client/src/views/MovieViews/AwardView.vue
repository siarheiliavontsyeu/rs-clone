<template>
  <v-container v-if="movieStore.awards.length">
    <div>
      <div
        v-for="(award, index) in movieStore.awards"
        :key="index"
        class="award"
      >
        <div>
          <h6 class="text-h5">{{ award.name }}</h6>
          <p class="text-medium-emphasis">{{ award.year }}</p>
        </div>
        <div>
          <p class="text-h6">{{ award.nominationName }}</p>
          <p class="status" :class="{ active: award.win }">
            {{ award.win ? "Победитель" : "Номинирован" }}
          </p>
        </div>
        <div>
          <ul class="winners-list">
            <li v-for="winner in award.persons" :key="winner.kinopoiskId">
              <router-link
                class="link"
                :to="{ name: 'name', params: { nameId: winner.kinopoiskId } }"
                >{{ winner.nameRu || winner.nameEn }}</router-link
              >
            </li>
          </ul>
        </div>
        <div v-show="award.imageUrl">
          <img :src="award.imageUrl" :alt="award.name" class="img" />
        </div>
      </div>
    </div>
  </v-container>
  <v-container v-else>
    <h6 class="text-h6">Жулик своровал, но возможно Даша скоро найдет</h6>
  </v-container>
</template>
<script setup lang="ts">
import { useMovieStore } from "@/stores/movieStore";

const movieStore = useMovieStore();
</script>
<style scoped>
.award {
  display: grid;
  grid-template-columns: 300px 300px 2fr 1fr;
  border-bottom: 2px solid rgb(var(--v-theme-on-surface-variant));
  gap: 20px;
  margin-bottom: 15px;
}
.award:last-of-type {
  border: none;
}

.winners-list {
  list-style-type: none;
}

.winner {
  display: flex;
}

.img {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.active {
  color: #f50;
}

.link {
  text-decoration: none;
  color: var(--color-text);
}

.link:hover {
  color: #f50;
  transition: color 0.2s;
}
</style>
