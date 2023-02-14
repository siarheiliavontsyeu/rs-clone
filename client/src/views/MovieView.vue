<template>
  <MyLoaderVue v-if="searchStore.isLoading" />
  <v-container v-else class="container">
    <v-container class="movie-basic">
      <div class="movie-poster">
        <img :src="movieStore.movie.posterUrlPreview" :alt="movieStore.movie.nameEn" class="poster" />
      </div>
      <div class="movie-info">
        <div class="info-header">
          <h1 class="text-h3 font-weight-bold">
            {{ movieStore.movie.nameRu }}
          </h1>
          <h4 class="text-medium-emphasis">
            {{ movieStore.movie.nameOriginal }}
          </h4>
        </div>
        <div>
          <h6 class="text-h5 font-weight-bold movie-desc-title">О фильме</h6>
          <div class="table">
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">
                Год производства
              </p>
              <p>{{ movieStore.movie.year }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Страна</p>
              <p>{{ countries }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Жанр</p>
              <p>{{ genres }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Слоган</p>
              <p>{{ movieStore.movie.slogan || "—" }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Режиссер</p>
              <p class="large-text">
                <router-link :to="{ name: 'name', params: { nameId: director.staffId } }" class="link"
                  v-for="director in movieStore.movieDirector" :key="director.staffId">{{
                    director.nameRu
                  }}</router-link>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Сценарий</p>
              <p class="large-text">
                <router-link :to="{ name: 'name', params: { nameId: writer.staffId } }" class="link"
                  v-for="writer in movieStore.movieWriter" :key="writer.staffId">{{ writer.nameRu }},
                </router-link>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Продюсер</p>
              <p class="large-text">
                <router-link :to="{ name: 'name', params: { nameId: producer.staffId } }" class="link"
                  v-for="producer in movieStore.movieProducers" :key="producer.staffId">{{ producer.nameRu }},
                </router-link>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Оператор</p>
              <p class="large-text">
                <router-link :to="{ name: 'name', params: { nameId: operator.staffId } }" class="link"
                  v-for="operator in movieStore.movieOperator" :key="operator.staffId">{{ operator.nameRu }}
                </router-link>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Композитор</p>
              <p class="large-text">
                <router-link :to="{ name: 'name', params: { nameId: composer.staffId } }" class="link"
                  v-for="composer in movieStore.movieComposer" :key="composer.staffId">{{ composer.nameRu }}
                </router-link>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Художник</p>
              <p class="large-text">
                <router-link :to="{ name: 'name', params: { nameId: designer.staffId } }" class="link"
                  v-for="designer in movieStore.movieDesigner" :key="designer.staffId">{{ designer.nameRu }},
                </router-link>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Монтаж</p>
              <p class="large-text">
                <router-link :to="{ name: 'name', params: { nameId: editor.staffId } }" class="link"
                  v-for="editor in movieStore.movieEditor" :key="editor.staffId">{{ editor.nameRu }},
                </router-link>
              </p>
            </div>
            <div class="table-row" v-show="movieStore.marketing">
              <p class="table-row-title text-medium-emphasis">Маркетинг</p>
              <p>Маркетинг</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Бюджет</p>
              <p>
                {{
                  movieStore.budgetSpent?.symbol
                }}{{ properMoney(movieStore.budgetSpent?.amount) }}
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Сборы в США</p>
              <p>
                {{
                  movieStore.budgetSpent?.symbol
                }}{{ properMoney(movieStore.budgetUsa?.amount) }}
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Сборы в мире</p>
              <p>
                {{
                  movieStore.budgetSpent?.symbol
                }}{{ properMoney(movieStore.budgetWorld?.amount) }}
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">
                Премьера в мире
              </p>
              <p>{{ personDate(movieStore.worldPremiere?.date!, false) }}</p>
            </div>
            <div class="table-row" v-show="movieStore.movie.ratingAgeLimits">
              <p class="table-row-title text-medium-emphasis">Возраст</p>
              <p>{{ movieStore.movie.ratingAgeLimits }}</p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Рейтинг MPAA</p>
              <p class="ratingMpaa">
                <span class="mpaa">
                  {{ properRatingMpaa(movieStore.movie.ratingMpaa)[0] }}</span>
                <span class="mpaa-text">{{
                  properRatingMpaa(movieStore.movie.ratingMpaa)[1]
                }}</span>
              </p>
            </div>
            <div class="table-row">
              <p class="table-row-title text-medium-emphasis">Время</p>
              <p>{{ movieLength }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="movie-main-actors">
        <div class="d-flex flex-column">
          <h6 class="main-actors-title">В главных ролях</h6>
          <router-link :to="{ name: 'name', params: { nameId: person.staffId } }" class="link main-actor-name"
            v-for="person in movieStore.movieMainActors" :key="person.staffId">
            {{ person.nameRu }}</router-link>
        </div>
      </div>
    </v-container>
    <v-container class="prequels" v-show="movieStore.sequelsAndPrequels.length">
      <h4 class="text-h5 font-weight-bold">Сиквелы и приквелы</h4>
      <div class="d-flex preq-container">
        <div class="preq-movie" @click="
          $router.push({ name: 'movie', params: { movieId: movie.filmId } })
        " v-for="movie in movieStore.sequelsAndPrequels" :key="movie.filmId">
          <div>
            <img class="prequel-img" :src="movie.posterUrlPreview" :alt="movie.nameOriginal" />
          </div>
          <div class="font-weight-bold">{{ movie.nameRu }}</div>
          <div class="text-medium-emphasis">{{ movie.nameOriginal }}</div>
        </div>
      </div>
    </v-container>
    <v-container class="similars">
      <h4 class="text-h5 font-weight-bold">Схожие фильмы</h4>
      <div class="d-flex preq-container" v-if="movieStore.similars.length">
        <div class="preq-movie" @click="
          $router.push({ name: 'movie', params: { movieId: movie.filmId } })
        " v-for="movie in movieStore.similars" :key="movie.filmId">
          <div>
            <img class="prequel-img" :src="movie.posterUrlPreview" :alt="movie.nameOriginal" />
          </div>
          <div class="font-weight-bold">{{ movie.nameRu }}</div>
          <div class="text-medium-emphasis">{{ movie.nameOriginal }}</div>
        </div>
      </div>
      <div v-else>Схожих фильмов нет</div>
    </v-container>
    <v-container class="router">
      <ul class="router-links">
        <li class="router-link">
          <RouterLink activeClass="active-link" class="link" :to="{ name: 'review' }">Обзор</RouterLink>
        </li>
        <li class="router-link">
          <RouterLink activeClass="active-link" class="link" :to="{ name: 'award' }">Награды</RouterLink>
        </li>
        <li class="router-link">
          <RouterLink activeClass="active-link" class="link" :to="{ name: 'premiere' }">Премьеры</RouterLink>
        </li>
        <li class="router-link">
          <RouterLink activeClass="active-link" class="link" :to="{ name: 'image' }">Изображения</RouterLink>
        </li>
      </ul>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-container>
    <v-container class="videos" v-show="movieStore.videos.length">
      <h4 class="mb-10 text-h5 font-weight-bold">Видео и трейлеры</h4>
      <div class="videos-container">
        <div v-for="(video, index) in movieStore.videos" :key="index">
          <iframe width="386" height="250" :src="video.url.replace('watch?v=', 'embed/')" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </v-container>
    <v-container class="facts">
      <div>
        <h4 class="text-h2 font-weight-bold mb-2">Знаете ли вы, что...</h4>
        <ul class="facts-list">
          <li class="fact text-subtitle-2" v-for="(fact, index) in movieStore.facts" :key="index">
            {{ properText(fact.text) }}
          </li>
        </ul>
      </div>
    </v-container>
    <v-container class="reviews" v-show="movieStore.reviewObj.total">
      <div>{{ movieStore.reviewObj }}</div>
    </v-container>
    
  </v-container>
</template>
<script setup lang="ts">
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movieStore";
import { useSearchStore } from "@/stores/searchStore";
import MyLoaderVue from "@/components/MyLoader.vue";
import {
  properRatingMpaa,
  properMoney,
  properText,
} from "@/helpers/composables";
import { personDate } from "@/helpers/date";

const movieStore = useMovieStore();
const searchStore = useSearchStore();
const route = useRoute();

const genres = computed(() => {
  return movieStore.movie.genres.map((g) => g.genre).join(", ");
});

const countries = computed(() => {
  return movieStore.movie.countries.map((c) => c.country).join(", ");
});
const movieLength = computed(() => {
  const length = movieStore.movie.filmLength;
  return `${length} мин. / 0${Math.trunc(length / 60)}:${length % 60}`;
});

watch(
  () => route.params.movieId,
  (newValue, oldValue) => {
    if (newValue !== oldValue && newValue) {
      movieStore.getAllInfo(Number(newValue));
    }
  },
  { deep: true }
);

movieStore.getAllInfo(Number(route.params.movieId));
</script>

<style scoped>
.container {
  background-color: rgb(var(--v-theme-background));
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.movie-basic {
  display: flex;
  align-items: start;
  border-bottom: 2px solid #f50;
  margin-bottom: 30px;
}

.poster {
  margin-right: 40px;
}

.movie-info {
  margin-right: 30px;
}

.info-header {
  margin-bottom: 40px;
}

.movie-desc-title {
  margin-bottom: 20px;
}

.table-row {
  display: flex;
  margin-bottom: 10px;
}

.table-row-title {
  width: 160px;
}

.large-text {
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link:hover {
  color: #f50;
  transition: color 0.2s;
}

.mpaa {
  border: 1px solid rgb(var(--v-border-color));
  padding: 2px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  margin-right: 5px;
}

.mpaa-text {
  visibility: hidden;
  opacity: 0;
}

.ratingMpaa:hover .mpaa-text {
  visibility: visible;
  opacity: 0.3;
}

.main-actors-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 15px;
}

.main-actor-name {
  margin-bottom: 3px;
  font-size: 13px;
  text-decoration: none;
  word-break: break-word;
  cursor: pointer;
}

.prequels,
.similars {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid #f50;
  margin-bottom: 20px;
}

.preq-movie {
  margin-right: 20px;
  cursor: pointer;
}

.preq-movie:hover {
  transform: scale(1.2);
  transition: transform 0.3s;
}

.prequel-img {
  width: 150px;
  height: 225px;
}

.facts {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  border-bottom: 2px solid #f50;
}

.facts-list {
  list-style-type: circle;
}

.fact {
  border-bottom: 1px solid #eee;
  padding: 10px;
}

.fact:last-of-type {
  border: none;
}

.router {

  border-bottom: 2px solid #f50;
  padding-bottom: 40px;
}

.router-links {
  display: flex;
  list-style-type: none;
  border-bottom: 2px solid rgb(var(--v-theme-on-surface-variant));
  padding-bottom: 10px;
}

.router-link {
  margin-right: 10px;
  font-weight: 500;
  font-size: 16px;
}

.active-link {
  color: #f50;
  transform: scale(1.2);
}

.router-link:hover {
  transform: scale(1.2);
  transition: transform 0.3s;
}
.videos{
  
  border-bottom: 2px solid #f50;
  margin-bottom: 30px;
}
.videos-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
