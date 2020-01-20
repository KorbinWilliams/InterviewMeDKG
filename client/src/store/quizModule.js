let quizModule = {
  actions: {
    async createQuiz({ commit, dispatch }, data) {
      let res = await _api.post("quizes/", data);
      dispatch("getQuizes", res.data);
    },
    async getQuizByID({ commit, dispatch }, id) {
      let res = await _api.get("quizes/" + id);
      commit("setActiveQuiz", res.data);
    },
    async deleteQuiz({ commit, dispatch }, id) {
      let res = await _api.delete("quizes/" + id);
      dispatch("getQuizes");
    },
    async editQuiz({ commit, dispatch }, id) {
      let res = await _api.put("quizes/", id);
      dispatch("getQuizes");
    }
  }
};

export default quizModule;
