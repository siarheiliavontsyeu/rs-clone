<template>
  <FullPageBg></FullPageBg>
  <v-container class="container">
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="one"
          ><v-icon dark>mdi-information-variant </v-icon>О сайте</v-tab
        >
        <v-tab value="two"
          ><v-icon dark> mdi-account-group-outline</v-icon>О команде</v-tab
        >
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item value="one">
          <v-card class="ma-2 pa-2">
            <h2 align="center">
              <v-icon dark>mdi-information-variant</v-icon>О сайте
            </h2>
            <div>
              <h3 align="center">
                Добро пожаловать на наш сайт - клона кинопоиска!
              </h3>
              <ul>
                <li>
                  - Здесь вы найдете огромную коллекцию фильмов, сериалов и
                  мультфильмов, доступных для просмотра. Мы предлагаем удобный и
                  простой интерфейс, который позволит вам быстро находить
                  интересующие вас фильмы и сериалы.
                </li>
                <li>
                  - На нашем сайте вы сможете найти информацию о различных
                  кинокартинах, такую как описание сюжета, рейтинг, отзывы
                  зрителей и критиков, а также информацию об актерском составе и
                  режиссере. Также у нас есть функция поиска, которая поможет
                  вам найти интересующий вас фильм или сериал, используя
                  различные фильтры.
                </li>
                <li>
                  - Наш сайт также предоставляет удобный сервис оценки фильмов,
                  который позволяет пользователям ставить оценки и оставлять
                  отзывы о кинокартинах. Это поможет другим пользователям
                  выбрать лучшие фильмы для просмотра.
                </li>
                <li>
                  - Наслаждайтесь просмотром нашей библиотеки и найдите свои
                  любимые фильмы и сериалы на нашем сайте!
                </li>
              </ul>
            </div>
          </v-card>
          <v-card class="ma-2 pa-2">
            <h2 align="center">
              <v-icon dark> </v-icon>Используемые технологии
            </h2>

            <div>
              <h3 align="center">
                Наш сайт использует современные и надежные технологии для
                обеспечения высокой производительности и безопасности.
              </h3>
              <br />
              <h3 align="center">
                <v-icon color="primary">mdi-server</v-icon> Backend
              </h3>
              <br />
              <ul>
                <li>
                  Для разработки бэкенда мы используем
                  <v-icon color="primary">mdi-database</v-icon> MongoDB в
                  качестве базы данных,
                  <v-icon color="primary">mdi-nodejs</v-icon> Node.js и Express
                  для обработки запросов, а также
                  <v-icon color="primary">mdi-language-javascript</v-icon>
                  JavaScript для написания логики серверной части. Для сборки и
                  оптимизации нашего кода мы используем инструмент
                  <v-icon color="primary">mdi-webpack</v-icon> Webpack. Для
                  обеспечения безопасности нашего сайта мы используем протокол
                  SSL и <v-icon color="primary">mdi-web</v-icon> REST API. Кроме
                  того, наш сайт размещен на
                  <v-icon color="primary">mdi-cloud</v-icon> облачном сервере,
                  что обеспечивает высокую доступность и масштабируемость.
                </li>
              </ul>
              <br />
              <h3 align="center">
                <v-icon color="primary">mdi-view-compact-outline</v-icon>
                Frontend
              </h3>
              <br />
              <ul>
                <li>
                  В качестве фронтенда наш сайт использует
                  <v-icon color="primary">mdi-vuejs</v-icon> Vue.js, фреймворк
                  для создания интерфейсов. Для улучшения пользовательского
                  интерфейса мы используем
                  <v-icon color="primary">mdi-vuetify</v-icon> Vuetify -
                  фреймворк для создания красивых и респонсивных
                  веб-интерфейсов. Для управления состоянием нашего приложения
                  мы используем Pinia. Для улучшения надежности и облегчения
                  разработки мы также используем
                  <v-icon color="primary">mdi-language-typescript</v-icon>
                  Typescript. Для сборки и оптимизации фронтенд-кода мы также
                  используем
                  <v-icon color="primary">mdi-webpack</v-icon> Webpack.
                </li>
              </ul>
              <br />
              <h4>
                Все эти технологии в совокупности позволяют нам создавать
                высокопроизводительный и надежный сайт с современным
                пользовательским интерфейсом.
              </h4>
            </div>
          </v-card>
        </v-window-item>

        <v-window-item value="two"
          ><v-card class="ma-2 pa-2">
            <h2><v-icon dark> mdi-account-group-outline </v-icon>О команде</h2>
          </v-card>
          <DeveloperCard
            v-for="(developer, index) in developers"
            :key="developer.github"
            :developer="developer"
            :idx="index"
          >
          </DeveloperCard>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import DeveloperCard from "@/components/DeveloperCard.vue";
import FullPageBg from "@/components/FullPageBg.vue";
import { ref } from "vue";
import data from "@/constants/team.json";
const { developers } = data;
const tab = ref("one");
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
