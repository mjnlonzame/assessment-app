<template>
  <div>
    <b-row v-for="(answer, index) in answers" :key="answer.questionId" >
      <b-col sm="6">
        <label :for="`question-${index}`">
            {{answer.question}}
        </label>
      </b-col>
    <b-col sm="6">
        <b-form-input :id="`question-${index}`" v-model="answer.value"></b-form-input>
      </b-col>
    </b-row>
        <b-row>
      <b-col>
        <b-button size="lg" variant="primary" @click="onSubmitClick()">Submit</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'IdentificationForm',
  created() {
      this.questionAnswers.forEach((questionAnswer) => {
          const answer = {};
          answer.questionId = questionAnswer.question.id;
          answer.question = questionAnswer.question.value;
          answer.value = questionAnswer.value;
          this.answers.push(answer);
      });
  },
  props: {
    questionAnswers: {
      type: Array,
    },
  },
  data() {
    return {
        answers: [],
    };
  },
  computed: {
    ...mapState({
      task: (state) => state.task,
    }),
  },
  methods: {
    ...mapActions(['getTask']),
    onSubmitClick() {
       this.$emit('questionAnswersSubmitted', this.answers);
    },
  },
};
</script>

<style  scoped>
.task-button {
  margin: 0px 100px;
  padding: 10px 100px;
}
</style>
