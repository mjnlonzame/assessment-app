import Vue from 'vue';

import Router from 'vue-router';
import Tasks from '../components/tasks/Tasks.vue';
import TaskStory from '../components/tasks/task/story/TaskStory.vue';
import TaskQuestionnaire from '../components/tasks/task/questionnaire/TaskQuestionnaire.vue';
import LoginAccount from '../components/account/LoginAccount.vue';
import CreateAccount from '../components/account/CreateAccount.vue';
import AssessmentResult from '../components/assessment/AssessmentResult.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'CreateAccount',
      component: CreateAccount,
      alias: '/home',
      meta: {
        breadCrumb: [{
          text: 'Home',
          active: true,
        }],
      },
    },
    {
      path: '/login',
      name: 'LoginAccount',
      component: LoginAccount,
      meta: {
        breadCrumb: [{
          text: 'Home',
          to: {
            name: 'CreateAccount',
          },
        }, {
          text: 'Login',
          active: true,
        }],
      },

    },
    {
      path: '/assessment/:assessmentId/tasks/',
      name: 'Tasks',
      component: Tasks,
      props: true,
      meta: {
        breadCrumb: [{
          text: 'Home',
          to: {
            name: 'CreateAccount',
          },
        }, {
          text: 'Tasks',
          active: true,
        }],
      },

    },
    {
      path: '/assessment/:assessmentId/task/:taskId/story',
      name: 'TaskStory',
      component: TaskStory,
      props: true,
      meta: {
        breadCrumb: [{
            text: 'Home',
            to: {
              name: 'CreateAccount',
            },
          }, {
            text: 'Tasks',
            to: {
              name: 'Tasks',
              params: null,
            },
          },
          {
            text: 'Task',
            active: true,
          },
        ],
      },
      beforeEnter: (to, from, next) => {
        to.meta.breadCrumb[1].disabled = !router.app.$session.get('initTaskFinished');
        to.meta.breadCrumb[1].to.params = to.params;
        next();
      },

    },
    {
      path: '/assessment/:assessmentId/task/:taskId/questionnaire',
      name: 'TaskQuestionnaire',
      component: TaskQuestionnaire,
      props: true,
      meta: {
        breadCrumb: [{
            text: 'Home',
            to: {
              name: 'CreateAccount',
            },
          }, {
            text: 'Tasks',
            to: {
              name: 'Tasks',
              params: null,
            },
          },
          {
            text: 'Task',
            active: true,
          },
        ],
      },
      beforeEnter: (to, from, next) => {
        to.meta.breadCrumb[1].disabled = !router.app.$session.get('initTaskFinished');
        // to.meta.breadCrumb[1].active = router.app.$session.get('initTaskFinished');
        to.meta.breadCrumb[1].to.params = to.params;
        next();
      },

    },
    {
      path: '/assessment/:assessmentId/result',
      name: 'AssessmentResult',
      component: AssessmentResult,
      props: true,
      meta: {
        breadCrumb: [{
            text: 'Home',
            to: {
              name: 'CreateAccount',
            },
          }, {
            text: 'Assessment Result',
            active: true,
          },

        ],
      },
    },

  ],
});

router.beforeEach((to, from, next) => {
  const reqSession = to.matched.some((route) => route.meta.requiresSession);
  if (!reqSession) next();
  console.log(to);
  if (router.app.$session.exists() || to.name === 'LoginAccount') {
    next();
  } else {
    next({
      name: 'CreateAccount',
    });
  }
});

export default router;
