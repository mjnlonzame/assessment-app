<template>
  <div v-if="task" class="story-container">
    <div class="text-left">
      <h1>{{getTaskTypeName(task.taskType)}} Part 1</h1>
    </div>
    <div>
      <p class="lead text-left">
        Read the '<em>{{task.story.title}}</em>' story below
      </p>
    </div>
    <b-row>
      <b-col>
        <b-form-textarea
          id="textarea"
          v-model="task.story.content"
          placeholder="Enter something..."
          size="lg"
          rows="15"
          no-resize
          readonly
        ></b-form-textarea>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <span v-if="task.readingScore">{{this.task.readingScore.toFixed(2)}}</span>
        <SpeechToText
          :text.sync="text"
          @speechend="onHandleSpeechEnd"
          @speechstart="onHandleSpeechStart"
        ></SpeechToText>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col">
        <b-button size="lg" variant="outline-success" v-if="passed" @click="onRetryClick">
          <b-icon icon="arrow-repeat"></b-icon>
        </b-button>
        <b-button size="lg" variant="outline-success" @click="onContinueClick()" :hidden="!passed">
          <b-icon icon="arrow-return-right"></b-icon>
        </b-button>

        <b-button
          size="lg"
          variant="outline-primary"
          @click="onSubmitClick()"
          :hidden="false"
          v-if=" !passed && this.sentences.length && !this.speaking"
        >Submit Reading</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SpeechToText from '../../../speech-to-text/SpeechToText.vue';
import TaskTypeMixin from '../../../shared/mixins/TaskTypeMixin.vue';

export default {
  name: 'TaskStory',
  mixins: [TaskTypeMixin],
  components: {
    SpeechToText,
  },
  created() {
    this.getTask(this.taskId);
    // generate new task if this.task is completed
  },
  props: {
    taskId: Number,
    assessmentId: Number,
    retake: Boolean,
  },
  data() {
    return {
      sentences: [],
      speaking: null,
      text: '',
      time: 0,
      interval: null,
    };
  },
  computed: {
    ...mapState({
      task: (state) => state.task,
    }),

    passed() {
      return this.task.readingResult && this.task.readingResult.passed;
    },
  },
  watch: {
    speaking(speaking) {
      if (!speaking) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.incrementTime, 1000);
      }
    },
  },
  methods: {
    ...mapActions(['getTask', 'submitTaskPart1']),
    onContinueClick() {
      if (this.task.readingResult.passed) {
        this.$router.push({
          name: 'TaskQuestionnaire',
          params: {
            taskId: this.taskId,
            assessmentId: this.assessmentId,
          },
        });
      }
    },

    onSubmitClick() {
      this.submitTaskPart1({
        taskId: this.taskId,
        readWords: this.sentences.join(''),
        time: this.time,
      });
    },
    onRetryClick() {
      this.sentences = [];
      this.task.readingResult = null;
      this.task.readingScore = null;
      this.time = 0;
      this.interval = null;
    },
    // eslint-disable-next-line no-unused-vars
    onHandleSpeechEnd({ sentences, text, speaking }) {
      this.sentences = sentences;
      this.speaking = speaking;
    },
    onHandleSpeechStart(speaking) {
      this.speaking = speaking;
    },
    incrementTime() {
      this.time += 1;
    },
  },
};
</script>

<style scoped>
.story-container {
  min-height: 600px;
}
</style>
