<script>
export default {
  data() {
    return {
      isFormValid: false,
    };
  },
  computed: {},
  methods: {
    onSubmitClick() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.isFormValid = true;
      }
    },
    handleClosedMOdal() {
      this.isFormValid = false;
    },
    handleClickedOk() {
      this.$emit('questionAnswersSubmitted', this.answers);
    },
  },
};
</script>
