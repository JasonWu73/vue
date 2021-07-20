<template>
  <div>
    <base-dialog :show="!!error" :title="'An error occurred!'"
      @close="handleError"
    >
      {{ error }}
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <base-card>
      <section>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/register" v-if="!isCoach">Register as Coach</base-button>
        </div>
      </section>
      <section>
        <base-spinner v-if="loading"></base-spinner>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
      </section>
    </base-card>
  </div>
</template>

<script>
  import CoachItem from '../../components/coaches/CoachItem.vue';
  import CoachFilter from '../../components/coaches/CoachFilter.vue';

  export default {
    components: { CoachItem, CoachFilter },
    data() {
      return {
        loading: false,
        error: null,
        activeFilters: {
          frontend: true,
          backend: true,
          career: true
        }
      }
    },
    computed: {
      filteredCoaches() {
        const coaches = this.$store.getters['coach/coaches'];
        return coaches.filter(coach => {
          if (this.activeFilters.frontend && coach.areas.includes('frontend'))
            return true;
          if (this.activeFilters.backend && coach.areas.includes('backend'))
            return true;
          if (this.activeFilters.career && coach.areas.includes('career'))
            return true;

          return false;
        });
      },
      hasCoaches() {
        return this.$store.getters['coach/hasCoaches'];
      },
      isCoach() {
        return this.loading || this.$store.getters['coach/isCoach'];
      }
    },
    created() {
      this.loadCoaches();
    },
    methods: {
      setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
      },
      async loadCoaches(forceUpdate=false) {
        this.loading = true;
        try {
          await this.$store.dispatch('coach/loadCoaches', { forceUpdate });
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
  ul {
    list-style: none;
  }

  .controls {
    display: flex;
    justify-content: space-between;
  }
</style>
