<template>
  <div>
    <span>{{toggle ? 'Stop' : 'Start'}} Reading</span>
    <b-button
      variant="light"
      class="rounded-circle px-2"

      :color="!toggle ? 'grey' : (speaking ? 'red' : 'red darken-3')"
      @click.stop="toggle ? endSpeechRecognition() : startSpeechRecognition()"
    >
      <b-icon
      :icon="toggle ? 'mic-mute' : 'mic'"
       font-scale="1"
       :variant="toggle ? 'danger' : 'secondary'"
       :animation="toggle ? 'fade' : ''">
      </b-icon>
    </b-button>
  </div>

</template>

<script>
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : false;
export default {
  name: 'SpeechToText',
  props: {
    lang: {
      type: String,
      default: 'en-US',
    },
    text: {
      type: [String, null],
      required: true,
    },
  },
  created() {
    recognition.addEventListener('speechstart', () => {
      this.speaking = true;
    });

    recognition.addEventListener('speechend', () => {
      this.speaking = false;
    });

    recognition.addEventListener('result', (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');
      this.runtimeTranscription = text;
    });

    recognition.addEventListener('end', () => {
      if (this.runtimeTranscription !== '') {
        this.sentences.push(
          this.capitalizeFirstLetter(this.runtimeTranscription),
        );
        // this.sentences = this.capitalizeFirstLetter(this.runtimeTranscription);
        this.$emit(
          'update:text',
          `${this.text}${this.sentences.slice(-1)[0]}. `,
        );
      }
      this.runtimeTranscription = '';
      recognition.stop();
      console.log('toggle', this.toggle);
      if (this.toggle) {
        // keep it going.
        recognition.start();
      }
    });
  },
  data() {
    return {
      error: false,
      speaking: false,
      toggle: false,
      runtimeTranscription: '',
      sentences: [],
    };
  },
  methods: {
    checkCompatibility() {
      if (!recognition) {
        this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox';
      }
    },
    endSpeechRecognition() {
      recognition.stop();
      this.toggle = false;
      this.$emit('speechend', {
        sentences: this.sentences,
        // text: this.sentences.join('. '),
        text: this.sentences,
        peaking: this.speaking,
      });
    },
    startSpeechRecognition() {
      if (!recognition) {
        this.error = 'Speech Recognition is not available on this browser. Please use Chrome or Firefox';
        return;
      }
      this.toggle = true;
      recognition.lang = this.lang;
      recognition.interimResults = true;
      recognition.start();
      //   return true;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  mounted() {
    this.checkCompatibility();
  },
};
</script>
