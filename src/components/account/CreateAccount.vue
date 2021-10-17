<template>
  <div>
    <b-row>
      <b-col cols="4">
        <div class="intro-content">
          <b-row>
            <b-col>
              <p class="lead">Introduction about the website</p>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="8">
        <form novalidate>
          <b-row class="form-group">
            <b-col cols="8">
              <input
                type="text"
                class="form-control"
                placeholder="*First Name"
                id="firstName"
                v-model="student.firstName"
                :class="{ hasErrors: $v.student.firstName.$error }"
                @blur="$v.student.firstName.$touch()"
              />
            </b-col>

            <b-col cols="4">
              <ErrorValidation
                :hasError="$v.student.firstName.$error &&
          !$v.student.firstName.required"
                errorMessage="First name is required"
              />
            </b-col>
          </b-row>
          <b-row class="form-group row">
            <b-col cols="8">
              <input
                type="text"
                class="form-control"
                placeholder="*Last Name"
                id="lastName"
                v-model="student.lastName"
                :class="{ hasErrors: $v.student.lastName.$error }"
                @blur="$v.student.lastName.$touch()"
              />
            </b-col>
            <b-col cols="4">
              <ErrorValidation
                :hasError="$v.student.lastName.$error &&
          !$v.student.lastName.required"
                errorMessage="Last name is required"
              />
            </b-col>
          </b-row>

          <b-row class="form-group row">
            <!-- @context="onContext" -->
            <b-col cols="8">
              <b-form-datepicker
                id="birthDate"
                v-model="student.birthDate"
                format="MM-DD-YYYY"
                class="mb-2"
                placeholder="*Date of Birth"
                autocomplete="off"
                :value-as-date="true"
              ></b-form-datepicker>
            </b-col>
            <b-col cols="4">
              <ErrorValidation
                :hasError="$v.student.birthDate.$error &&
          !$v.student.birthDate.required"
                errorMessage="Birth date is required"
              />
            </b-col>
          </b-row>

          <b-row class="form-group">
            <b-col cols="8">
              <input
                type="text"
                class="form-control"
                placeholder="*School Currently Attending"
                id="school"
                v-model="student.schoolName"
                :class="{ hasErrors: $v.student.schoolName.$error }"
                @blur="$v.student.schoolName.$touch()"
              />
            </b-col>
            <b-col cols="4">
              <ErrorValidation
                :hasError="$v.student.schoolName.$error &&
          !$v.student.schoolName.required"
                errorMessage="School name is required"
              />
            </b-col>
          </b-row>

          <b-row class="form-group">
            <b-col cols="8">
              <input
                type="text"
                class="form-control"
                placeholder="*Email"
                id="email"
                v-model="student.email"
                :class="{ hasErrors: $v.student.email.$error }"
                @blur="$v.student.email.$touch()"
              />
            </b-col>
            <b-col cols="4">
              <ErrorValidation
                :hasError="$v.student.email.$error &&
          !$v.student.email.required"
                errorMessage="Email is required"
              />
              <ErrorValidation
                :hasError="$v.student.email.$error &&
          !$v.student.email.email"
                errorMessage="Must be a valid email"
              />
            </b-col>
          </b-row>
          <b-row class="form-group">
            <b-col cols="8">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="*Password"
                v-model="student.password"
                :class="{ hasErrors: $v.student.password.$error }"
                @blur="$v.student.password.$touch()"
              />
            </b-col>

            <b-col cols="4">
              <ErrorValidation
                :hasError="$v.student.password.$error &&
          !$v.student.password.required"
                errorMessage="Password is required"
              />
              <ErrorValidation
                :hasError="$v.student.password.$error &&
          !$v.student.password.minLength"
                errorMessage="Enter a password that is at least 6 letters long"
              />
            </b-col>
          </b-row>
          <b-row class="row">
            <b-col cols="8" class=" text-center">
              <button class="btn btn-primary" @click.prevent="onRegisterClick">Register</button>
            </b-col>
          </b-row>
          <br>
          <b-row class="row">
            <b-col cols="4" >
              <span>Have an account?</span>
            </b-col>
            <b-col cols="1" class="text-center" offset="*">
              <router-link to="/login" class="btn btn-primary">Login</router-link>
              <!-- <button class="btn btn-primary" @click.prevent="onLoginClick">Login</button> -->
            </b-col>
          </b-row>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';
import ErrorValidation from '../shared/ErrorValidation.vue';

export default {
  name: 'CreateAccount',
  components: {
    ErrorValidation,
  },
  mixins: [],
  data() {
    return {
      student: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        schoolName: '',
        birthDate: 'dasda',
      },
      // formatted: '',
      // selected: '',
    };
  },
  created() {},
  methods: {
    ...mapActions(['register', 'getInitialTask', 'getAssessment']),
    onRegisterClick() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.register(this.student).then((student) => {
          this.getAssessment(student.id).then((assessment) => {
            this.getInitialTask(assessment.id).then((task) => {
              this.$router.push({
                name: 'TaskStory',
                params: {
                  taskId: task.id,
                  assessmentId: assessment.id,
                },
              });
            });
          });
        });
      }
    },
    onLoginClick() {
      this.$router.push({
        name: 'LoginAccount',
      });
    },
    // onContext(ctx) {
    //   console.log('date', ctx);
    //   // The date formatted in the locale, or the `label-no-date-selected` string
    //   this.formatted = ctx.selectedFormatted;
    //   // The following will be an empty string until a valid date is entered
    //   this.selected = ctx.selectedYMD;
    // },
  },
  computed: {
    ...mapState({
      assessmentResult: (state) => state.student,
    }),
  },
  validations: {
    student: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      schoolName: { required },
      birthDate: { required },
    },
  },
};
</script>

<style  scoped>
.intro-content {
  padding: 15px;
  border: 1px solid gray;
  height: 100%;
}

</style>
