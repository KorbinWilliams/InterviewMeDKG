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
let api2 = Axios.create({
	baseURL: base,
	timeout: 3000,
	withCredentials: true
})


export default new Vuex.Store({
	state: {
		user: {},
		profile: {},
		lobby: {},
		quiz: {},
		question: [],
		pageData: {
			lobbies: Array,
			profileData: Array,
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
				quiz: {},
				lobby: {},
				quizzes: [],
				quizCategories: [],
				pageData: {
					lobbies: Array,
					profileData: Array,
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
		},
		removeItem(state, payload) {
			state[payload.address].filter(item => item._id = payload.data._id)
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
		async register({ commit, dispatch }, payload) {
			try {
				let res = await AuthService.Register(payload);
				commit("setItem", {
					address: "user",
					data: res
				});
				router.push({ name: "home" });
			} catch (e) {
				console.warn(e.message);
			}
		},
		async login({ commit, dispatch }, payload) {
			try {
				let res = await AuthService.Login(payload);
				commit("setItem", {
					address: "user",
					data: res
				});
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
			} catch (e) {
				console.warn(e.message);
			}
			router.push({ name: "login" });
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
		getOne({ commit }, payload) {
			api
				.get("" + payload.address + "/" + payload.data._id)
				.then(res => {
					commit(payload.commit, {
						data: res.data,
						address: payload.commitAddress
					});
				})
				.catch(e => console.error(e));
		},
		getOneByAnother({ commit }, payload) {
			api2
				.get(
					"" +
					payload.address1 +
					"/" +
					payload.data._id +
					"/" +
					payload.address2
				)
				.then(res => {
					commit(payload.commit, {
						data: res.data,
						address: payload.commitAddress
					});
				});
			// for using ref's. address 1 is where the id/ref comes from, address 2 is what youre looking for, commitAddress is where it's going in the state.
		},
		create({ commit }, payload) {
			api
				.post("" + payload.address, payload.data)
				.then(res => {
					commit(payload.commit, {
						data: res.data,
						address: payload.commitAddress
					});
				})
				.catch(e => console.error(e));
		},
		edit({ commit }, payload) {
			api
				.put(
					"" + payload.address + "/" + payload._id,
					payload.data
				)
				.then(res => {
					commit(payload.commit, {
						data: res.data,
						address: payload.commitAddress
					});
				})
				.catch(e => console.error(e));
		},
		delete({ commit }, payload) {
			api.delete("" + payload.address + "/" + payload.data._id).then(res => {
				commit(payload.commit, {
					data: res.data,
					address: payload.commitAddress
				});
			});
		}
	}
});

// Object-forEach Polyfill - :)
if (!Object.prototype.forEach) {
	Object.defineProperty(Object.prototype, "forEach", {
		value: function (callback, thisArg) {
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
