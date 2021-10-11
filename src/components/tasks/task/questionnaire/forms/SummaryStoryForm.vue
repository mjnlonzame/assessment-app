<template>
  <div>
    <b-row>
      <b-col>
        <b-form-textarea
          :id="questionAnswers[0].question.id"
          v-model="questionAnswers[0].value"
          :placeholder="questionAnswers[0].question.value"
          size="lg"
          rows="10"
        ></b-form-textarea>
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
  created() {},
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
      const answers = [
        {
          questionId: this.questionAnswers[0].question.id,
          value: this.questionAnswers[0].value,
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
