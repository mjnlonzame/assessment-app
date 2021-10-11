<template>
  <div>
    <b-row v-for="(answer, index) in answers" :key="answer.questionId">
      <b-col sm="6">
        <label :for="`question-${index}`">{{answer.question}}</label>
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
  name: 'SequenceForm',
  created() {
    const questionAnswer = this.questionAnswers[0];
    questionAnswer.question.choices.forEach((choice) => {
      const answer = {};
      answer.questionId = choice.id;
      answer.question = choice.value;
      answer.value = '';
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
      console.log(this.answers);
      const answers = [
        {
          questionId: this.task.questionAnswers[0].question.id,
          value: this.answers.map((answer) => answer.value).join(' '),
        },
      ];
      this.$emit('questionAnswersSubmitted', answers);
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
