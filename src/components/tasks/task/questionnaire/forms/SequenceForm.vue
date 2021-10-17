<template>
  <div>
    <b-row v-for="(answer, index) in answers" :key="answer.questionId" class="question-content">
      <b-col sm="7" class="text-left" offset="1">
        <label :for="`question-${index}`">{{(index + 1) + ". " + answer.question}}</label>
      </b-col>
      <b-col sm="2" offset="*">
        <b-form-input
          :id="`question-${index}`"
          type="number"
          v-model="answer.value"
          :class="{ hasErrors: $v.answers.$each[index].value.$error }"
          :state="answerState(index)"
          @blur="$v.answers.$each[index].value.$touch()"
        ></b-form-input>
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
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'SequenceForm',
  created() {
    const questionAnswer = this.questionAnswers[0];
    questionAnswer.question.choices.forEach((choice) => {
      const answer = {};
      answer.questionId = choice.id;
      answer.question = choice.value;
      answer.value = '';
      answer.correctAnswer = choice.sequenceOrder;
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

    onSubmitClick() {
      console.log(this.answers);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const answers = [
          {
            questionId: this.task.questionAnswers[0].question.id,
            value: this.answers.map((answer) => answer.value).join(' '),
          },
        ];
        this.$emit('questionAnswersSubmitted', answers);
      }
    },
    answerState(index) {
      const answer = this.answers[index];
      if (!this.submitted || answer.value === '') return null;
      console.log(answer.value, answer.correctAnswer);
      return Number(answer.value) === answer.correctAnswer;
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
