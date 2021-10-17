<template>
  <div v-if="task" class="questionnaire-container">
    <b-alert variant="success" :show="task.completed">You passed the exam</b-alert>
    <b-alert variant="danger" :show="!task.completed && submitted">You have failed the test</b-alert>
    <!-- <b-card-title class="text-left">{{taskHeader}} Part 2</b-card-title> -->
    <div class="text-left">
      <h1>{{taskHeader}} Part 2</h1>
    </div>
    <div>
      <p class="text-left h5">{{task.instruction}}</p>
    </div>
    <br />

    <b-row>
      <b-col>
        <component
          v-bind:is="component"
          :questionAnswers="task.questionAnswers"
          :submitted="submitted"
          @questionAnswersSubmitted="(questionAnswers) => handleAnswersSubmitted(questionAnswers)"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import IdentificationForm from './forms/IdentificationForm.vue';
import ChoiceForm from './forms/ChoiceForm.vue';
import SequenceForm from './forms/SequenceForm.vue';
import SummaryStoryForm from './forms/SummaryStoryForm.vue';

export default {
  name: 'TaskQuestionnaire',
  created() {
    this.getTask(this.taskId).then(() => {
      this.showComponent();
    });
  },
  components: {
    IdentificationForm,
    ChoiceForm,
    SequenceForm,
    SummaryStoryForm,
  },
  props: {
    assessmentId: String,
    taskId: Number,
  },
  data() {
    return {
      component: '',
      submitted: false,
    };
  },
  computed: {
    ...mapState({
      task: (state) => state.task,
    }),
    taskHeader() {
      // eslint-disable-next-line no-nested-ternary
      return this.task.taskType === 'REGULAR'
        ? `Task ${this.task.number}`
        : this.task.taskType === 'INITIAL_ASSESSMENT'
        ? 'Initial Assessment Page'
        : 'Final Assessment Page';
    },
  },
  methods: {
    ...mapActions(['getTask', 'submitTaskPart2']),
    handleAnswersSubmitted(answers) {
      this.submitTaskPart2({ taskId: this.taskId, answers }).then((task) => {
        this.submitted = true;
        if (task.completed) {
          if (
            !this.$session.get('initTaskFinished')
            && task.taskType === 'INITIAL_ASSESSMENT'
            && task.completed
          ) {
            this.$session.set('initTaskFinished', true);
          }

          this.$router.push({
            name:
              task.taskType !== 'FINAL_ASSESSMENT'
                ? 'Tasks'
                : 'AssessmentResult',
            params: {
              taskId: this.taskId,
              assessmentId: this.assessmentId,
            },
          });
        }
      });
    },
    showComponent() {
      const questionAnswer = this.task.questionAnswers[0];
      switch (questionAnswer.question.dtype) {
        case 'ChoiceQuestion':
          this.component = 'ChoiceForm';
          break;
        case 'IdentificationQuestion':
          this.component = 'IdentificationForm';
          break;
        case 'SequenceQuestion':
          this.component = 'SequenceForm';
          break;
        case 'SummaryQuestion':
          this.component = 'SummaryStoryForm';
          break;
        default:
          this.component = '';
      }
    },
  },
};
</script>

<style>
.task-button {
  margin: 0px 100px;
  padding: 10px 100px;
}

.questionnaire-container {
  min-height: 500px;
}

.question-content {
  margin: 5px 0px;
}
</style>
