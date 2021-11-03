<template>
  <div>
    <b-row>
      <b-col cols="6">
        <div class="intro-content">
          <b-row>
            <b-col>
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
      return 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio quo ab iusto dicta a, commodi deleniti aperiam itaque aspernatur odio possimus delectus quod maxime, quasi optio. Quis, itaque ipsam ex sunt at repellat pariatur maiores ullam quos beatae quae eveniet doloribus eius, quod molestias voluptatum delectus dolorum dignissimos esse laborum! Quam, voluptas. Molestiae voluptas ad aliquam architecto dolorem pariatur? Ipsum quo impedit aperiam corrupti dolores quaerat! Aut, minus quo! Facere molestiae reprehenderit temporibus in fugit dolor laudantium eaque nemo quasi dolores? Ratione corrupti magnam dolore enim dolor atque omnis tenetur, architecto deleniti eius. Voluptate amet nesciunt similique quod, tempora neque!';
    },
  },
};
</script>

<style>
.intro-content {
  padding: 15px;
  border: 1px solid gray;
  height: 100%;
  min-height: 550px;
}
</style>
