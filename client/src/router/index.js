import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import View_Home from "../views/View_Home";
// @ts-ignore
import View_Login from "../views/View_Login";
// @ts-ignore
import View_Create_Account from "../views/View_Create_Account";
// @ts-ignore
import View_Profile from "../views/View_Profile";
// @ts-ignore
import View_Quiz_Categories from "../views/View_Quiz_Categories";
// @ts-ignore
import View_Text_Chat_Categories from "../views/View_Text_Chat_Categories";
// @ts-ignore
import View_Form_Quiz from "../views/View_Form_Quiz";
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
      path: "/profile",
      name: "profile",
      component: View_Profile
    },
    {
      path: "/quiz_categories",
      name: "quiz_categories",
      component: View_Quiz_Categories
    },
    {
      path: "/quiz_form",
      name: "quiz_form",
      component: View_Form_Quiz
    },
    {
      path: "/text_categories",
      name: "text_categories",
      component: View_Text_Chat_Categories
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
