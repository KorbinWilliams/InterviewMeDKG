let profileModule = {
  actions: {
    async CreateUserProfile({ commit, dispatch }, userData) {
      let res = await _api.create("profiles", userData);
      commit("setUserProfile", res.data);
    },

    async getUserProfile({ commit, dispatch }, id) {
      let res = await _api.get("profiles/" + id);
      commit("setUserProfile", res.data);
    },

    async getProfileById({ commit, dispatch }, id) {
      let res = await _api.get("profiles/" + id);
      commit("setActiveProfile", res.data);
    },

    // @click = setActiveProfile
    // retrieve userProfile on login

    async saveProfile({ commit, dispatch }, id, profileSettings) {
      let res = await _api.put("profiles/" + id);
      commit("setUserProfile", res.data);
    }
  }
};
export default profileModule;
