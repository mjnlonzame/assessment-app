<template>
  <div v-if="task && assessment" class="questionnaire-container">
    <b-alert variant="danger" :show="failed">You have failed the test. Please retake.</b-alert>
    <div class="text-left">
      <h1>{{getTaskTypeName(task.taskType)}} {{this.part2}}</h1>
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
          :answersValidated="answersValidated"
          :assessmentCompleted="assessment.completed && task.taskType !== 'FINAL_ASSESSMENT'"
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
import TaskTypeMixin from '../../../shared/mixins/TaskTypeMixin.vue';

export default {
  name: 'TaskQuestionnaire',
  mixins: [TaskTypeMixin],
  created() {
    this.getAssessment(this.$session.get('studentId'));
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
      answersValidated: false,
      submitted: false,
    };
  },
  computed: {
    ...mapState({
      task: (state) => state.task,
      assessment: (state) => state.assessment,
    }),
    failed() {
      return !this.task.completed && this.submitted;
    },
    part2() {
      return this.task.taskType !== 'CONCEPTUALIZING' ? 'Part 2' : '';
    },
  },
  methods: {
    ...mapActions(['getTask', 'submitTaskPart2', 'getAssessment']),
    handleAnswersSubmitted(answers) {
      if (this.assessment.completed && this.task.taskType !== 'FINAL_ASSESSMENT') {
        this.answersValidated = true;
        return;
      }

      this.submitTaskPart2({ taskId: this.taskId, answers }).then((task) => {
        this.submitted = true;
        if (!task.completed) {
          return;
        }

        if (
          !this.$session.get('initTaskFinished')
          && task.taskType === 'INITIAL_ASSESSMENT'
          && task.completed
        ) {
          this.$session.set('initTaskFinished', true);
        }

        this.$router.push({
          name:
            task.taskType !== 'FINAL_ASSESSMENT' ? 'Tasks' : 'AssessmentResult',
          params: {
            taskId: this.taskId,
            assessmentId: this.assessmentId,
          },
        });
        // }
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
