<template>
  <div v-if="assessmentResults.length > 0">
    <b-row>
      <b-col>
        <b-table
          striped
          hover
          :items="assessmentResults"
          :fields="fields"
          :fixed="true"
          responsive
          v-if="!isRetakenTasksShown"
        >
          <template #table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{ width:  ['birthDate', 'studentDto.schoolName']
              .includes(field.key ) ? '140px' : '180px' }"
            />
          </template>
          <template
            #cell(birthDate)="data"
          >{{ `${new Date(data.item.studentDto.birthDate).toISOString().slice(0, 10) }`}}</template>
          <template
            #cell(wpm)="data"
          >{{ `${data.item.initialReadingWPM.toFixed(1)} / ${data.item.finalReadingWPM.toFixed(1) }`}}</template>
          <template #cell(accuracy)="data">
            {{ `${data.item.initialReadingAccuracy.toFixed(1)}%
            / ${data.item.finalReadingAccuracy.toFixed(1)}%`}}
          </template>
          <template
            #cell(score)="data"
          >{{ `${data.item.initialScore.toFixed(1)}% / ${data.item.finalScore.toFixed(1)}%`}}</template>
          <template #cell(actions)="row">
            <b-button
              size="sm"
              @click="showRetakenTasks(row.item)"
              class="mr-1"
              :disabled="row.item.taskDtoList.length === 0"
            >Assessment Retakes</b-button>
          </template>
        </b-table>
        <retaken-tasks
          :tasks="this.retakenTasks"
          :studentName="this.selectedStudent"
          v-if="isRetakenTasksShown"
          :hasBackButton="true"
          @clickBack="onClickBack"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RetakenTasks from './RetakenTasks.vue';

export default {
  name: 'AssessmentReport',
  created() {
    this.getAssessmentResults();
  },
  components: {
    RetakenTasks,
  },
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      isRetakenTasksShown: false,
      retakenTasks: [],
      selectedStudent: '',
      fields: [
        {
          key: 'studentDto.fullName',
          sortable: true,
          label: 'Student Name',
          stickyColumn: true,
        },

        {
          key: 'birthDate',
          sortable: false,
          label: 'Date of Birth',
        },
        {
          key: 'studentDto.schoolName',
          sortable: false,
          label: 'School',
        },
        {
          key: 'studentDto.email',
          sortable: false,
          label: 'Email',
        },

        {
          key: 'wpm',
          sortable: false,
          label: 'Initial and Final WPM',
        },
        {
          key: 'accuracy',
          sortable: false,
          label: 'Initial and Final Accuracy',
        },
        {
          key: 'score',
          sortable: false,
          label: 'Initial and Final Questionnaire',
        },
        { key: 'actions', label: 'View' },
      ],
    };
  },
  methods: {
    ...mapActions(['getAssessmentResults']),
    showRetakenTasks(assessmentDto) {
      this.isRetakenTasksShown = true;
      this.retakenTasks = assessmentDto.taskDtoList;
      this.selectedStudent = assessmentDto.studentDto.fullName;
    },
    onClickBack() {
      this.isRetakenTasksShown = false;
    },
  },
  computed: {
    ...mapState({
      assessmentResults: (state) => state.assessmentResults,
    }),
  },
};
</script>
