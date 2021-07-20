<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-Mail</label>
      <input type="email" id="email" v-model.trim="email">
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea rows="5" id="message" v-model.trim="message"></textarea>
    </div>
    <div class="form-control">
      <span class="errors" v-if="!formIsValid"
      >Email and Message both all must not empty.</span>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        message: '',
        formIsValid: true
      };
    },
    methods: {
      submitForm() {
        if (!this.email || !this.message) this.formIsValid = false;

        const formData = {
          coachId: this.$route.params.id,
          email: this.email,
          message: this.message
        };

        this.$store.dispatch('request/contactCoach', formData);
        this.$router.replace('/coaches');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @mixin input {
    display: block;
    width: 100%;
    font: inherit;
    border: .1rem solid $color-grey;
    padding: 0.15rem;

    &:focus {
      border-color: #3d008d;
      background-color: #faf6ff;
      outline: none;
    }
  }

  form {
    margin: 1rem;
    border: .1rem solid $color-grey;
    border-radius: 1.2rem;
    padding: 1rem;
  }

  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  input {
    @include input;
  }

  textarea {
    @include input;
  }

  .errors {
    font-weight: bold;
    color: red;
  }

  .actions {
    text-align: center;
  }
</style>
