import Vue from 'vue';

import {
  BootstrapVue,
  IconsPlugin,
} from 'bootstrap-vue';
import VueSession from 'vue-session';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import store from './store/index';

Vue.config.productionTip = false;

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(Vuelidate);

Vue.use(VueSession, {
  persist: false,
});

new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
