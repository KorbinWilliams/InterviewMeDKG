import Vue from "vue";
import Router from "vue-router";
import View_Home from "../views/View_Home";
import View_Login from "../views/View_Login";
import View_Create_Account from "../views/View_Create_Account";
import Profile from "../views/Profile"
import View_Quiz_Categories from "../views/View_Quiz_Categories";
import View_TextChat_Categories from "../views/View_TextChat_Categories";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: View_Home
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: View_Create_Account
    },
    {
      path: "/login",
      name: "login",
      component: View_Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: "/quiz_categories",
      name: "quiz_categories",
      component: View_Quiz_Categories
    },
    {
      path: "/text_categories",
      name: "text_categories",
      component: View_TextChat_Categories
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
