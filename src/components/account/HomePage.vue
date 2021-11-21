<template>
  <div>
    <b-row>
      <b-col cols="6">
        <div class="intro-content">
          <b-row>
            <b-col>
              <h3 class="welcome">
                Welcome to our Reading Comprehension
                <br />Web Application
                <br />
                <br />
              </h3>
              <p class="lead">{{getWelcomeMessage()}}</p>
            </b-col>
          </b-row>
        </div>
      </b-col>
      <b-col cols="6">
        <CreateAccount v-if="!loggedIn" />
        <StudentDetails :studentId="studentId" v-if="loggedIn" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import CreateAccount from './CreateAccount.vue';
import StudentDetails from './StudentDetails.vue';

export default {
  name: 'HomePage',
  components: {
    CreateAccount,
    StudentDetails,
  },
  created() {
    if (this.$session.get('studentId')) {
      this.studentId = this.$session.get('studentId');
      this.loggedIn = true;
    }
  },
  data() {
    return {
      studentId: null,
      loggedIn: false,
    };
  },

  methods: {
    ...mapActions(['getStudent']),
    getWelcomeMessage() {
      // eslint-disable-next-line max-len
      return 'Here, your current Reading Comprehension level will be measured as well as your Reading Fluency with the help of a Speech Recognition Software';
    },
  },
};
</script>

<style>
.intro-content {
  padding: 35px;
  border: 1px solid gray;
  height: 100%;
  min-height: 550px;
  font-family: "Lucida Console", "Courier New", monospace;
  background-color: #F6D4C5;
  border-radius: 25px;

}
.welcome {
font-family: 'Helvetica Neue', sans-serif; font-size: 35px; font-weight: bold; letter-spacing: 1px; color: #5D6D7E;
}
</style>
