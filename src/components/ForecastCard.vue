<template>
  <div class="forecast-card">
    <h1 class="forecast-weather">{{ returnWeekday() }}</h1>
    <img
      :src="returnImage(storeShortcut?.weather[0].icon as keyof typeof imageCodes)"
      alt="weather-forecast"
      class="forecast-img"
    />
    <p>
      <span class="forecast-maxtemp">{{
        weatherStore.getTemp(storeShortcut?.main?.temp_max as number)
      }}</span
      ><span class="forecast-mintemp">{{
        weatherStore.getTemp(storeShortcut?.main?.temp_min as number)
      }}</span>
    </p>
  </div>
</template>
<script setup lang="ts">
import { defineProps, computed } from "vue";
import { useWeatherStore } from "../store/weather";
import { returnImage, imageCodes } from "@/helpers/index";
const weatherStore = useWeatherStore();

const props = defineProps({
  index: Number,
});

const storeShortcut = computed(
  () => weatherStore.weatherInfo?.list[props.index as number]
);
const returnWeekday = () => {
  if (weatherStore.weatherInfo?.list) {
    const date = new Date(
      weatherStore.weatherInfo?.list[props.index as number].dt * 1000
    );
    return date.toLocaleDateString(undefined, {
      weekday: "long",
    });
  }
};
</script>
<style scoped>
.forecast-card {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 8rem;
  height: 10rem;
  border-radius: 2rem;
  padding: 1rem;
  position: relative;
  font-size: 1.4rem;
}
.forecast-weather {
  font-weight: 400;
  font-size: 1.6rem;
  text-transform: capitalize;
}
.forecast-img {
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.forecast-mintemp {
  margin-left: 0.6rem;
  color: var(--dark-gray);
}
@media screen and (min-width: 1200px) {
  .forecast-img {
    width: 8rem;
    height: auto;
  }
}
</style>
