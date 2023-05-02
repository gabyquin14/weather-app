<template>
  <div class="forecast-card">
    <h1 class="forecast-weather">Sun</h1>
    <img
      src="../assets/animated/day.svg"
      alt="weather-forecast"
      class="forecast-img"
    />
    <p>
      <span class="forecast-maxtemp">15°</span
      ><span class="forecast-mintemp">-3°</span>
    </p>
  </div>
</template>

<style scoped>
.forecast-card {
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 6rem;
  height: 8rem;
  border-radius: 2rem;
  padding: 1rem;
  position: relative;
  font-size: 1.4rem;
}
.forecast-weather {
  font-weight: 400;
}
.forecast-img {
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}
.forecast-mintemp {
  margin-left: 0.4rem;
  color: var(--dark-gray);
}
@media screen and (min-width: 1200px) {
  .forecast-img {
    width: 8rem;
    height: auto;
  }
}
</style>
