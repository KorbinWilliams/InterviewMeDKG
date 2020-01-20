let quizModule = {
  actions: {
    async createQuiz({ commit, dispatch }, quizData) {
      debugger;
      let res = await api.post("quizs", quizData);
      dispatch("get", { address: "quiz", data: res.data });
    },
    async getQuizByID({ commit, dispatch }, id) {
      let res = await api.get("quizs/" + id);
      commit("setOne", { address: "quiz", data: res.data });
    },
    async deleteQuiz({ commit, dispatch }, id) {
      let res = await api.delete("quizs/" + id);
      dispatch("get", { address: "quiz", data: res.data });
    },
    async editQuiz({ commit, dispatch }, id, quizData) {
      let res = await api.put("quizs/", +id);
      commit9("setItem", { address: "quiz", data: res.data });
    }
  }
};

export default quizModule;
