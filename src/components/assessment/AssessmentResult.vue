<template>
  <div class="result-content" v-if="assessmentResult">
    <div class="score-content text-left">
      <b-row>
        <b-col cols="3">
          <span class="h6">Rating: {{ assessmentResult.ratingScale }}</span>
        </b-col>
        <b-col offset="6">
          <button class="btn btn-outline-primary" @click.prevent="onTasksClick">Practice Tasks</button>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col cols="5" offset="3">
        <span class="h6">Story Reading</span>
      </b-col>
    </b-row>

    <div class="score-content text-left">
      <b-row>
        <b-col cols="3" offset="1">Initial WPM: {{ assessmentResult.initialReadingWPM.toFixed(2) }}</b-col>
        <b-col cols="3" offset="*">Final WPM: {{ assessmentResult.finalReadingWPM.toFixed(2) }}</b-col>
        <b-col cols="3" offset="*">WPM Improvement: {{ this.readingWPMImprovement.toFixed(2) }}</b-col>
      </b-row>
      <b-row>
        <b-col
          cols="3"
          offset="1"
        >Initial Accuracy: {{ assessmentResult.initialReadingAccuracy.toFixed(2) }}</b-col>
        <b-col
          cols="3"
          offset="*"
        >Final Accuracy: {{ assessmentResult.finalReadingAccuracy.toFixed(2) }}</b-col>
        <b-col
          cols="3"
          offset="*"
        >Accuracy Improvement: {{ this.readingAccuracyImprovement.toFixed(2) }}</b-col>
      </b-row>
    </div>

    <b-row>
      <b-col cols="5" offset="3">
        <span class="h6">Questionnaire</span>
      </b-col>
    </b-row>
    <div class="score-content text-left">
      <b-row>
        <b-col cols="3" offset="1">Initial score: {{ assessmentResult.initialScore.toFixed(2) }}%</b-col>
        <b-col cols="3" offset="*">Final score: {{ assessmentResult.finalScore.toFixed(2) }}%</b-col>
        <b-col cols="3" offset="*">Score Improvement: {{ this.scoreImprovement.toFixed(2) }}%</b-col>
      </b-row>
    </div>

    <div class="tip-title text-left">
      <b-row>
        <b-col>
          <span class="h6">Tip to improve reading comprehension:</span>
          {{ assessmentResult.tip.name }}
        </b-col>
      </b-row>
    </div>
    <div class="tip-content">
      <b-row>
        <b-col cols="10" offset="1">
          <p class="lead">{{assessmentResult.tip.details }}</p>
        </b-col>
      </b-row>
    </div>
    <div>
      <retaken-tasks
        :tasks="assessmentResult.taskDtoList"
        :hasBackButton="false"
        v-if="true"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import RetakenTasks from './RetakenTasks.vue';

export default {
  name: 'AssessmentResult',
  created() {
    this.getAssessmentResult(this.$session.get('studentId'));
  },
  components: {
    RetakenTasks,
  },
  props: {
    studentId: Number,
  },
  methods: {
    ...mapActions(['getAssessmentResult']),
    onTasksClick() {
      this.$router.push({
        name: 'Tasks',
        params: {
          assessmentId: this.assessmentResult.assessmentId,
        },
      });
    },
  },

  computed: {
    ...mapState({
      assessmentResult: (state) => state.assessmentResult,
    }),
    readingWPMImprovement() {
      return (
        this.assessmentResult.finalReadingWPM
        - this.assessmentResult.initialReadingWPM
      );
    },
    readingAccuracyImprovement() {
      return (
        this.assessmentResult.finalReadingAccuracy
        - this.assessmentResult.initialReadingAccuracy
      );
    },
    scoreImprovement() {
      return (
        this.assessmentResult.finalScore - this.assessmentResult.initialScore
      );
    },
  },
};
</script>

<style scoped>
.score-content {
  margin: 20px 10px 40px 10px;
  padding: 10px;
}

.tip-content {
  margin: 10px;
  padding: 10px;
  background-color: #f6d4c5;
}

.tip-title {
  margin: 10px 10px;
  padding: 10px;
}

.result-content {
  height: 100%;
  border: 2px solid gray;
  border-radius: 8px;
  padding: 10px;
  margin: 10px 10px;
  min-height: 650px;
}
</style>
