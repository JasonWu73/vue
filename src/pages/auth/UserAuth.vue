<template>
  <div>
    <base-dialog :show="!!error" title="'An error occurred!'"
      @close="handleError"
    >
      {{ error }}
    </base-dialog>
    <base-dialog :show="loading" fixed title="Authenticating">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: email.invalid }">
          <label for="email">E-Mail</label>
          <input type="text" id="email"
            v-model.trim="email.val"
            @blur="clearValidity('email')"
          >
          <span class="message" v-if="email.invalid">E-Mail not valid.</span>
        </div>
        <div class="form-control" :class="{ invalid: password.invalid }">
          <label for="password">Password</label>
          <input type="password" id="password"
            v-model.trim="password.val"
            @blur="clearValidity('password')"
          >
          <span class="message" v-if="password.invalid">Password must have 6 characters.</span>
        </div>
        <base-button>Login</base-button>
        <base-button type="button" mode="flat" @click="submitForm('signUp')">
          Sign Up
        </base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
  import axiosUtils from '../../utils/axiosUtils.js';

  export default {
    data() {
      return {
        email: {
          val: '',
          invalid: false
        },
        password: {
          val: '',
          invalid: false
        },
        formInvalid: false,
        loading: false,
        error: null,
        mode: 'login'
      };
    },
    methods: {
      clearValidity(key) {
        this[key].invalid = false;
        this.formInvalid = false;
      },
      setInvalid(key) {
        this[key].invalid = true;
        this.formInvalid = true;
      },
      validateForm() {
        if (this.email.val === '' || !this.email.val.includes('@'))
          this.setInvalid('email');
        if (this.password.val.length < 6) this.setInvalid('password');
      },
      async submitForm(type) {
        this.validateForm();

        if (this.formInvalid) return;

        this.loading = true;

        try {
          const params = {
            email: this.email.val,
            password: this.password.val
          };

          if (type === 'signUp') {
            await this.$store.dispatch('signUp', params);
          } else {
            await this.$store.dispatch('login', params);
          }
        } catch (error) {
          this.error = axiosUtils.handleError(error);
        }

        this.loading = false;

        if (!this.error) {
          const redirect = `/${this.$route.query.redirect || 'coaches'}`;
          this.$router.replace(redirect);
        }
      },
      handleError() {
        this.error = null;
      }
    }
  };
</script>

<style scoped>

</style>
