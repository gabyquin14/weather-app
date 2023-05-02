<template>
  <section class="weather-details">
    <div class="metric-conversion">
      <button class="metric active">Celsius</button>
      <button class="metric">Fahrenheit</button>
    </div>
    <h1 class="section-title">Next days forecast</h1>
    <div class="forecast-cards">
      <ForecastCard v-for="items in [0, 1, 2, 3, 4, 5, 6]" :key="items" />
    </div>
    <h1 class="section-title">Today's Highlights</h1>
    <HighlightList />
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ForecastCard from "./ForecastCard.vue";
import HighlightList from "./HighlightList.vue";
export default defineComponent({
  name: "WeatherDetails",
  components: { ForecastCard, HighlightList },
});
</script>
<style scoped>
.weather-details {
  background-color: #f6f6f8;
  height: 100%;
  width: 80%;
  border-radius: 0 0 2rem 2rem;
  /* display: flex;
  flex-direction: column; */
  padding: 2rem;
  box-sizing: border-box;
}
.metric-conversion {
  margin: 0 auto 2rem;
  width: fit-content;
}
.metric {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 2rem;
  padding-bottom: 0.5rem;
  transition: all 0.3s ease;
}
.metric.active {
  border-bottom: 0.2rem solid var(--accent);
}
.forecast-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
  grid-gap: 0.5rem;
  margin-bottom: 2rem;
}
.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
@media screen and (min-width: 700px) {
  .weather-details {
    min-width: 60rem;
    max-width: 60rem;
    padding: 4rem;
    border-radius: 0 2rem 2rem 0;
  }
  .metric-conversion {
    margin: 0 0 2rem auto;
  }
}
@media screen and (min-width: 1250px) {
  .weather-details {
    min-width: 80rem;
    max-width: 80rem;
    padding: 4rem;
  }
  .forecast-cards {
    display: flex;
    column-gap: 2rem;
  }
}
</style>
