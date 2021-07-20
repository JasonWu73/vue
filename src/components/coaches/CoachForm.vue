<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: firstName.isInvalid }">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      >
      <span class="message" v-if="firstName.isInvalid">First Name must not empty.</span>
    </div>
    <div class="form-control" :class="{ invalid: lastName.isInvalid }">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      >
      <p class="message" v-if="lastName.isInvalid">Last Name must not empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: description.isInvalid }">
      <label for="description">Description</label>
      <textarea id="description"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p class="message" v-if="description.isInvalid">Description must not empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: rate.isInvalid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      >
      <p class="message" v-if="rate.isInvalid">Hourly Rate must greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: areas.isInvalid }">
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
      <p class="message" v-if="areas.isInvalid">At least select one expertise.</p>
    </div>
    <p class="message" v-if="isFormInvalid"
    >Please fixed above errors, then click register again.</p>
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
          isInvalid: false
        },
        lastName: {
          val: '',
          isInvalid: false
        },
        description: {
          val: '',
          isInvalid: false
        },
        rate: {
          val: null,
          isInvalid: false
        },
        areas: {
          val: [],
          isInvalid: false
        },
        isFormInvalid: false
      };
    },
    methods: {
      clearValidity(filed) {
       this[filed].isInvalid = false;
       this.isFormInvalid = false;
      },
      validateForm() {
        const setInvalid = field => {
          field.isInvalid = true;
          this.isFormInvalid = true;
        };

        if (this.firstName.val === '') setInvalid(this.firstName);
        if (this.lastName.val === '') setInvalid(this.lastName);
        if (this.description.val === '') setInvalid(this.description);
        if (!this.rate.val || this.rate.val < 0) setInvalid(this.rate);
        if (this.areas.val.length === 0) setInvalid(this.areas);
      },
      submitForm() {
        this.validateForm();

        if (this.isFormInvalid) return;

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
  @mixin input {
    display: block;
    width: 100%;
    border: 1px solid $color-grey;
    font: inherit;

    &:focus {
      background-color: $color-purple-pale;
      outline: none;
      border-color: $color-primary-purple;
    }
  }

  .form-control {
    margin: 0.5rem 0;
  }

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    @include input;

    &[type='checkbox'] {
      display: inline;
      width: auto;
      border: none;
    }

    &[type='checkbox']:focus {
      outline: $color-primary-purple solid 1px;
    }

    &[type='checkbox'] + label {
      font-weight: normal;
      display: inline;
      margin: 0 0 0 0.5rem;
    }
  }

  textarea {
    @include input;

    max-width: 100%;
  }

  h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
  }

  .invalid {

    label {
      color: red;
    }

    input {
      border: 1px solid red;
    }

    textarea {
      border: 1px solid red;
    }

    .message {
      color: red;
    }
  }
</style>
