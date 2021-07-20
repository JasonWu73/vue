<template>
  <section>
    <base-dialog :show="!!error" :title="'An error occurred!'"
      @close="handleError"
    >
      {{ error }}
    </base-dialog>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <base-spinner v-if="loading"></base-spinner>
      <ul v-else-if="hasRequests">
        <requests-item
          v-for="req in requests"
          :key="req.id"
          :email="req.email"
          :message="req.message"
        ></requests-item>
      </ul>
      <h3 v-else>You haven't received nay requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
  import RequestsItem from '../../components/requests/RequestsItem.vue';

  export default {
    components: { RequestsItem },
    data() {
      return {
        loading: false,
        error: null
      };
    },
    computed: {
      requests() {
        return this.$store.getters['request/requests'];
      },
      hasRequests() {
        return this.$store.getters['request/hasRequests'];
      }
    },
    created() {
      this.fetchRequests();
    },
    methods: {
      async fetchRequests() {
        this.loading = true;
        try {
          await this.$store.dispatch('request/fetchRequests');
        } catch (error) {
          this.error = error.message;
        }
        this.loading = false;
      },
      handleError() {
        this.error = null;
      }
    }
  };
</script>

<style lang="scss" scoped>
  header {
    text-align: center;
  }

  ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  h3 {
    text-align: center;
  }
</style>
