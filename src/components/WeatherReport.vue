<template>
  <section class="weather-report">
    <WeatherMainCard
      v-if="weatherStore.weatherInfo && weatherStore.weatherInfo?.list"
    />
    <WeatherDetails />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import WeatherMainCard from "./WeatherMainCard.vue";
import WeatherDetails from "./WeatherDetails.vue";
import { useWeatherStore } from "../store/weather";

const weatherStore = useWeatherStore();
onMounted(async () => {
  await weatherStore.setWeatherInfo();
});
</script>

<style scoped>
.weather-report {
  border-radius: 2rem;
  color: var(--main-text);
  height: 100%;
  width: 80%;
  margin: 6rem 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 900px) {
  .weather-report {
    height: 100%;
  }
}
@media screen and (min-width: 1200px) {
  .weather-report {
    flex-direction: row;
    height: 90vh;
    max-height: 90vh;
    margin: 0;
  }
}
@media screen and (min-width: 1600px) {
  .weather-report {
    height: 80vh;
    max-height: 80vh;
  }
}
</style>
