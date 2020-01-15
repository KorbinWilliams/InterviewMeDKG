import Vue from 'vue'
import Router from 'vue-router'
import View_Home from "../views/View_Home";
import View_Login from "../views/View_Login";
import View_Create_Account from "../views/View_Create_Account";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: View_Home
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: View_Create_Account
    },
    {
      path: '/login',
      name: 'login',
      component: View_Login
    },
    {
      path: "*",
      redirect: '/'
    }
  ]
})