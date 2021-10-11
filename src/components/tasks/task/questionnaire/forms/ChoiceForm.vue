<template>
  <div>
    <div v-for="(answer, index) in answers" :key="answer.questionId" class="question-content">
      <b-form-group :label="answer.question" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          :id="`question-${index}`"
          v-model="answer.value"
          :options="answer.choices"
          :aria-describedby="ariaDescribedby"
          :name="`question-${index}-options`"
        ></b-form-radio-group>
      </b-form-group>
    </div>
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
  name: 'ChoiceForm',
  created() {
    this.questionAnswers.forEach((questionAnswer) => {
      const answer = {};
      answer.questionId = questionAnswer.question.id;
      answer.question = questionAnswer.question.value;
      answer.choices = questionAnswer.question.choices.map((choice) => choice.value);
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

.question-content{
  height: 100%;
  border: 2px solid gray;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 100px
}
</style>
