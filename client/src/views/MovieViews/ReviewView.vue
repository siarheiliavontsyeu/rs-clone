<template>
    <v-container class="container">
        <div class="description">
            <p>{{ movieStore.movie.description }}</p>
        </div>
        <div class="ratings">
            <h6 class="rating-title">Рейтинг фильма</h6>
            <div class="ratings-container">
                <div class="stars">
                    <v-rating v-model="rate" density="compact" size="large" active-color="deep-orange"
                        color="grey-lighten-2" hover half-increments length="10"></v-rating>
                        <div>Ваша оценка {{ rate }}</div>
                </div>
                <div class="review-counts">
                    <div class="rating-number" :class="ratingColor(movieStore.movie.ratingKinopoisk)">{{
                        movieStore.movie.ratingKinopoisk
                    }}</div>
                    <div class="rating-counts d-flex">
                        <p class="kinopoisk">{{ properRates(movieStore.movie.ratingKinopoiskVoteCount) }}</p>
                        <p class="text-medium-emphasis"><span class="font-weight-bold">IMDb: {{
                            movieStore.movie.ratingImdb
                        }}</span> {{
    properRates(movieStore.movie.ratingImdbVoteCount)
}}</p>
                    </div>
                </div>
            </div>
        </div>
    </v-container>
</template>
<script setup lang="ts">
import { properRates, ratingColor } from "@/helpers/composables";
import { useMovieStore } from "@/stores/movieStore";
import { ref } from "vue";
const movieStore = useMovieStore();
const rate = ref(movieStore.movie.ratingKinopoisk);
</script>
<style scoped>
.description {
    margin-bottom: 20px;
}

.ratings-container {
    display: grid;
    grid-template-columns: 500px 1fr;
}

.rating-title {
    margin-bottom: 12px;
    font-size: 22px;
    font-weight: 600;
    line-height: 28px;
}

.rating-number {
    font-size: 48px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 5px;
}

.kinopoisk {
    margin-right: 10px;
}
</style>
