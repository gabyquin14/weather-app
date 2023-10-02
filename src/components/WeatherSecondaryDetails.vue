<template>
  <section class="weather-details">
    <div class="metric-conversion">
      <button
        :class="`metric ${returnMetricClass('metric')}`"
        @click="weatherStore.setTempMetric('metric')"
      >
        Metric system
      </button>
      <button
        :class="`metric ${returnMetricClass('imperial')}`"
        @click="weatherStore.setTempMetric('imperial')"
      >
        Imperial system
      </button>
    </div>
    <h1 class="section-title">Next days forecast</h1>
    <div class="forecast-cards">
      <ForecastCard
        v-for="(items, index) in weatherStore.weatherInfo?.list"
        :key="`${items.dt}`"
        :index="index"
      />
    </div>
    <h1 class="section-title">Today's Highlights</h1>
    <HighlightList v-if="weatherStore.weatherInfo?.list" />
  </section>
</template>

<script setup lang="ts">
import ForecastCard from "./ForecastCard.vue";
import HighlightList from "./HighlightList.vue";
import { useWeatherStore } from "../store/weather";

const weatherStore = useWeatherStore();
const returnMetricClass = (metric: string) => {
  return weatherStore.metric === metric ? "active" : "";
};
</script>
<style scoped>
.weather-details::-webkit-scrollbar {
  display: none;
}
.weather-details {
  background-color: #f6f6f8;
  height: 100%;
  width: 100%;
  max-width: 60rem;
  border-radius: 0 0 2rem 2rem;
  padding: 2rem 4rem 4rem;
  box-sizing: border-box;
}
.metric-conversion {
  margin: 2rem auto 4rem;
  display: flex;
  gap: 2rem;
  width: fit-content;
}
.metric {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 2rem;
  padding-bottom: 0.5rem;
}
.metric.active {
  border-bottom: 0.2rem solid var(--accent);
}
.forecast-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.section-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

@media screen and (min-width: 900px) {
  .weather-details {
    min-height: unset;
    padding: 4rem;
  }
  .metric-conversion {
    margin: 0 0 2rem auto;
  }
}
@media screen and (min-width: 1200px) {
  .weather-details {
    min-height: unset;
    max-height: 90vh;
    max-width: unset;
    overflow-y: scroll;
    padding: 4rem;
    border-radius: 0 2rem 2rem 0;
  }
  .forecast-cards {
    display: flex;
    column-gap: 2rem;
  }
}
@media screen and (min-width: 1250px) {
  .weather-details {
    overflow: hidden;
  }
}
</style>
