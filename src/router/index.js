import Vue from 'vue';

import Router from 'vue-router';
import Tasks from '../components/tasks/Tasks.vue';
import TaskStory from '../components/tasks/task/story/TaskStory.vue';
import TaskQuestionnaire from '../components/tasks/task/questionnaire/TaskQuestionnaire.vue';
import LoginAccount from '../components/account/LoginAccount.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/assessment/:assessmentId/tasks/',
      name: 'Tasks',
      component: Tasks,
      props: true,

    },
    {
      path: '/assessment/:assessmentId/task/:taskId/story',
      name: 'TaskStory',
      component: TaskStory,
      props: true,

    },
    {
      path: '/assessment/:assessmentId/task/:taskId/questionnaire',
      name: 'TaskQuestionnaire',
      component: TaskQuestionnaire,
      props: true,

    },
    {
      path: '/login',
      name: 'LoginAccount',
      component: LoginAccount,
      alias: '/',
      meta: {
        title: 'Login',
      },
    },

  ],
});

export default router;
