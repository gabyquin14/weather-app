<template>
  <div class="weather-report">
    <WeatherMainDisplay
      v-if="weatherStore.weatherInfo && weatherStore.weatherInfo?.list"
    />
    <WeatherSecondaryDetails />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import WeatherMainDisplay from "./WeatherMainDisplay.vue";
import WeatherSecondaryDetails from "./WeatherSecondaryDetails.vue";
import { useWeatherStore } from "../store/weather";

const weatherStore = useWeatherStore();
onMounted(async () => {
  await weatherStore.setWeatherInfo();
});
</script>

<style scoped>
.weather-report {
  color: var(--main-text);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 600px) {
  .weather-report {
    border-radius: 2rem;
    height: 100%;
    width: 80%;
    margin: 2rem 0;
  }
}
@media screen and (min-width: 800px) {
  .weather-report {
    margin: 6rem 0;
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
