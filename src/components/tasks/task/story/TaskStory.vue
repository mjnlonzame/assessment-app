<template>
  <div v-if="task">
    <b-card-title class="text-left">{{taskHeader}} Part 1</b-card-title>
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
        <SpeechToText :text.sync="text" @speechend="onHandleSpeechEnd"></SpeechToText>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="col">
        <b-button
          size="lg"
          variant="outline-success"
          v-if="task.hasPassedReading"
          @click="onRetryClick"
        >
          <b-icon icon="arrow-repeat"></b-icon>
        </b-button>
        <b-button
          size="lg"
          variant="outline-success"
          @click="onContinueClick()"
          :hidden="!task.hasPassedReading"
        >
          <b-icon icon="arrow-return-right"></b-icon>
        </b-button>

        <b-button
          size="lg"
          variant="outline-success"
          @click="onSubmitClick()"
          :hidden="false"
          v-if="!task.hasPassedReading && this.sentences && !this.speaking"
        >Submit Reading</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SpeechToText from '../../../speech-to-text/SpeechToText.vue';

export default {
  name: 'TaskStory',
  components: {
    SpeechToText,
  },
  created() {
    this.getTask(this.taskId);
  },
  props: {
    taskId: Number,
    assessmentId: String,
  },
  data() {
    return {
      sentences: null,
      speaking: null,
    };
  },
  computed: {
    ...mapState({
      task: (state) => state.task,
    }),
    taskHeader() {
      // eslint-disable-next-line no-nested-ternary
      return this.task.taskType === 'REGULAR' ? `Task ${this.task.number}` : this.task.taskType === 'INITIAL_ASSESSMENT' ? 'Initial Assessment Page' : 'Final Assessment Page';
    },
  },
  methods: {
    ...mapActions(['getTask', 'submitTaskPart1']),
    onContinueClick() {
      if (this.task.hasPassedReading) {
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
        readWords: this.sentences,
      }).then(() => {
        this.sentences = null;
      });
    },
    onRetryClick() {
      this.sentences = null;
      this.task.hasPassedReading = false;
      this.task.readingScore = null;
    },
    onHandleSpeechEnd({ sentences, text, speaking }) {
      console.log('text', text);
      console.log('sentences', sentences);
      this.sentences = sentences;
      this.speaking = speaking;
    },
  },
};
</script>
