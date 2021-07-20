<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
  export default {
    props: ['type', 'title'],
    computed: {
      text() {
        return this.title.toUpperCase();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .badge {
    background-color: $color-grey;
    color: $color-black-pale;
    border-radius: 3rem;
    padding: 0.5rem 1.5rem;
    display: inline-block;
    margin-right: 0.5rem;
  }

  .frontend {
    background-color: $color-primary-purple;
    color: white;
  }

  .backend {
    background-color: $color-magenta-dark;
    color: white;
  }

  .career {
    background-color: $color-magenta;
    color: white;
  }
</style>
