<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
  export default {
    props: {
      mode: {
        type: String,
        required: false,
        default: null
      },
      link: {
        type: Boolean,
        required: false,
        default: false
      },
      to: {
        type: String,
        required: false,
        default: '/'
      }
    }
  };
</script>

<style lang="scss" scoped>
  button,
  a {
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    background-color: $color-purple;
    border: .1rem solid $color-purple;
    color: white;
    cursor: pointer;
    border-radius: 3rem;
    margin-right: 0.5rem;
    display: inline-block;

    &:hover,
    &:active {
      background-color: $color-purple-dark;
      border-color: $color-purple-dark;
    }
  }

  .flat {
    background-color: transparent;
    color: $color-purple;
    border: none;

    &:hover,
    &:active {
      background-color: $color-pink-pale;
    }
  }

  .outline {
    background-color: transparent;
    border-color: $color-purple-dark;
    color: $color-purple-dark;

    &:hover,
    &:active {
      background-color: $color-pink-pale;
    }
  }
</style>
