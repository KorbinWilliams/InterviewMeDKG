import { api } from "./api";

let quizModule = {
  actions: {
    async createQuiz({ commit, dispatch }, quizData) {
      debugger;
      let res = await api.post("quizes", quizData);
      commit("setItem", res.data);
      dispatch("get", { address: "quiz", data: res.data });
    },
    async getQuizByID({ commit, dispatch }, id) {
      let res = await api.get("quizes/" + id);
      commit("setOne", { address: "quiz", data: res.data });
    },
    async deleteQuiz({ commit, dispatch }, id) {
      let res = await api.delete("quizes/" + id);
      dispatch("get", { address: "quiz", data: res.data });
    },
    async editQuiz({ commit, dispatch }, id, quizData) {
      let res = await api.put("quizes/", +id);
      commit9("setItem", { address: "quiz", data: res.data });
    }
  }
};

export default quizModule;
