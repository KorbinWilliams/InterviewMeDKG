<template>
  <div class="quiz container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center">
        <h1>{{quizData.name}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="question col-3" v-for="question in quizData.questions" :key="question._id">
        <h5 @click="showAnswer">{{question.description}}</h5>
        <p v-show="sAnswer == true">{{question.answer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  props: ["quizData"],
  data() {
    return {
      sAnswer: false
    };
  },
  methods: {
    showAnswer() {
      if (this.sAnswer == true) {
        this.sAnswer = false;
      } else this.sAnswer = true;
    },
    nextQuestion() {},
    previousQuestion() {}
  },
  components: {}
};
</script>

<style>
</style>