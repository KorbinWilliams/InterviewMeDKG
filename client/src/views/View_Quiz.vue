<template>
  <div class="quiz">
    <h1>
      <!-- quiz title -->
    </h1>
    <div class="question" v-for="question in questions" :key="question._id">
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
    return {
      answers: []
    };
  },
  mounted() {
    this.$store.dispatch("getOne", {
      address: "quizes",
      commit: "setItem",
      commitAdress: "quiz",
      data: {
        _id: this
      }
    });
  },
  methods: {},
  computed: {
    questions() {
      this.$store.state.quiz.questions;
    }
  },
  components: {}
};
</script>

<style></style>
