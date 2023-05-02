<template>
  <section class="weather-report">
    <WeatherMainCard v-if="info && info.list" :info="info" />
    <WeatherDetails />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import WeatherMainCard from "./WeatherMainCard.vue";
import WeatherDetails from "./WeatherDetails.vue";
import { DayWeather } from "@/store/type";

export default defineComponent({
  name: "WeatherReport",
  components: { WeatherMainCard, WeatherDetails },
  setup() {
    const info = ref<DayWeather>();
    onMounted(async () => {
      try {
        const city = "maracaibo";
        const key = "fa4c72d59e16a260f9e168838ebe21bd";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=${key}`
        );

        info.value = response.data;
      } catch (error) {
        console.log(error);
      }
    });
    return { info };
  },
});
</script>

<style scoped>
.weather-report {
  border-radius: 2rem;
  color: var(--main-text);
  height: 90vh;
  max-height: 90vh;
  width: 80%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -10px 21px 37px 7px rgba(219, 219, 219, 1);
}
@media screen and (min-width: 900px) {
  .weather-report {
    flex-direction: row;
  }
}
</style>
