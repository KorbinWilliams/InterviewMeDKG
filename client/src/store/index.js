import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from '../router/index';
import AuthService from '../AuthService';
import profileModule from "./profileModule"

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
		userProfile: {},
		activeProfile: {},
		categories: [],
		activeQuiz: {}
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
		resetState(state) {
			state = {
				user: {},
				userProfile: {},
				activeProfile: {},
				categories: [],
				activeQuiz: {}
			}
		},
		setUserProfile(state, data) {
			state.userProfile = data
		},
		setActiveProfile(state, data) {
			state.activeProfile = data
		}
	},
	actions: {
		//#region -- AUTH STUFF --
		async register({ commit, dispatch }, creds) {
			try {
				let user = await AuthService.Register(creds);
				commit('setUser', user);
				router.push({ name: "home" })
			} catch (e) {
				console.warn(e.message)
			}
		},
		async login({ commit, dispatch }, creds) {
			try {
				let user = await AuthService.Login(creds);
				commit('setUser', user);
				router.push({ name: "home" })
			} catch (e) {
				console.warn(e.message)
			}
		},
		async logout({ commit, dispatch }) {
			try {
				let success = await AuthService.Logout();
				if (!success) {
				}
				commit('resetState');
				router.push({ name: "login" });
			} catch (e) {
				console.warn(e.message)
			}
		},
		//#endregion

	},
	modules: {
		profileModule
	}
})
