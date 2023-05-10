<template>
  <section class="highlight-card">
    <slot></slot>
  </section>
</template>
<style scoped>
.highlight-card {
  padding: 1rem 2rem;
  border-radius: 2rem;
  background-color: white;
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
}
@media screen and (min-width: 800px) {
  .highlight-card {
    width: 16rem;
  }
}
</style>
