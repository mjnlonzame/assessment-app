<template>
  <div v-if="tasks.length > 0">
    <div class="row" v-if="hasBackButton">
      <div class="col text-left">
        <a @click="back">&laquo; Back</a>
      </div>
    </div>
    <h3>Retakes of Assessment</h3>
    <b-table striped hover :items="tasks" :fields="fields" :fixed="true" responsive>
      <template #cell(readingWPM)="data">{{ `${data.item.readingWPM.toFixed(1)}%`}}</template>
      <template #cell(readingAccuracy)="data">{{ `${data.item.readingAccuracy.toFixed(1)}%`}}</template>
      <template #cell(score)="data">{{ `${data.item.score.toFixed(1)}%`}}</template>
      <template #cell(actions)="row">
        <a
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >Final Assessment Retakes</a>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RetakenTasks',
  props: {
    tasks: Array,
    hasBackButton: Boolean,
  },
  created() {
    console.log('tasks', this.tasks);
  },

  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: 'retakeNumber',
          sortable: true,
          label: 'Retake number',
          stickyColumn: true,
        },

        {
          key: 'readingWPM',
          sortable: false,
          label: 'WPM',
        },
        {
          key: 'readingAccuracy',
          sortable: false,
          label: 'Accuracy',
        },
        {
          key: 'score',
          sortable: false,
          label: 'Score',
        },
      ],
    };
  },
  methods: {
    ...mapActions(['getAssessmentResults']),
    back() {
      this.$emit('clickBack');
    },
  },
  computed: {
    ...mapState({
      assessmentResults: (state) => state.assessmentResults,
    }),
  },
};
</script>
