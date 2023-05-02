<template>
  <div></div>
  <div class="weather"><WeatherReport /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherReport from "./components/WeatherReport.vue";

export default defineComponent({
  name: "App",
  components: { WeatherReport },
});
</script>

<style scoped>
.weather {
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-gray);
}
</style>
