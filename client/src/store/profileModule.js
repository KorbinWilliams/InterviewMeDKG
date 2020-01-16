let profileModule = {
  actions: {
    async getUserProfile({ commit, dispatch }, id) {
      let res = await _api.get("profiles/" + id)
      commit("")
    },

    async saveProfile({ commit, dispatch }, id, profileSettings) {
      let res = await _api.put("profiles/" + id)
      commit("userProfile", res.data)
    }
  }
}
