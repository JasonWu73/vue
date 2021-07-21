<template>
  <header>
    <nav>
      <h1><router-link to="/">Find a Coach</router-link></h1>
      <ul>
        <li><router-link to="/coaches">All Coaches</router-link></li>
        <li v-if="isLoggedIn"><router-link to="/requests">Requests</router-link></li>
        <li v-else><router-link to="/auth">Login</router-link></li>
        <li v-if="isLoggedIn"><base-button @click="logout">Logout</base-button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    computed: {
      isLoggedIn() {
        return this.$store.getters.isAuthenticated;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.replace('/coaches');
      }
    }
  };
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: 5rem;
    background-color: $color-primary-purple;
    display: flex;

    a {
      text-decoration: none;
      color: $color-pink;
      display: inline-block;
      padding: 0.75rem 1.5rem;
      border: 1px solid transparent;

      &:active,
      &:hover,
      a.router-link-active {
        border: 1px solid $color-pink;
      }
    }

    nav {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        margin: 0;

        a {
          background: url('../../assets/logo.png') left center/3rem 3rem no-repeat;
          padding-left: 4rem;
          color: white;
          margin: 0;

          &:hover,
          &:active,
          &.router-link-active {
            border-color: transparent;
          }
        }
      }

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        li {
          margin: 0 0.5rem;
        }
      }
    }
    }
</style>
