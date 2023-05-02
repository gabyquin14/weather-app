<template>
  <section class="main-card">
    <div class="city-input">
      <div>
        <BiSearch />
        <input type="text" placeholder="Search a city..." />
      </div>

      <BiX style="margin-left: auto" />
    </div>
    <img
      src="../assets/animated/cloudy-day-1.svg"
      alt="weather-icon"
      class="weather-img"
    />

    <div class="main-card-content">
      <h2 class="main-card-degrees">12<span>°C</span></h2>
      <p class="main-card-date">Monday, <span>16:00</span></p>

      <div class="separator" />

      <div class="main-card-stats">
        <img src="../assets/animated/cloudy.svg" alt="" class="city-stats" />
        <h4>Mostly cloudy</h4>
      </div>

      <div class="main-card-stats">
        <img src="../assets/animated/rainy-4.svg" alt="" class="city-stats" />
        <h4>Rain 30%</h4>
      </div>

      <div class="city-img-container">
        <div class="city-img-overlay" />
        <span class="city-image-title">Maracaibo, VE</span>
        <img :src="cityPhoto" alt="" class="city-img" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from "vue";
import axios from "axios";
import { BiSearch, BiX } from "vue3-icons/bi";

export default defineComponent({
  name: "WeatherMainCard",
  components: { BiSearch, BiX },
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const cityPhoto = ref("");
    onMounted(async () => {
      try {
        const response = await axios.get(
          `https://api.teleport.org/api/urban_areas/slug:caracas/images/`
        );

        cityPhoto.value = response.data.photos[0].image.mobile;
      } catch (error) {
        console.log(error);
      }
    });
    return { cityPhoto };
  },
});
</script>

<style scoped>
.main-card {
  background-color: white;
  border-radius: 2rem 2rem 0 0;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;
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
  top: 2rem;
  right: -6rem;
  width: 35rem;
  height: auto;
  pointer-events: none;
}
.main-card-degrees {
  font-size: 6rem;
  display: flex;
  font-weight: 400;
}
.main-card-degrees span {
  font-size: 3rem;
  font-weight: 600;
}
.main-card-date {
  font-size: 2rem;
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
@media screen and (min-width: 900px) {
  .main-card {
    min-width: 40rem;
    max-width: 40rem;
    width: 30%;
    padding: 4rem;
    border-radius: 2rem 0 0 2rem;
  }
}
</style>
