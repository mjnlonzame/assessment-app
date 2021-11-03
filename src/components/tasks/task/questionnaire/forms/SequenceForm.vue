<template>
  <div>
    <div v-show="!assessmentCompleted || answersHidden">
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
    </div>
    <div v-show="assessmentCompleted && !answersHidden">
      <b-row v-for="(answer, index) in answers" :key="answer.questionId" class="question-content">
        <b-col sm="7" class="text-left" offset="1">
          <label :for="`question-${index}`">{{(index + 1) + ". " + answer.question}}</label>
        </b-col>
        <b-col sm="2" offset="*">
          <b-form-input
            :id="`question-${index}`"
            type="number"
            :value="answer.correctAnswer"
            :readonly="true"
          ></b-form-input>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col>
        <b-button
          size="lg"
          variant="outline-primary"
          v-b-modal.modal-1
          :hidden="!assessmentCompleted"
          @click="answersHidden = !answersHidden"
        >{{answersHidden ? 'Show Answers' : 'Hide Answers' }}</b-button>
        <b-button
          size="lg"
          variant="outline-primary"
          v-show="answersHidden"
          v-b-modal.modal-1
          @click="onSubmitClick"
        >Submit</b-button>
        <ConfirmationModal
          @clickedOk="() => handleClickedOk()"
          @openedModal="() => handleOpenedModal()"
          @closedModal="() => handleClosedMOdal()"
          :isVisible="isFormValid"
          :launchBtnName="'Submit'"
          :bodyText="'Do you want to submit your answer/s?'"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import QuestionairreMixin from '../../../../shared/mixins/QuestionairreMixin.vue';
import ConfirmationModal from '../../../../shared/ConfirmationModal.vue';

export default {
  name: 'SequenceForm',
  mixins: [QuestionairreMixin],
  components: {
    // ErrorValidation,
    ConfirmationModal,
  },
  created() {
    const questionAnswer = this.questionAnswers[0];
    questionAnswer.question.choices.forEach(this.prepareQuestionAnswer);
  },
  props: {
    questionAnswers: {
      type: Array,
    },
    assessmentCompleted: Boolean,
    answersValidated: Boolean,
  },
  data() {
    return {
      answers: [],
      answersHidden: true,
    };
  },
  computed: {
    ...mapState({
      task: (state) => state.task,
    }),
  },
  methods: {
    ...mapActions(['getTask']),
    prepareQuestionAnswer(questionAnswer) {
      const answer = {};
      answer.questionId = questionAnswer.id;
      answer.question = questionAnswer.value;
      answer.value = '';
      answer.correctAnswer = questionAnswer.sequenceOrder;
      this.answers.push(answer);
    },
    handleClickedOk() {
      const answers = [
        {
          questionId: this.task.questionAnswers[0].question.id,
          value: this.answers.map((answer) => answer.value).join(' '),
        },
      ];
      this.$emit('questionAnswersSubmitted', answers);
    },
    answerState(index) {
      const answer = this.answers[index];
      if (!this.answersValidated || answer.value === '') return null;
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
