<template>
  <div class="highlight-list">
    <HighlightCard>
      <h3 class="highlight-main-title">Wind status</h3>
      <h1 class="big-title">7.70<span>km/h</span></h1>
      <div class="bottom-description">
        <span class="wind-icon-container"><FaMapMarkerAlt /></span>
        <span class="description">WSW</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Humidity</h3>
      <h1 class="big-title">12<span>%</span></h1>
      <div class="bottom-description">
        <span class="description">Normal 👍🏼</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Sunrise & Sunset</h3>
      <div class="arrows-container">
        <div class="sun-content">
          <div class="outer-circle flex-center">
            <div class="inner-circle flex-center">
              <AiOutlineArrowUp />
            </div>
          </div>
          <h1>06:20AM</h1>
        </div>
        <div class="sun-content">
          <div class="outer-circle flex-center">
            <div class="inner-circle flex-center">
              <AiOutlineArrowDown />
            </div>
          </div>
          <h1>07:20PM</h1>
        </div>
      </div>
    </HighlightCard>

    <HighlightCard>
      <h3 class="highlight-main-title">Cloudness</h3>
      <h1 class="big-title">7<span>%</span></h1>
      <div class="bottom-description">
        <span class="description">Not too cloudy ☁️</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Visibility</h3>
      <h1 class="big-title">5.2<span>km</span></h1>
      <div class="bottom-description">
        <span class="description">Average 👀</span>
      </div>
    </HighlightCard>
    <HighlightCard>
      <h3 class="highlight-main-title">Pressure</h3>
      <h1 class="big-title">109.52<span>hpa</span></h1>
      <div class="bottom-description">
        <span class="description">Sea level: 108🍃</span>
      </div>
    </HighlightCard>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import HighlightCard from "./HighlightCard.vue";
import { FaMapMarkerAlt } from "vue3-icons/fa";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "vue3-icons/ai";
export default defineComponent({
  name: "HighlightList",
  components: {
    HighlightCard,
    FaMapMarkerAlt,
    AiOutlineArrowDown,
    AiOutlineArrowUp,
  },
});
</script>
<style scoped>
.highlight-list {
  display: grid;
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
  font-size: 1.8rem;
  transform: rotate(22deg);
}
</style>
