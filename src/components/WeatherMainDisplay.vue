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
    <div class="icon-and-date-container">
      <img
        :src="returnImage(storeShortcut?.weather[0].icon as keyof typeof imageCodes)"
        alt="weather-icon"
        class="weather-img"
      />
      <div class="degrees-and-time">
        <h2 class="degrees-number">
          {{ weatherStore.getTemp(storeShortcut?.main.temp as number) }}
          <span>{{ weatherStore.metric === "metric" ? "°C" : "°F" }}</span>
        </h2>
        <p class="city-date">
          {{ day }}, <span>{{ hours }}:{{ minutes }}</span>
        </p>
      </div>
    </div>

    <div class="main-card-content">
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
  max-width: 60rem;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2rem;
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
.icon-and-date-container {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin: auto 0;
}
.weather-img {
  width: 15rem;
  height: 15rem;
  pointer-events: none;
}
.degrees-number {
  font-size: 5rem;
  display: flex;
  font-weight: 400;
}
.degrees-number span {
  font-size: 3rem;
  font-weight: 600;
}
.city-date {
  font-size: 2rem;
  text-transform: capitalize;
}
.city-date span {
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

@media screen and (min-width: 375px) {
  .weather-img {
    width: 20rem;
    height: 20rem;
  }
}
@media screen and (min-width: 400px) {
  .weather-img {
    width: 25rem;
    height: 25rem;
  }
}
@media screen and (min-width: 600px) {
  .icon-and-date-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (min-width: 700px) {
  /*MAIN CARD CONTENT */
  .main-card-content {
    margin-top: auto;
  }
  .main-card {
    height: 100%;
    max-height: 90vh;
    border-radius: 1rem 1rem 0 0;
    padding: 2rem 4rem 4rem;
  }
}

@media screen and (min-width: 1200px) {
  .main-card {
    min-width: 40rem;
    max-width: 40rem;
    max-height: 90vh;
    min-height: unset;
    width: 30%;
    padding: 4rem;
    border-radius: 2rem 0 0 2rem;
  }

  .icon-and-date-container {
    display: flex;
    justify-content: flex-end;
    align-items: unset;
    height: 100%;
    position: relative;
  }

  .degrees-and-time {
    margin-top: auto;
  }

  .weather-img {
    position: absolute;
    right: -5rem;
    width: 25rem;
    height: 25rem;
  }
}
</style>
