<template>
  <div>
    <b-row v-for="(answer, index) in answers" :key="answer.questionId" class="question-content">
      <b-col sm="8" class="text-left">
        <label :for="`question-${index}`">{{ (index + 1) + ". " + answer.question}}</label>
      </b-col>
      <b-col cols="4">
        <b-form-input
          :id="`question-${index}`"
          v-model="answer.value"
          :class="{ hasErrors: $v.answers.$each[index].value.$error }"
          @blur="$v.answers.$each[index].value.$touch()"
          :state="answerState(index)"
        ></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button size="lg" variant="outline-primary" @click="onSubmitClick()">Submit</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'IdentificationForm',
  created() {
    this.questionAnswers.forEach((questionAnswer) => {
      const answer = {};
      answer.questionId = questionAnswer.question.id;
      answer.question = questionAnswer.question.value;
      answer.value = questionAnswer.value;
      // REFACTOR only once choice is available for identification
       answer.correctAnswers = questionAnswer.question.choices.map((choice) => choice.value);
      this.answers.push(answer);
    });
  },
  props: {
    questionAnswers: {
      type: Array,
    },
    submitted: Boolean,
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
    answerState(index) {
      const answer = this.answers[index];
      console.log(answer.value);
      if (!this.submitted || answer.value === '') return null;
      console.log(answer.value, answer.correctAnswers);
      return answer.correctAnswers.some((correctAnswer) => correctAnswer === answer.value);
    },
    onSubmitClick() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('questionAnswersSubmitted', this.answers);
      }
    },
  },
  validations: {
    answers: {
      $each: {
        value: { required },
      },
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
