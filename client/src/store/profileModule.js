// import Axios from "axios"
import { api } from "./api"

let profileModule = {
  actions: {
    async createUserProfile({ commit, dispatch }, userData) {
      let res = await api.post("profiles", userData)
      commit("setItem", { address: "profile", data: res.data })
      dispatch("getProfileByUserId", this.$store.state.user._id)
    },

    async getProfileByUserId({ commit, dispatch }, id) {
      let res = await api.get("users/" + id + "/profiles")
      commit("setItem", { address: "user", data: res.data })
    },

    async getProfileById({ commit, dispatch }, id) {
      let res = await api.get("profiles/" + id)
      commit("setItem", { address: "user", data: res.data })
    },

    async saveProfile({ commit, dispatch }, id, profileSettings) {
      let res = await api.put("profiles/" + id);
      commit("setItem", { address: "user", data: res.data });
    }
  }
};
export default profileModule;
