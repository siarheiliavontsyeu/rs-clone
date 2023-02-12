<template>
  <div class="error-page">
    <div class="error-page__container">
      <div class="error-page__logo-wrapper">
        <h1
          class="error-page__logo text-h2 pa-2 cup"
          @click="$router.push({ name: 'home' })"
        >
          Online-cinema
        </h1>
      </div>
      <div class="error-page__container-left">
        <h2>404. Страница не найдена</h2>
        <p class="desc">
          Возможно, она была перемещена, или вы&nbsp;просто неверно указали
          адрес страницы.
        </p>
        <div class="links">
          <p @click="$router.push({ name: 'home' })">Перейти на&nbsp;главную</p>
        </div>
      </div>
      <div class="error-page__container-right">
        <video
          autoplay
          loop
          :src="`https://www.kinopoisk.ru/public/videos/errors/desktop/404/${
            Math.floor(Math.random() * (5 - 1 + 1)) + 1
          }.mp4`"
          width="500"
          id="error-video"
          webkit-playsinline
          playsinline
        ></video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
document.title = "404 - Страница не найдена";
</script>

<style lang="css" scoped>
.error-page {
  position: relative;
  z-index: 2;
  width: 100%;
}

.error-page__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  width: 89vw;
  max-width: 1000px;
  height: 100%;
  margin: auto;
}

.error-page__logo {
  width: 25rem;
  text-align: center;
  position: relative;
  opacity: 0.9;
  transition: opacity 0.25s ease-out;
}

.error-page__logo::after {
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 2px;
  content: "";
  background-color: #f60;
  transition: width 0.25s ease-out;
}

.error-page__logo:hover {
  opacity: 1;
  transition: opacity 0.25s ease-out;
}

.error-page__logo:hover::after {
  width: 25rem;
  transition: width opacity 0.25s ease-out;
}

.error-page__logo-wrapper {
  width: 100%;
  padding-top: 10vh;
}

.error-page__logo img {
  opacity: 0.9;
}

.error-page__container-left {
  max-width: 410px;
  margin-top: 10vh;
}

.error-page__container-left h2 {
  font-size: 48px;
  font-weight: bold;
  line-height: 52px;
  color: var(--color-text);
}

.error-page__container-left .desc {
  padding-top: 20px;

  font-size: 16px;
  line-height: 22px;
  color: var(--color-text);
}

.error-page__container-left .links {
  margin-top: 60px;
  line-height: 20px;
  display: block;
  margin-top: 14px;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text);
  transition: background-color 0.1s ease-out;
  cursor: pointer;
}

.error-page__container-left .links:hover {
  color: #7e7e7e;
  transition: opacity 0.1s ease-out;
}

.error-page__container-right {
  margin-top: 10vh;
}

.error-page__container-right video {
  border-radius: 4px;
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  .error-page__logo-wrapper {
    display: table-caption;
    padding-top: 0rem;
    padding-bottom: 3rem;
    text-align: center;
  }

  .error-page__container {
    display: table;
    justify-content: center;
    max-width: 500px;
  }

  .error-page__container-left {
    display: table-footer-group;
    width: 100%;
    max-width: none;
    text-align: center;
  }

  .error-page__container-left h2 {
    max-width: 419px;
    margin: 2rem auto 0;
  }

  .error-page__container-left .links {
    margin: 0;
  }

  .error-page__container-right {
    display: table-header-group;
  }
}
</style>
