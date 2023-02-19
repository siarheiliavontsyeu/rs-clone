<template>
  <div>
    <transition name="slide-fade">
      <v-container class="submit-review" v-if="!writeView">
        <h6 class="text-h5">Написать рецензию</h6>
        <div class="review">
          <div class="header">
            <p>{{ authStore.user?.name }}</p>
          </div>
          <div class="body">
            <v-select
              label="Тип рецензии"
              variant="outlined"
              v-model="reviewType"
              :items="reviewTypes"
              color="#f50"
              item-title="title"
              item-value="value"
            ></v-select>
            <v-text-field
              v-model="title"
              label="Заголовок"
              color="#f50"
              variant="outlined"
            ></v-text-field>
            <v-textarea
              v-model="description"
              auto-grow
              :maxlength="200"
              :counter="200"
              color="#f50"
              :rules="rules"
              label="Текст"
              variant="outlined"
            ></v-textarea>
          </div>
          <div class="buttons">
            <v-btn class="submit" @click="onReviewSubmit"
              >Опубликовать рецензию</v-btn
            >
            <v-btn class="check" variant="text" @click="onReviewViewChange"
              >Предварительный просмотр</v-btn
            >
          </div>
        </div>
      </v-container>
      <v-container class="submit-review" v-else>
        <h6 class="text-h5">Предварительный просмотр</h6>
        <ReviewCard :review="review" />
        <v-card-actions class="buttons">
          <v-btn class="check" variant="text" @click="writeView = false">
            Вернуться к редактированию
          </v-btn>
        </v-card-actions>
      </v-container>
    </transition>
    <v-snackbar
      v-model="noType"
      color="#f50"
      timeout="4000"
      location="bottom left"
      variant="tonal"
    >
      Необходимо выбрать тип рецензии. Текст рецензии отсутствует
    </v-snackbar>
    <v-snackbar
      v-model="noTitle"
      color="#f50"
      timeout="4000"
      location="bottom left"
      variant="tonal"
    >
      Отсутствует заголовок рецензии
    </v-snackbar>
    <v-snackbar
      v-model="noDescription"
      color="#f50"
      timeout="4000"
      location="bottom left"
      variant="tonal"
    >
      Текст рецензии отсутствует
    </v-snackbar>
    <v-snackbar
      v-model="noDescriptionLength"
      color="#f50"
      timeout="4000"
      location="bottom left"
      variant="tonal"
    >
      Слишком короткая рецензия... Попробуйте еще раз и у вас всё получится!
    </v-snackbar>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { useMovieStore } from "@/stores/movieStore";
import ReviewCard from "@/components/ReviewCard.vue";
import { ref } from "vue";

const authStore = useAuthStore();
const movieStore = useMovieStore();

const writeView = ref(false);

const reviewType = ref();
const title = ref("");
const description = ref("");
const noType = ref(false);
const noDescription = ref(false);
const noDescriptionLength = ref(false);
const noTitle = ref(false);

let review = {
  type: reviewType.value,
  date: "",
  positiveRating: 0,
  negativeRating: 0,
  author: authStore.user?.name || "Аноним",
  title: title.value,
  description: description.value,
};

const reviewTypes = [
  { value: "positive", title: "Положительная" },
  { value: "negative", title: "Отрицательная" },
  { value: "neutral", title: "Нейтральная" },
];

const onReviewViewChange = () => {
  const isError = [
    noType.value,
    noDescription.value,
    noTitle.value,
    noDescriptionLength.value,
  ];
  if (!reviewType.value) {
    noType.value = true;
    return;
  }
  if (!title.value) {
    noTitle.value = true;
    return;
  }
  if (!description.value) {
    noDescription.value = true;
    return;
  }
  if (description.value.length < 50) {
    noDescriptionLength.value = true;
    return;
  }
  if (!isError.some((err) => err === true)) {
    writeView.value = true;
    review = {
      type: reviewType.value,
      date: new Date().toISOString(),
      positiveRating: 0,
      negativeRating: 0,
      author: authStore.user?.name || "Аноним",
      title: title.value,
      description: description.value,
    };
  }
};

const onReviewSubmit = () => {
  const isError = [
    noType.value,
    noDescription.value,
    noTitle.value,
    noDescriptionLength.value,
  ];
  if (!reviewType.value) {
    noType.value = true;
    return;
  }
  if (!title.value) {
    noTitle.value = true;
    return;
  }
  if (!description.value) {
    noDescription.value = true;
    return;
  }
  if (description.value.length < 50) {
    noDescriptionLength.value = true;
    return;
  }
  if (!isError.some((err) => err === true)) {
    movieStore.submitReview(
      String(movieStore.movie.kinopoiskId),
      description.value,
      title.value,
      reviewType.value
    );
    description.value = "";
    title.value = "";
    reviewType.value = "";
  }
};
const rules = [(v: string) => v.length <= 200 || "Максимум 200 символов"];
</script>
<style scoped>
.submit-review {
  margin-top: 30px;
  width: 100%;
}

.review {
  border: 1.2px solid rgba(0, 0, 0, 0.1);
}

.header {
  border-bottom: 1px solid rgba(31, 31, 31, 0.07);
  display: flex;
  align-items: start;
  flex-direction: column;
  padding: 16px 24px;
}

.username {
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: var(--color-text);
}

.exit {
  font-size: 12px;
  color: #1f1f1f;
  text-decoration: none;
  opacity: 0.6;
  background-color: transparent;
}

.body {
  padding: 19px 24px 0;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
}

.submit {
  display: block;
  box-sizing: border-box;
  height: 52px;
  margin: auto;
  padding: 15px 26px 15px 22px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  color: #fff;
  border: 0 solid transparent;
  border-radius: 100px;
  outline: none;
  background: linear-gradient(135deg, #f50 69.91%, #d6bb00);
  transition: transform 0.2s ease-out;
  margin-bottom: 16px;
}

.check {
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-text);
  outline: none;
}

.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
