<template>
  <li>
    <a :href="emailLink">{{ email }}</a>
    <p>{{ message }}</p>
  </li>
</template>

<script>
  export default {
    props: ['email', 'message'],
    computed: {
      emailLink() {
        return `mailto:${this.email}`;
      }
    }
  };
</script>

<style lang="scss" scoped>
  li {
    margin: 1rem 0;
    border: 1px solid $color-grey;
    padding: 1rem;
  }

  a {
    color: $color-primary-purple;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover,
  a:active {
    color: $color-magenta;
  }

  p {
    margin: 0.5rem 0 0 0;
  }
</style>
