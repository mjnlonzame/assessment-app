<template>
  <div v-if="studentDetails">
    <b-row>
      <b-col>
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="First Name:"
          label-for="firstName"
        >
          <b-form-input
            type="text"
            id="firstName"
            v-model="studentDetails.firstName"
            name="firstName"
            class="form-control"
            readonly
            disabled
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Last Name:"
          label-for="lastName"
        >
          <b-form-input
            type="text"
            id="lastName"
            v-model="studentDetails.lastName"
            name="lastName"
            class="form-control"
            readonly
            disabled
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Birth Date:"
          label-for="birthDate"
        >
          <b-form-datepicker
            id="birthDate"
            v-model="studentDetails.birthDate"
            format="MM-DD-YYYY"
            class="mb-2"
            :date-format-options="{ year: 'numeric', month: 'short', day: '2-digit'}"
            autocomplete="off"
            readonly
            disabled
            :value-as-date="true"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="School Name:"
          label-for="schoolName"
        >
          <b-form-input
            type="text"
            id="schoolName"
            v-model="studentDetails.schoolName"
            name="schoolName"
            class="form-control"
            readonly
            disabled
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Email:"
          label-for="email"
        >
          <b-form-input
            type="text"
            id="email"
            v-model="studentDetails.email"
            name="email"
            class="form-control"
            readonly
            disabled
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="row">
      <b-col cols="3" class="text-center" offset="7">
        <button class="btn btn-outline-primary" @click.prevent="onNextTaskClick">Go to Task</button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NextTaskMixin from '../shared/mixins/NextTaskMixin.vue';

export default {
  name: 'StudentDetails',
  mixins: [NextTaskMixin],
  created() {
    this.getStudentDetails(this.studentId);
  },
  data() {
    return {};
  },
  props: {
    studentId: Number,
  },
  computed: {
    ...mapGetters(['studentDetails']),
  },
  methods: {
    ...mapActions(['getStudentDetails']),
    onNextTaskClick() {
      this.goToNextTask(this.studentId);
    },
  },
};
</script>
