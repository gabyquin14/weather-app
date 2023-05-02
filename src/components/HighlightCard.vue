<template>
  <section class="highlight-card">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "HighlightCard",
});
</script>

<style scoped>
.highlight-card {
  padding: 2rem;
  border-radius: 2rem;
  background-color: white;
  width: 16rem;
  height: auto;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
</style>
