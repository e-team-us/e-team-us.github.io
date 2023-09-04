/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'

export function registerPlugins (app) {
  loadFonts()
  app.use(vuetify)
}


// routing
import { createRouter, createWebHistory } from 'vue-router';

import login from '@/components/Login.vue';
import status from '@/components/Status.vue';
import forms  from '@/components/Forms.vue';
import childminderview  from '@/components/ChildminderView.vue';

const routes = [
  {
    name: "login",
    path: "/",
    component: login,
  },
  {
    name: "status",
    path: "/status",
    component: status,
  },
  {
    name: "forms",
    path: "/forms",
    component: forms,
  },
  {
    name: "childminderview",
    path: "/childminderview",
    component: childminderview,
  }
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;