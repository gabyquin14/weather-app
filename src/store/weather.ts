import { defineStore } from "pinia";
import { DayWeather } from "./type";
import axios from "axios";

export const useWeatherStore = defineStore("weather", {
  state: () => ({ weatherInfo: {} as DayWeather | null, metric: "metric" }),
  getters: {
    hasWeatherList: (state) => {
      return state.weatherInfo?.list[0];
    },
  },
  actions: {
    async setWeatherInfo(city = "caracas") {
      try {
        const key = "fa4c72d59e16a260f9e168838ebe21bd";
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`
        );

        const dayWeather: DayWeather | null = response.data as DayWeather;

        dayWeather.list = dayWeather.list.filter(
          (item, index) => index === 0 || index % 8 === 7
        );
        this.$patch({ weatherInfo: dayWeather });
      } catch (error) {
        console.log(error);
      }
    },
    setTempMetric(type: string) {
      this.$patch({ metric: type });
    },
    convertDate() {
      if (this.hasWeatherList) {
        const date = new Date(this.hasWeatherList.dt * 1000);
        const hours = date.getHours().toString().padStart(2, "0");
        const ampm = parseInt(hours) >= 12 ? "pm" : "am";
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.toLocaleDateString(undefined, {
          weekday: "long",
          hour12: this.metric === "metric",
        });
        return [day, hours, minutes];
      }
    },
    getTemp(temp: number) {
      if (this.hasWeatherList) {
        if (this.metric === "metric") {
          return (temp - 273.15).toFixed(1);
        } else {
          return (1.8 * (temp - 273) + 32).toFixed(1);
        }
      }
    },
  },
});
