// import Axios from "axios"
import { api } from "./api"

let profileModule = {
  actions: {
    async createUserProfile({ commit, dispatch }, userData) {
      let res = await api.post("profiles", userData)
      commit("setOne", { address: "profile", data: res.data })
      dispatch("getProfileByAuthorId")
    },

    async getProfileByAuthorId({ commit, dispatch }, id) {
      let res = await api.get("users/" + id + "/profiles")
      commit("setOne", { address: "user", data: res.data })
    },

    async getProfileById({ commit, dispatch }, id) {
      let res = await api.get("profiles/" + id)
      commit("setOne", { address: "user", data: res.data })

    },

    // @click = setActiveProfile
    // retrieve userProfile on login


    async saveProfile({ commit, dispatch }, id, profileSettings) {
      let res = await api.put("profiles/" + id);
      commit("setItem", { address: "user", data: res.data });
    }
  }
};
export default profileModule;
