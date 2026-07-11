import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import { company } from "../package.json";
import App from './App.vue'
import HomePage from './components/HomePage.vue'

const routes = [
  {
    path: '/', component: HomePage, name: 'Home',
    meta: {
      title: company.name,
      metaTags: [
        {
          property: 'og:description',
          content: 'a studio focused on casual and logic puzzle games'
        }
      ]
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  next();
});

createApp(App).use(router).mount('#app')
