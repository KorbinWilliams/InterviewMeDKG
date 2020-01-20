import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import AuthService from "./AuthService";
import Notifications from "vue-notification";
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

//Vue.config.productionTip = false


async function init() {
  let user = await AuthService.Authenticate();
  if (user) { store.commit("setItem", {address: 'user', data: user}) }
  else { router.push({ name: 'login' }) }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
Vue.use(VueMaterial);
Vue.use(Notifications);
init();
store.dispatch('initializeSocket');