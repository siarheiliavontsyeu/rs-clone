<template>
    <v-container class="container">
        <v-card class="header">
            <div class="header-title">
                <h4 class="text-h5">Расширенный поиск</h4>
            </div>
            <div class="header-subtitle">
                <h4 class="text-subtitle-2 text-medium-emphasis">
                    Поиск фильмов, персоналий, пользователей cайта, киностудий и т.д.
                </h4>
            </div>
        </v-card>
        <v-card class="options">
            <h5 class="mb-5">Фильтры</h5>
            <div>
                <v-autocomplete label="Страна" :hide-no-data="true" variant="solo" clearable aria-autocomplete="false"
                    v-model="chosenCountry" :items="moviesStore.sortedCountries" item-title="country" item-value="id">
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item?.raw?.country"></v-list-item> </template></v-autocomplete>
            </div>
            <div>
                <v-autocomplete label="Жанр" :hide-no-data="true" variant="solo" clearable v-model="chosenGenre"
                    :items="moviesStore.sortedGenres" item-title="genre" item-value="id">
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item?.raw?.genre"></v-list-item></template></v-autocomplete>
            </div>
            <div>
                <v-select label="Категория" :hide-no-data="true" variant="solo" v-model="chosenCategory" :items="categories"
                    item-title="title" item-value="value">
                    <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props" :title="item?.raw?.title"></v-list-item></template></v-select>
            </div>
            <div class="mb-10">
                <h6 class="mb-2">Год</h6>
                <DualSlider ref="yearSlider" :min-period="1886" :max-period="new Date().getFullYear() + 5"
                    @slider-change="onYearChange">
                </DualSlider>
            </div>
            <div class="mb-10">
                <h6 class="mb-2">Рейтинг</h6>
                <DualSlider ref="ratingSlider" :min-period="0" :max-period="10" @slider-change="onRatingChange">
                </DualSlider>
            </div>
            <div>
                <h6 class="mb-2">Сортировка</h6>
                <v-radio-group inline v-model="sortBy">
                    <v-radio label="По рейтингу" density="compact" color="#f50" value="RATING"></v-radio>
                    <v-radio label="По годам" density="compact" color="#f50" value="YEAR"></v-radio>
                </v-radio-group>
            </div>
            <div class="buttons">
                <v-btn width="100%" color="info" append-icon="mdi-magnify" class="mb-2">Найти</v-btn>
                <v-btn width="100%" color="error" append-icon="mdi-backspace" @click="onFilterChange">Очистить</v-btn>
            </div>
        </v-card>
        <v-card class="movies"> movies </v-card>
    </v-container>
</template>
<script setup lang="ts">
import DualSlider from "@/components/DualSlider.vue";
import { useMoviesStore } from "@/stores/moviesStore";
import { MovieTypeEnum } from "@/types/movies.types";
import { ref } from "vue";

const moviesStore = useMoviesStore();
const chosenCountry = ref();
const chosenGenre = ref();
const categories = [
    { title: 'Все', value: 'ALL' },
    { title: 'Полнометражный', value: MovieTypeEnum.film },
    { title: 'Сериалы', value: MovieTypeEnum.tvSeries },
    { title: 'Шоу', value: MovieTypeEnum.tvShow },
    { title: 'Короткометражный', value: MovieTypeEnum.miniSeries },
];
const chosenCategory = ref(categories[0]);
const chosenMinYear = ref(1886);
const chosenMaxYear = ref(new Date().getFullYear() + 5);
const chosenMinRating = ref(0);
const chosenMaxRating = ref(10);
const sortBy = ref('RATING');

const yearSlider = ref<InstanceType<typeof DualSlider>>();
const ratingSlider = ref<InstanceType<typeof DualSlider>>();

const onYearChange = (minYear: number, maxYear: number) => {
    chosenMinYear.value = minYear;
    chosenMaxYear.value = maxYear;
}
const onRatingChange = (minRating: number, maxRating: number) => {
    chosenMinRating.value = minRating;
    chosenMaxRating.value = maxRating;
}

const onFilterChange = () => {
    chosenCountry.value = null;
    chosenGenre.value = null;
    chosenCategory.value = categories[0];
    chosenMinYear.value = 1886;
    chosenMaxYear.value = new Date().getFullYear() + 5;
    chosenMinRating.value = 0;
    chosenMaxRating.value = 10;
    sortBy.value = 'RATING';
    yearSlider.value?.onSliderClear();
    ratingSlider.value?.onSliderClear();
}

</script>
<style scoped>
.container {
    display: grid;
    grid-template-areas:
        "h h"
        "o m";
    background-color: rgb(var(--v-theme-background));
    grid-template-columns: 1fr 3fr;
    gap: 20px;
    padding: 40px;
}

.header {
    grid-area: h;
    padding: 20px;
}

.options {
    grid-area: o;
    padding: 20px;
    position: sticky;
}

.movies {
    grid-area: m;
    padding: 20px;
}
</style>
