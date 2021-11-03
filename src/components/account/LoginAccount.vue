s<template>
  <div class="login-container">
    <form novalidate @submit.prevent="onLoginClick">
      <b-row>
        <b-col cols="6" offset="3">
          <div class="form-group">
            <label for="username">Username</label>
            <b-form-input
              type="text"
              id="username"
              v-model="email"
              name="username"
              class="form-control"
              :class="{ hasErrors: $v.email.$error }"
              @blur="$v.email.$touch()"
              Î
            />
            <ErrorValidation
              :hasError="$v.email.$error &&
          !$v.email.required"
              errorMessage="Email is required"
            />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" offset="3">
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              name="password"
              class="form-control"
              :class="{ hasErrors: $v.password.$error }"
              @blur="$v.password.$touch()"
            />
            <ErrorValidation
              :hasError="$v.password.$error &&
          !$v.password.required"
              errorMessage="Password is required"
            />
          </div>
        </b-col>
      </b-row>
      <div class="form-group">
        <ErrorValidation
          :hasError="invalidCredentials"
          errorMessage="Email or Password is incorrect."
        />
        <button class="btn btn-outline-primary">Login</button>
        <!-- <router-link to="/account/create" class="btn btn-link">Sign up</router-link> -->
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import ErrorValidation from '../shared/ErrorValidation.vue';
import NextTaskMixin from '../shared/mixins/NextTaskMixin.vue';

export default {
  name: 'LoginAccount',
  components: {
    ErrorValidation,
  },
  mixins: [NextTaskMixin],
  data() {
    return {
      email: '',
      password: '',
      invalidCredentials: false,
    };
  },
  methods: {
    ...mapActions(['login']),
    onLoginClick() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.login({ email: this.email, password: this.password })
          .then((user) => {
            this.$session.start();
            if (user.admin) {
              console.log('admin user');
              this.$router.push('/report');
            } else {
              console.log('student', user);
              this.$session.set('studentId', user.student.id);
              this.goToNextTask(user.student.id);
            }
          })
          .catch(() => {
            this.invalidCredentials = true;
          });
      }
    },
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
};
</script>

<style  scoped>
.login-container {
  min-height: 300px !important;
}
</style>
