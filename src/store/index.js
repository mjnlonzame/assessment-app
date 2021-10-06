import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    assessments: null,
    tasks: [],
    task: null,
  },

  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
  },
  getters: {

  },
  actions: {
    getTasks({
      commit,
    }, assessmentId) {
      axios
        .get(`api/task/${assessmentId}/load`)
        .then((response) => {
          console.log(response.data);
          commit('updateTasks', response.data);
        });
    },
  },
});
