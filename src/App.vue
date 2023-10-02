<template>
  <div><WeatherReport /></div>
</template>

<script setup lang="ts">
import WeatherReport from "./components/WeatherReport.vue";
</script>

<style scoped>
div {
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--light-gray);
}
</style>
