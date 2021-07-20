<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="scss" scoped>
  .card {
    border-radius: 1.2rem;
    box-shadow: 0 .2rem .8rem rgba(0, 0, 0, .26);
    padding: 1rem;
    margin: 2rem auto;
    max-width: 80rem;
  }
</style>
