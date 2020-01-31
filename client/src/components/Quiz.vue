<template>
  <div class="quiz">
    <h1>{{quiz.name}}</h1>
    <div class="question" v-for="question in quiz.questions" :key="question._id">{{question}}</div>
    <div class="answer">
      <h3 v-for="answer in answers" :key="answer.id"></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  // data() {
  //   return {
  //     answers: []
  //   };
  // },
  methods: {
    nextQuestion() {},
    previousQuestion() {}
  },
  computed: {
    quiz() {
      this.$store.state.quiz;
    }
  },
  components: {}
};
</script>

<style></style>