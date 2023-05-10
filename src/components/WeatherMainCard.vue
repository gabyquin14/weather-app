<template>
  <section class="main-card">
    <div class="city-input">
      <div>
        <BiSearch />
        <input
          type="text"
          placeholder="Search a city..."
          v-model="city"
          @keydown.enter.stop="fetchWeatherInfo"
        />
      </div>

      <BiX style="margin-left: auto" />
    </div>
    <img
      :src="returnImage(storeShortcut?.weather[0].icon as keyof typeof imageCodes)"
      alt="weather-icon"
      class="weather-img"
    />

    <div class="main-card-content">
      <h2 class="main-card-degrees">
        {{ weatherStore.getTemp(storeShortcut?.main.temp as number) }}
        <span>{{ weatherStore.metric === "metric" ? "°C" : "°F" }}</span>
      </h2>
      <p class="main-card-date">
        {{ day }}, <span>{{ hours }}:{{ minutes }}</span>
      </p>

      <div class="separator" />

      <div class="main-card-stats">
        <img :src="returnImage('03d')" alt="" class="city-stats" />
        <h4>{{ storeShortcut?.weather[0].description }}</h4>
      </div>

      <div class="main-card-stats">
        <img :src="returnImage('09d')" alt="" class="city-stats" />
        <h4>
          Rain in last 3h:
          {{ storeShortcut?.rain ? `${storeShortcut.rain["3h"]}%` : "None" }}
        </h4>
      </div>

      <div class="city-img-container">
        <div class="city-img-overlay" />
        <span class="city-image-title"
          >{{ weatherStore.weatherInfo?.city.name }},
          {{ weatherStore.weatherInfo?.city.country }}</span
        >
        <img :src="cityPhoto" alt="" class="city-img" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { BiSearch, BiX } from "vue3-icons/bi";
import { useWeatherStore } from "../store/weather";
import { returnImage, imageCodes } from "@/helpers/index";

const city = ref("caracas");
const cityPhoto = ref("");
const weatherStore = useWeatherStore();
const [day, hours, minutes] = weatherStore.convertDate() ?? ["", "", ""];
const storeShortcut = computed(() => weatherStore.weatherInfo?.list[0]);

const fetchImage = async () => {
  try {
    const response = await axios.get(
      `https://api.teleport.org/api/urban_areas/slug:${city.value}/images/`
    );
    cityPhoto.value = response.data.photos[0].image.mobile;
  } catch (error) {
    const response = await axios.get(
      `https://api.teleport.org/api/urban_areas/slug:caracas/images/`
    );
    cityPhoto.value = response.data.photos[0].image.mobile;
    console.log(error);
  }
};
const fetchWeatherInfo = async () => {
  await weatherStore.setWeatherInfo(city.value);
  await fetchImage();
};

onMounted(async () => {
  fetchImage();
});
</script>

<style scoped>
.main-card {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2rem;
  position: relative;
}
.city-input {
  background-color: #f6f6f8;
  padding: 1rem;
  font-size: 2rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.city-input div {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}
.city-input svg {
  min-width: 2rem;
}
.city-input input {
  background-color: transparent;
  outline: none;
  border: none;
  color: var(--main-text);
}
.city-input input::placeholder {
  color: var(--main-text);
}
.weather-img {
  position: absolute;
  top: 2%;
  right: -6rem;
  width: 30rem;
  height: auto;
  pointer-events: none;
}
.main-card-degrees {
  font-size: 5rem;
  display: flex;
  font-weight: 400;
}
.main-card-degrees span {
  font-size: 3rem;
  font-weight: 600;
}
.main-card-date {
  font-size: 2rem;
  text-transform: capitalize;
}
.main-card-date span {
  color: var(--dark-gray);
}
.separator {
  background-color: var(--dark-gray);
  height: 0.1rem;
  width: 100%;
  margin: 2rem 0 1rem;
}
.main-card-stats {
  display: flex;
  align-items: center;
  column-gap: 0rem;
  height: 4rem;
  overflow: hidden;
}
.main-card-stats img {
  width: 5rem;
  height: auto;
}
.main-card-stats h4 {
  font-size: 1.8rem;
  font-weight: 400;
  text-transform: capitalize;
}
/*MAIN CARD CONTENT */
.main-card-content {
  margin-top: auto;
}
/*IMAGE WITH CITY NAME */
.city-img-container {
  border-radius: 2rem;
  position: relative;
  width: 100%;
  height: 14rem;
  margin-top: 4rem;
}
.city-img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2rem;
  background-color: rgba(0, 0, 0, 0.479);
}
.city-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
  border-radius: 2rem;
}
.city-image-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
}

@media screen and (min-width: 700px) {
  .main-card {
    height: 100%;
    min-height: calc(100vh - 40rem);
    border-radius: 1rem 1rem 0 0;
    padding: 2rem 4rem 4rem;
  }
}

@media screen and (min-height: 600px) {
  .weather-img {
    top: 4%;
    right: -2rem;
    width: 32rem;
  }
}

@media screen and (min-height: 900px) {
  .weather-img {
    top: 4%;
    right: -6rem;
    width: 40rem;
  }
}
@media screen and (min-width: 1200px) {
  .main-card {
    min-width: 40rem;
    max-width: 40rem;
    width: 30%;
    min-height: 100%;
    padding: 4rem;
    border-radius: 2rem 0 0 2rem;
  }
}
</style>
