<template>
  <div>
    <div v-if="!assessmentCompleted || answersHidden">
      <div
        v-for="(answer, index) in answers"
        :key="answer.questionId"
        class="question-content"
        :class="{ hasErrors: $v.answers.$each[index].value.$error }"
        @blur="$v.answers.$each[index].value.$touch()"
      >
        <b-form-group
          :label="`${index + 1}.  ${answer.question}`"
          class="text-left"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio-group
            :id="`question-${index}`"
            v-model="answer.value"
            :options="answer.choices"
            :aria-describedby="ariaDescribedby"
            :state="answerState(index)"
            :name="`question-${index}-options`"
            value-field="value"
            text-field="value"
          >
            <b-form-invalid-feedback :state="answerState(index)">Incorrect</b-form-invalid-feedback>
            <b-form-valid-feedback :state="answerState(index)">Correct</b-form-valid-feedback>
          </b-form-radio-group>
        </b-form-group>
      </div>
    </div>
    <div v-if="assessmentCompleted && !answersHidden">
      <div v-for="(answer, index) in answers" :key="answer.questionId" class="question-content">
        <b-form-group
          :label="`${index + 1}.  ${answer.question}`"
          class="text-left"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-radio-group
            :id="`question-${index}`"
            v-model="answer.correctChoices[0].value"
            :options="answer.choices"
            :aria-describedby="ariaDescribedby"
            :name="`question-${index}-options`"
            value-field="value"
            text-field="value"
          ></b-form-radio-group>
        </b-form-group>
      </div>
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
import ConfirmationModal from '../../../../shared/ConfirmationModal.vue';
import QuestionairreMixin from '../../../../shared/mixins/QuestionairreMixin.vue';
// import ErrorValidation from '../../../../shared/ErrorValidation.vue';

export default {
  name: 'ChoiceForm',
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
      choicesIdentifier: ['a', 'b', 'c', 'd', 'e'],
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
      return answer.correctChoices.some(
        (correctChoice) => correctChoice.value === answer.value,
      );
    },
    prepareQuestionAnswer(questionAnswer) {
        const answer = {};
        answer.questionId = questionAnswer.question.id;
        answer.question = questionAnswer.question.value;
        answer.choices = questionAnswer.question.choices;
        answer.correctChoices = questionAnswer.question.choices.filter(
          (choice) => choice.isCorrect,
        );
        answer.value = questionAnswer.value;
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

.question-content {
  height: 100%;
  border: 2px solid gray;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 100px;
}
</style>
