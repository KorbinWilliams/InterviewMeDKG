import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";
import socketStore from "./socketStore";
import quizModule from "./quizModule";

Vue.use(Vuex);

let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    profile: {},
    pageData: {
      lobbies: Array,
      profileData: Object,
      chat: [],
      other: {}
    }
  },
  modules: {
    socketStore,
    quizModule
  },
  mutations: {
    /*
     * payload: {
     * data: -any data that is to be set in the state-
     * , address: '-string of the location to set the data: state[payload.address] = payload.data-'
     * }
     */
    // setUser (state, user) {
    // 	state.user = user
    // },
    resetState(state) {
      state = {
        user: {},
        profile: {},
        pageData: {
          lobbies: Array,
          profileData: Object,
          chat: [],
          currentLobby: Object,
          other: {}
        }
      };
    },
    // setUserProfile(state, data) {
    // 	state.userProfile = data
    // },
    // setActiveProfile(state, data) {
    // 	state.activeProfile = data
    // }

    //Set one for setting the reference of an endpoint.
    setItem(state, payload) {
      state[payload.address] = payload.data;
    },
    setPageData(state, payload) {
      if (payload.thirdAddress && payload.secondAddress) {
        state.pageData[payload.address][payload.secondAddress][
          payload.thirdAddress
        ] = payload.data;
      } else if (payload.secondAddress) {
        state.pageData[payload.address][payload.secondAddress] = payload.data;
      } else {
        state.pageData[payload.address] = payload.data;
      }
    }
  },
  actions: {
    /*
     * payload: {
     * data: -any data pertinent to the action-
     * , address: '-string of the location to make the api call-'
     * , id: -used in the api call-
     * , commit: '-the commit to call-'
     * , commitAddress: '-the place to commit to-'
     */
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "home" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "home" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion
    get({ commit }, payload) {
      api
        .get("" + payload.address)
        .then(res => {
          commit(payload.commit, {
            data: res.data,
            address: payload.commitAddress
          });
        })
        .catch(e => console.error(e));
    },
    getOne({ commit }, payload) {},
    create({ commit }, payload) {},
    edit({ commit }, payload) {},
    delete({ commit }, payload) {}
  }
});

// Object-forEach Polyfill - :)
if (!Object.prototype.forEach) {
  Object.defineProperty(Object.prototype, "forEach", {
    value: function(callback, thisArg) {
      if (this == null) {
        throw new TypeError("Not an object");
      }
      thisArg = thisArg || window;
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          callback.call(thisArg, this[key], key, this);
        }
      }
    }
  });
}

// Object-indexOf Polyfill - :)
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}
