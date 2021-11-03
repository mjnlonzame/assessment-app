<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    getTaskTypeName(taskType) {
      let taskTypeName;
      switch (taskType) {
        case 'INITIAL_ASSESSMENT':
          taskTypeName = 'Initial Assessment';
          break;
        case 'CONSTRUCTION':
          taskTypeName = 'Construction and Cohesion';
          break;
        case 'SUMMARIZATION':
          taskTypeName = 'Summarization of Story';
          break;
        case 'CONCEPTUALIZING':
          taskTypeName = 'Conceptualizing';
          break;
        case 'SEQUENCING':
          taskTypeName = 'Sequencing';
          break;
        default:
          taskTypeName = 'Final Assessment';
          break;
      }
      return taskTypeName;
    },
    isRegularTask(taskType) {
      return (
        taskType !== 'INITIAL_ASSESSMENT' && taskType !== 'FINAL_ASSESSMENT'
      );
    },
    getTaskHeader() {
      // eslint-disable-next-line no-nested-ternary
      return this.task.taskType === 'REGULAR'
        ? `Task ${this.task.number}`
        : this.task.taskType === 'INITIAL_ASSESSMENT'
        ? 'Initial Assessment Page'
        : 'Final Assessment Page';
    },
  },
};
</script>
