<template>
  <div>
    <h3>Register as a Coach</h3>
    <base-card>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </div>
</template>

<script>
  import CoachForm from '../../components/coaches/CoachForm.vue';

  export default {
    components: { CoachForm },
    methods: {
      saveData(formData) {
        this.$store.dispatch('coach/registerCoach', formData);
        this.$router.replace('/coaches');
      }
    }
  };
</script>

<style scoped>
  h3 {
    text-align: center;
    margin-top: 1.5rem;
  }
</style>
