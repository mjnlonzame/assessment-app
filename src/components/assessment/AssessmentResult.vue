<template>
  <div class="result-content">
    <div class="score-content text-left">
      <b-row>
        <b-col cols="3">
          <span class="h6">Rating: {{ assessmentResult.ratingScale }}</span>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col cols="5" offset="3"><span class="h6">Part 1 Story Reading</span></b-col>
    </b-row>

    <div class="score-content">
      <b-row>
        <b-col cols="3" offset="1">Initial score: {{ assessmentResult.initialReadingScore }}%</b-col>
        <b-col cols="3" offset="*">Final score: {{ assessmentResult.finalReadingScore }}%</b-col>
        <b-col cols="3" offset="*">Score Improvement: {{ this.initialReadingScoreDifference }}%</b-col>
      </b-row>
    </div>

    <b-row>
      <b-col cols="5" offset="3"><span class="h6">Part 2 Questionnaire</span></b-col>
    </b-row>
    <div class="score-content">
      <b-row>
        <b-col cols="3" offset="1">Initial score: {{ assessmentResult.initialScore }}%</b-col>
        <b-col cols="3" offset="*">Final score: {{ assessmentResult.finalScore }}%</b-col>
        <b-col cols="3" offset="*">Score Improvement: {{ this.finalScoreDifference }}%</b-col>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AssessmentResult',
  created() {
    this.getAssessmentResult(this.assessmentId);
  },
  props: {
    assessmentId: Number,
  },
  methods: {
    ...mapActions(['getAssessmentResult']),
  },

  computed: {
    ...mapState({
      assessmentResult: (state) => state.assessmentResult,
    }),
    initialReadingScoreDifference() {
      return (
        this.assessmentResult.finalReadingScore
        - this.assessmentResult.initialReadingScore
      );
    },
    finalScoreDifference() {
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
