<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: email.invalid }">
      <label for="email">Your E-Mail</label>
      <input type="email" id="email"
        v-model.trim="email.val"
        @blur="clearValidity('email')"
      >
      <span class="message" v-if="email.invalid">E-Mail not valid.</span>
    </div>
    <div class="form-control" :class="{ invalid: message.invalid }">
      <label for="message">Message</label>
      <textarea rows="5" id="message"
        v-model.trim="message.val"
        @blur="clearValidity('message')"
      ></textarea>
      <span class="message" v-if="message.invalid">Message must not empty.</span>
    </div>
    <div>
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        email: {
          val: '',
          invalid: false
        },
        message: {
          val: '',
          invalid: false
        },
        formInvalid: false
      };
    },
    methods: {
      clearValidity(key) {
        console.log('blur');
        this[key].invalid = false;
        this.formInvalid = false;
      },
      setInvalid(key) {
        this[key].invalid = true;
        this.formInvalid = true;
      },
      validateForm() {
        if (this.email.val === '' || !this.email.val.includes('@')) this.setInvalid('email');
        if (this.message.val === '') this.setInvalid('message');
      },
      submitForm() {
        this.validateForm();

        if (this.formInvalid) return;

        const formData = {
          coachId: this.$route.params.id,
          email: this.email.val,
          message: this.message.val
        };

        this.$store.dispatch('request/contactCoach', formData);
        this.$router.replace('/coaches');
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
