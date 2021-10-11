import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    student: null,
    assessment: null,
    tasks: [],
    task: null,
  },

  mutations: {
    updateAssessment(state, assessment) {
      state.assessment = assessment;
    },
    updateCurrentStudent(state, student) {
      state.student = student;
    },
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
    updateTask(state, task) {
      state.task = task;
    },
  },
  getters: {

  },
  actions: {
    login({
      commit,
    }, loginDetails) {
      return axios.post('/api/student/login', loginDetails).then((response) => {
        commit('updateCurrentStudent', response.data);
        return response.data;
      }).catch(console.error);
    },
    getAssessment({
      commit,
    }, studentId) {
      return axios
        .get(`/api/assessment/${studentId}/load`)
        .then((response) => {
          commit('updateAssessment', response.data);
          return response.data;
        });
    },
    getTasks({
      commit,
    }, assessmentId) {
      axios
        .get(`/api/task/${assessmentId}/load`)
        .then((response) => {
          console.log(response.data);
          commit('updateTasks', response.data);
        });
    },
    getTask({
      commit,
    }, taskId) {
      return axios
        .get(`/api/task/${taskId}`)
        .then((response) => {
          console.log(response.data);
          commit('updateTask', response.data);
        });
    },
    // eslint-disable-next-line no-empty-pattern
    getInitialTask({}, assessmentId) {
      return axios
        .get(`/api/task/${assessmentId}/initial-task`)
        .then((response) => {
          console.log(response.data);
          return response.data;
        });
    },
    // eslint-disable-next-line no-empty-pattern
    submitTaskPart1({
      commit,
    }, {
      taskId,
      readWords,
    }) {
      return axios
        .post(`/api/task/${taskId}/submit/part1`, {
          readWords,
        })
        .then((response) => {
          commit('updateTask', response.data);
          return response.data;
        });
    },

    submitTaskPart2({
      commit,
    }, {
      taskId,
      answers,
    }) {
      return axios
        .post(`/api/task/${taskId}/submit/part2`, answers)
        .then((response) => {
          commit('updateTask', response.data);
          return response.data;
        });
    },
  },
});
