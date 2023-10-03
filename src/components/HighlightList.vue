<template>
  <div class="highlight-list">
    <HighlightCard>
      <h3 class="highlight-main-title">Wind status</h3>
      <h1 class="big-title">
        {{ returnWindSpeed() }}<span>{{ metrics ? "km/h" : "mi/h" }}</span>
      </h1>
      <div class="bottom-description">
        <span class="wind-icon-container"><MapPinIcon /></span>
        <span class="description">{{ degToCompass() }}</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Humidity</h3>
      <h1 class="big-title">
        {{ storeShortcut?.main.humidity }}<span>%</span>
      </h1>
      <div class="bottom-description">
        <span class="description">{{ humidityCaption() }}</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Sunrise & Sunset</h3>
      <div class="arrows-container">
        <div class="sun-content">
          <div class="outer-circle flex-center">
            <div class="inner-circle flex-center">
              <ArrowUpIcon />
            </div>
          </div>
          <h1>{{ returnDate("sunrise") }}</h1>
        </div>
        <div class="sun-content">
          <div class="outer-circle flex-center">
            <div class="inner-circle flex-center">
              <ArrowDownIcon />
            </div>
          </div>
          <h1>{{ returnDate("sunset") }}</h1>
        </div>
      </div>
    </HighlightCard>

    <HighlightCard>
      <h3 class="highlight-main-title">Cloudness</h3>
      <h1 class="big-title">{{ storeShortcut?.clouds.all }}<span>%</span></h1>
      <div class="bottom-description">
        <span class="description">{{ cloudyCaption() }} ☁️</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Visibility</h3>
      <h1 class="big-title">
        {{ returnVisibility() }}<span>{{ metrics ? "km" : "miles" }}</span>
      </h1>
      <div class="bottom-description">
        <span class="description">{{ visibilityCaption() }}👀</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Pressure</h3>
      <h1 class="big-title">
        {{ storeShortcut?.main.pressure }}<span>hPa</span>
      </h1>
      <div class="bottom-description">
        <span class="description"
          >Ground level: {{ storeShortcut?.main.grnd_level }}hPa🍃</span
        >
      </div>
    </HighlightCard>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import HighlightCard from "./HighlightCard.vue";
import {
  MapPinIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/vue/24/solid";
import { useWeatherStore } from "../store/weather";
import { CityType } from "@/store/type";

const weatherStore = useWeatherStore();
const metrics = computed(() => weatherStore.metric === "metric");
const storeShortcut = computed(() => weatherStore.weatherInfo?.list[0]);

const degToCompass = () => {
  var deg = Math.floor((storeShortcut.value?.wind?.deg as number) / 22.5 + 0.5);
  var directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[deg % 16];
};

const returnWindSpeed = () => {
  if (storeShortcut.value) {
    return metrics.value
      ? ((storeShortcut.value.wind.speed * 3600) / 1000).toFixed(2)
      : (storeShortcut.value.wind.speed * 2.2369).toFixed(2);
  }
};

const returnDate = (type: keyof CityType): string => {
  const unixSeconds = Number(weatherStore?.weatherInfo?.city?.[type]);
  const timezone = Number(weatherStore?.weatherInfo?.city?.timezone);
  const date = new Date((unixSeconds + timezone * 60) * 1000);
  const hours = `0${
    date.getHours() % (metrics.value ? 12 : 24) || (metrics.value ? 12 : 0)
  }`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  const ampm = metrics.value ? (date.getHours() >= 12 ? "PM" : "AM") : "";
  return `${hours}:${minutes} ${ampm}`;
};

const returnVisibility = () => {
  if (metrics.value) {
    return ((storeShortcut.value?.visibility as number) / 1000).toFixed(1);
  } else {
    return ((storeShortcut.value?.visibility as number) / 1609).toFixed(1);
  }
};

const humidityCaption = () => {
  if (storeShortcut?.value) {
    if (storeShortcut?.value?.main.humidity <= 55) {
      return "Dry and comfortable";
    } else if (storeShortcut?.value?.main.humidity <= 65) {
      return "Sticky and muggy";
    } else {
      return "Lots of moisture";
    }
  }
};
const cloudyCaption = () => {
  if (storeShortcut?.value) {
    if (storeShortcut?.value?.clouds.all <= 50) {
      return "Not too cloudy";
    } else if (storeShortcut?.value?.main.humidity <= 65) {
      return "Cloudy";
    } else {
      return "Mostly cloudy";
    }
  }
};
const visibilityCaption = () => {
  if (storeShortcut?.value) {
    if (storeShortcut?.value?.visibility <= 1000) {
      return "Poor visibility";
    } else if (storeShortcut?.value?.visibility <= 6000) {
      return "Average";
    } else {
      return "Great visibility";
    }
  }
};
</script>
<style scoped>
.highlight-list {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 2rem;
}
.highlight-main-title {
  font-size: 1.6rem;
  color: var(--dark-gray);
  font-weight: 400;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.arrows-container {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
.sun-content {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}
.sun-content h1 {
  font-size: 2rem;
  font-weight: 400;
}
.outer-circle {
  background-color: #ffb021;
  width: 4rem;
  height: 4rem;
  border-radius: 20rem;
}
.inner-circle {
  background-color: #fdbe49;
  width: 3rem;
  height: 3rem;
  border-radius: 20rem;
}
.inner-circle svg {
  color: white;
  font-size: 2rem;
  font-weight: 600;
}
.big-title {
  font-size: 2.8rem;
  font-weight: 500;
}
.big-title span {
  font-size: 1.8rem;
  margin-left: 0.5rem;
}
.bottom-description {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}
.wind-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20rem;
  width: 2.8rem;
  height: 2.8rem;
  border: 0.1rem solid var(--light-blue);
}
.description {
  font-size: 1.6rem;
}
.wind-icon-container svg {
  color: var(--accent);
  width: 1.8rem;
  transform: rotate(22deg);
}
svg {
  width: 1.8rem;
}
</style>
