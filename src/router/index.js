import Vue from 'vue';

import Router from 'vue-router';
import Tasks from '../components/tasks/Tasks.vue';
import TaskStory from '../components/tasks/task/story/TaskStory.vue';
import TaskQuestionnaire from '../components/tasks/task/questionnaire/TaskQuestionnaire.vue';
import LoginAccount from '../components/account/LoginAccount.vue';
import HomePage from '../components/account/HomePage.vue';
import AssessmentResult from '../components/assessment/AssessmentResult.vue';
import AssessmentReport from '../components/assessment/AssessmentReport.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HomePage',
      component: HomePage,
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
            name: 'HomePage',
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
            name: 'HomePage',
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
              name: 'HomePage',
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
        // to.meta.breadCrumb[1].disabled = !router.app.$session.get('initTaskFinished');
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
              name: 'HomePage',
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
        // to.meta.breadCrumb[1].disabled = !router.app.$session.get('initTaskFinished');
        to.meta.breadCrumb[1].to.params = to.params;
        next();
      },

    },
    {
      path: '/assessment/:studentId/result',
      name: 'AssessmentResult',
      component: AssessmentResult,
      props: true,
      meta: {
        breadCrumb: [{
            text: 'Home',
            to: {
              name: 'HomePage',
            },
          }, {
            text: 'Assessment Result',
            active: true,
          },

        ],
      },
    },
    {
      path: '/assessment/report',
      name: 'AssessmentReport',
      alias: '/report',
      component: AssessmentReport,
      meta: {
        breadCrumb: [{
            text: 'Assessment Report',
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
  if (router.app.$session.exists() || to.name === 'LoginAccount') {
    next();
  } else {
    next({
      name: 'HomePage',
    });
  }
});

export default router;
