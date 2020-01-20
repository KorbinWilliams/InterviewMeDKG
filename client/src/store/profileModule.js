// import Axios from "axios"
import { api } from "./api"

let profileModule = {
  actions: {
    async createUserProfile({ commit, dispatch }, userData) {
      let res = await api.post("profiles", userData)
      commit("setUserProfile", res.data)
      dispatch("getProfileByAuthorId")
    },

    async getProfileByAuthorId({ commit, dispatch }, id) {
      let res = await api.get("users/" + id + "/profiles")
      commit("setUserProfile", res.data)
    },

    async getProfileById({ commit, dispatch }, id) {
      let res = await api.get("profiles/" + id)
      commit("setActiveProfile", res.data)
    },

    // @click = setActiveProfile 
    // retrieve userProfile on login 


    async saveProfile({ commit, dispatch }, id, profileSettings) {
      let res = await api.put("profiles/" + id)
      commit("setUserProfile", res.data)
    }
  }

  // make new property on use Schema for userId

}
export default profileModule
