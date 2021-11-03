<template>
  <div v-if="tasks.length > 0  && this.assessment">
    <b-container>
      <div>
        <b-row>
          <b-col cols="6" offset="3">
            <div class="tasks-container">
              <b-row v-for="(task, index) in tasks" :key="index" align-v="start">
                <b-col v-if="isRegularTask(task.taskType)">
                  <b-button
                    class="task-button"
                    size="lg"
                    :disabled="isDisabled(task)"
                    variant="dark"
                    @click="onTaskClick(task)"
                  >{{getButtonText(task)}}</b-button>
                </b-col>
              </b-row>
            </div>
            <b-row>
              <b-col>
                <b-button
                  class="proceed-btn"
                  size="lg"
                  :disabled="isDisabled(getFinalTask)"
                  @click="onTaskClick(getFinalTask)"
                  pill
                  :hidden="isFinalTaskHidden"
                >{{getButtonText(getFinalTask)}}</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TaskTypeMixin from '../shared/mixins/TaskTypeMixin.vue';

export default {
  name: 'Tasks',
  mixins: [TaskTypeMixin],
  created() {
    this.getTasks(this.assessmentId);
    this.getAssessment(this.$session.get('studentId'));
  },

  props: {
    assessmentId: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks,
      assessment: (state) => state.assessment,
    }),
    getFinalTask() {
      return this.tasks.find((task) => task.taskType === 'FINAL_ASSESSMENT');
    },
    isFinalTaskHidden() {
      return this.assessment.completed;
    },
  },
  methods: {
    ...mapActions(['getTasks', 'getAssessment']),
    onTaskClick(task) {
      this.$router.push({
        name: task.number !== 3 ? 'TaskStory' : 'TaskQuestionnaire',
        params: {
          taskId: task.id,
          assessmentId: this.assessmentId,
        },
      });
    },
    getButtonText(task) {
      const buttonText = task.taskType === 'FINAL_ASSESSMENT'
          ? `Proceed to 
          Final Assessment`
          : `${this.getTaskTypeName(task.taskType)}`;
      return buttonText;
    },
    isDisabled(task) {
      if (this.assessment.completed) {
        return false;
      }
      if (task.taskType !== 'FINAL_ASSESSMENT') return task.completed;

      const areAllPriorTasksFinished = this.tasks
        .filter((currTask) => currTask.taskType !== 'FINAL_ASSESSMENT')
        .every((currTask) => currTask.completed);
      return !areAllPriorTasksFinished || task.completed;
    },
  },
};
</script>

<style  scoped>
.task-button {
  margin: 5px 10px;
  padding: 10px 50px;
  width: 80%;
  background-color: #455a64 !important;
}
.tasks-container {
  border: 1px solid gray;
  padding: 20px 20px;
  margin-bottom: 15px;
}

.proceed-btn {
  margin: 5px 10px;
  padding: 10px 50px;
  width: 60%;
  background-color: #f99363 !important;
}
</style>
