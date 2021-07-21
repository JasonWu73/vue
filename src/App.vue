<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
  import TheHeader from './components/layout/TheHeader';

  export default {
    components: { TheHeader },
    computed: {
      didAutoLogout() {
        return this.$store.getters.getAutoLogout;
      }
    },
    watch: {
      didAutoLogout(curAutoLogout, oldAutoLogout) {
        if (curAutoLogout && curAutoLogout !== oldAutoLogout)
          this.$router.replace('/coaches');
      }
    },
    created() {
      this.$store.dispatch('tryLogin');
    }
  };
</script>

<style lang="scss">
  @import url('./vendors/css/font-roboto.css');

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 10px / 16px * 100%;
  }

  body {
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    box-sizing: border-box;
  }

  h2, h3, h4 {
    margin-bottom: 3rem;
  }

  p {
    margin-top: 3rem;
  }

  .route-enter-from {
    opacity: 0;
    transform: translateY(-3rem);
  }

  .route-leave-to {
    opacity: 0;
    transform: translateY(3rem);
  }

  .route-enter-active {
    transition: all .3s ease-out;
  }

  .route-leave-active {
    transition: all .3s ease-in;
  }

  .route-enter-to,
  .route-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>
