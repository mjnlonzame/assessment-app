<template>
  <div class="tasks-container">
    <b-container>
      <b-row v-for="(task, index) in tasks" :key="index" align-v="start">
        <b-col
          :class="{ 'text-right' : task.taskType === 'FINAL_ASSESSMENT' }"
          v-if="task.taskType !== 'INITIAL_ASSESSMENT'"
        >
          <b-button
            class="task-button"
            size="lg"
            :disabled="isDisabled(task)"
            variant="dark"
            @click="onTaskClick(task)"
          >{{getButtonText(task)}}</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Tasks',
  created() {
    this.getTasks(this.assessmentId);
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
  },
  methods: {
    ...mapActions(['getTasks']),
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
          ? 'Proceed here'
          : `Task ${task.number}`;
      return buttonText;
    },
    isDisabled(task) {
      if (task.taskType !== 'FINAL_ASSESSMENT') return task.completed;

      const areAllPriorTasksFinished = this.tasks
        .filter((currTask) => currTask.taskType !== 'FINAL_ASSESSMENT')
        .every((currTask) => currTask.completed);
      console.log('TASK NOT FINISH!!', areAllPriorTasksFinished);
      return !areAllPriorTasksFinished || task.completed;
    },
  },
};
</script>

<style  scoped>
.task-button {
  margin: 10px 100px;
  padding: 10px 100px;
  width: 40%;
}
.tasks-container {
  min-height : 500px;
}
</style>
