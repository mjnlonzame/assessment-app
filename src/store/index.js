import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
console.log(process.env.VUE_APP_API_URL);
const url = process.env.VUE_APP_API_URL;

export default new Vuex.Store({
  state: {
    student: null,
    assessment: null,
    tasks: [],
    task: null,
    assessmentResult: null,
    error: null,
    assessmentResults: [],
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
    updateAssessmentResult(state, assessmentResult) {
      state.assessmentResult = assessmentResult;
    },
    updateAssessmentResults(state, assessmentResults) {
      state.assessmentResults = assessmentResults;
    },
    updateError(state, error) {
      state.error = error;
    },
  },
  getters: {
    studentDetails(state) {
      return state.student;
    },
  },
  actions: {
    login({
      commit,
    }, loginDetails) {
      console.log('url', url);
      return axios.post(`${url}/user/login`, loginDetails).then((response) => {
        console.log(response.data);
        commit('updateCurrentStudent', response.data.student);
        return response.data;
      }).catch(console.error);
    },
    getStudentDetails({
      commit,
    }, studentId) {
      return axios.post(`${url}/student/${studentId}`).then((response) => {
        commit('updateCurrentStudent', response.data);
        return response.data;
      }).catch(console.error);
    },
    register({
      commit,
    }, student) {
      return axios.post(`${url}/student/register`, student).then((response) => response.data).catch((error) => {
        commit('updateError', error.response.data);
      });
    },
    getAssessment({
      commit,
    }, studentId) {
      return axios
        .get(`${url}/assessment/${studentId}/load`)
        .then((response) => {
          commit('updateAssessment', response.data);
          return response.data;
        });
    },
    getAssessmentResult({
      commit,
    }, studentId) {
      return axios
        .get(`${url}/assessment/${studentId}/result`)
        .then((response) => {
          commit('updateAssessmentResult', response.data);
          return response.data;
        });
    },
    getAssessmentResults({
      commit,
    }) {
      return axios
        .get(`${url}/assessment/results`)
        .then((response) => {
          commit('updateAssessmentResults', response.data);
          return response.data;
        });
    },
    getTasks({
      commit,
    }, assessmentId) {
      axios
        .get(`${url}/task/${assessmentId}/load`)
        .then((response) => {
          commit('updateTasks', response.data);
        });
    },
    getTask({
      commit,
    }, taskId) {
      return axios
        .get(`${url}/task/${taskId}`)
        .then((response) => {
          commit('updateTask', response.data);
        });
    },
    // eslint-disable-next-line no-empty-pattern
    getInitialTask({}, assessmentId) {
      return axios
        .get(`${url}/task/${assessmentId}/initial-task`)
        .then((response) => response.data);
    },
    // eslint-disable-next-line no-empty-pattern
    submitTaskPart1({
      commit,
    }, {
      taskId,
      readWords,
      time,
    }) {
      return axios
        .post(`${url}/task/${taskId}/submit/part1`, {
          readWords,
          time,
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
        .post(`${url}/task/${taskId}/submit/part2`, answers)
        .then((response) => {
          commit('updateTask', response.data);
          return response.data;
        });
    },
  },
});
