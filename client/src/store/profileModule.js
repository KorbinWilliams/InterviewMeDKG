let profileModule = {
  actions: {
    async CreateUserProfile({ commit, dispatch }, userData) {
      let res = await api.create("profiles", userData);
      commit("setOne", {address: 'profile', data: res.data});
    },

    async getUserProfile({ commit, dispatch }, id) {
      let res = await api.get("profiles/" + id);
      commit("setOne", {address: 'user', data: res.data});
    },

    async getProfileById({ commit, dispatch }, id) {
      let res = await api.get("profiles/" + id);
      commit("setOne", {address: 'user', data: res.data});
    },

    // @click = setActiveProfile
    // retrieve userProfile on login

    async saveProfile({ commit, dispatch }, id, profileSettings) {
      let res = await api.put("profiles/" + id);
      commit('setItem', {address: 'user', data: res.data}, );
    }
  }

}
export default profileModule;
