<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :class="area"
        :title="area"
      >{{ area }}</base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" link :to="coachContactLink">Contact</base-button>
      <base-button link :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
  export default {
    props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
    computed: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
      coachContactLink() {
        return `${this.$route.path}/${this.id}/contact`;
      },
      coachDetailsLink() {
        return `${this.$route.path}/${this.id}`;
      }
    }
  };
</script>

<style lang="scss" scoped>
  li {
    margin: 1rem 0;
    border: .1rem solid $color-grey-dark;
    border-radius: 1.2rem;
    padding: 1rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  div {
    margin: 0.5rem 0;
  }

  .actions {
    margin-top: 3rem;
    display: flex;
    justify-content: flex-end;
  }
</style>
