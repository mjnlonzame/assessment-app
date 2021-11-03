<template>
  <div>
    <div v-show="!assessmentCompleted || answersHidden">
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
    </div>
    <div v-show="assessmentCompleted && !answersHidden">
      <b-row v-for="(answer, index) in answers" :key="answer.questionId" class="question-content">
        <b-col sm="8" class="text-left">
          <label :for="`question-${index}`">{{ (index + 1) + ". " + answer.question}}</label>
        </b-col>
        <b-col cols="4">
          <b-form-input
            :id="`question-${index}`"
            :value="correctAnswers(answer.correctAnswers)"
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
  name: 'IdentificationForm',
  mixins: [QuestionairreMixin],
  components: {
    // ErrorValidation,
    ConfirmationModal,
  },
  created() {
    this.questionAnswers.forEach(this.prepareQuestionAnswer);
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
    answerState(index) {
      const answer = this.answers[index];
      if (!this.answersValidated || answer.value === '') return null;
      return answer.correctAnswers.some(
        (correctAnswer) => correctAnswer === answer.value,
      );
    },
    correctAnswers(correctAnswers) {
      return correctAnswers.join(', ');
    },
    prepareQuestionAnswer(questionAnswer) {
      const answer = {};
      answer.questionId = questionAnswer.question.id;
      answer.question = questionAnswer.question.value;
      answer.value = questionAnswer.value;
      answer.correctAnswers = questionAnswer.question.choices.map(
        (choice) => choice.value,
      );
      this.answers.push(answer);
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
