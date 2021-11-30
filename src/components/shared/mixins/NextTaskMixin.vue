<script>
import { mapActions } from 'vuex';

export default {

  data() {
    return {};
  },
  computed: {},
  methods: {
      ...mapActions(['getAssessment', 'getInitialTask']),
    goToNextTask(studentId) {
      this.getAssessment(studentId).then((assessment) => {
        if (assessment.completed) {
          this.$router.push({
            name: 'AssessmentResult',
            params: {
              studentId,
            },
          });
        } else {
          this.getInitialTask(assessment.id).then((task) => {
            this.$session.set('initTaskFinished', task.completed);
            if (task.completed) {
              this.$router.push({
                name: 'Tasks',
                params: {
                  assessmentId: assessment.id,
                },
              });
            } else {
              this.$router.push({
                name: 'TaskStory',
                params: {
                  taskId: task.id,
                  assessmentId: assessment.id,
                },
              });
            }
          });
        }
      });
    },
  },
};
</script>
