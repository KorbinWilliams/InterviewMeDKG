<template>
  <div class="quiz">
    <h1>
      <!-- quiz title -->
    </h1>
    <div class="question" v-for="question in questions" :key="question._id">
      <!-- v-for on questions v-show or v-if next on completion or pressing next question
      show answer for previous question on completion-->
      <!-- v-if quiz.multiple = true show different component for question or switch between form input and button input -->
    </div>
    <div class="answer">
      <h3 v-for="answer in answers" :key="answer.id"></h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Quiz",
  data() {
    answer: "";
  },
  mounted() {
    this.$store.dispatch("getActiveQuiz");
  },
  methods: {},
  computed: {
    questions() {
      this.$store.state.activeQuiz.questions;
    }
  },
  components: {}
};
</script>

<style>
</style>