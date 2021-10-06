<template>
  <div class="container">Hello World</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Tasks',
  created() {
    const DEFAULT_ASSESSMENT_ID = 1;
    console.log('hello');
    this.getTasks(DEFAULT_ASSESSMENT_ID);
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tasks: (state) => state.tasks,
    }),
  },
  methods: {
    ...mapActions(['getTasks']),
  },
};
</script>

<style  scoped>
.container {
  background: skyblue;
}
</style>
