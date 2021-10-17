<template>
  <div>
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
          :name="`question-${index}-options`"
        ></b-form-radio-group>
      </b-form-group>
      <!-- <ErrorValidation
        :hasError="$v.answers.$each[index].value.$error"
        errorMessage="Email is required"
      />-->
    </div>
    <b-row>
      <b-col>
        <b-button size="lg" variant="primary" @click="onSubmitClick()">Submit</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// minLength
import { mapState, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
// import ErrorValidation from '../../../../shared/ErrorValidation.vue';

export default {
  name: 'ChoiceForm',
  components: {
    // ErrorValidation,
  },
  created() {
    this.questionAnswers.forEach((questionAnswer) => {
      const answer = {};
      answer.questionId = questionAnswer.question.id;
      answer.question = questionAnswer.question.value;
      answer.choices = questionAnswer.question.choices.map(
        (choice) => choice.value,
      );
      answer.value = questionAnswer.value;
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
      choicesIdentifier: ['a', 'b', 'c', 'd', 'e'],
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

.question-content {
  height: 100%;
  border: 2px solid gray;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 100px;
}
</style>
