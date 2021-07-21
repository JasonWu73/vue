<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: firstName.invalid }">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      >
      <span class="message" v-if="firstName.invalid">First Name must not empty.</span>
    </div>
    <div class="form-control" :class="{ invalid: lastName.invalid }">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      >
      <span class="message" v-if="lastName.invalid">Last Name must not empty.</span>
    </div>
    <div class="form-control" :class="{ invalid: description.invalid }">
      <label for="description">Description</label>
      <textarea id="description"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <span class="message" v-if="description.invalid">Description must not empty.</span>
    </div>
    <div class="form-control" :class="{ invalid: rate.invalid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      >
      <span class="message" v-if="rate.invalid">Hourly Rate must greater than 0.</span>
    </div>
    <div class="form-control" :class="{ invalid: areas.invalid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        >
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        >
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        >
        <label for="career">Career Advisory</label>
      </div>
      <span class="message" v-if="areas.invalid">At least select one expertise.</span>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
  export default {
    emits: ['save-data'],
    data() {
      return {
        firstName: {
          val: '',
          invalid: false
        },
        lastName: {
          val: '',
          invalid: false
        },
        description: {
          val: '',
          invalid: false
        },
        rate: {
          val: null,
          invalid: false
        },
        areas: {
          val: [],
          invalid: false
        },
        formInvalid: false
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
        if (this.firstName.val === '') this.setInvalid('firstName');
        if (this.lastName.val === '') this.setInvalid('lastName');
        if (this.description.val === '') this.setInvalid('description');
        if (!this.rate.val || this.rate.val < 0) this.setInvalid('rate');
        if (this.areas.val.length === 0) this.setInvalid('areas');
      },
      submitForm() {
        this.validateForm();

        if (this.formInvalid) return;

        const formData = {
          first: this.firstName.val,
          last: this.lastName.val,
          desc: this.description.val,
          rate: this.rate.val,
          areas: this.areas.val
        };

        this.$emit('save-data', formData);
      }
    }
  };
</script>

<style lang="scss" scoped>
  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }
</style>
