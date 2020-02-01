<template>
  <div class="quiz container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <h1>{{quizData.name}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="question col-3" v-for="(question, index) in quizData.questions" :key="index">
        <h5 @click="showAnswer(index)">{{question.description}}</h5>
        <p v-show="question.show == true">{{question.answer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  props: ["quizData"],
  methods: {
    showAnswer(index) {
      if (this.quizData.questions[index].show == true) {
        this.quizData.questions[index].show = false;
      } else {
        this.quizData.questions[index].show = true;
      }

      this.$store.dispatch("setActive", {
        commit: "setItem",
        data: this.quizData,
        commitAddress: "quiz"
      });
    },
    nextQuestion() {},
    previousQuestion() {}
  },
  components: {}
};
</script>

<style>
</style>