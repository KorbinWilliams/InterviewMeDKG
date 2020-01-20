import Vue from "vue";
import Router from "vue-router";
import View_Home from "../views/View_Home";
import View_Login from "../views/View_Login";
import View_Create_Account from "../views/View_Create_Account";
import View_Profile from "../views/View_Profile";
import View_Text_Lobby from "../views/View_Text_Lobby";
import View_Text_Lobbies from "../views/View_Text_Lobbies";
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
      path: "/text_categories",
      name: "View_Text_Lobbies",
      component: View_Text_Lobbies
    },
    {
      path: "/text_lobby",
      name: "View_Text_Lobby",
      component: View_Text_Lobby
    },
    {
      path: "/quiz_form",
      name: "quiz_form",
      component: View_Form_Quiz
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
