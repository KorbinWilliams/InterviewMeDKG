<template>
  <div class="container quiz_form">
    <div class="row">
      <div class="col-12 status">
        <h2 class="text-center">Lets Create a Quiz!</h2>
        <form @submit.prevent="addQuestion">
          <label for="category">Category</label>
          <Dropdown />
          <label for="description">Quiz Question</label>
          <input type="text" id="description" v-model="question.description" required />
          <label for="answer">Question Answer</label>
          <input type="text" id="answer" v-model="question.answer" />
          <button type="submit">Add Question</button>
        </form>
      </div>
      <div class="row">
        <div class="col">
          <button @click="submitQuiz">Submit Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "@/components/Category_Dropdown";

export default {
  name: "View_Form_Quiz",
  data() {
    return {
      quiz: {
        name: "",
        categories: [],
        questions: []
      },
      question: {
        description: "",
        answer: ""
      }
    };
  },
  methods: {
    addQuestion() {
      // debugger;
      this.quiz.questions.push(this.question);
      this.question = {
        description: "",
        answer: ""
      };
    },
    submitQuiz() {
      // debugger;
      this.$store.dispatch("createQuiz", this.quiz.questions);
      // console.log(this.quiz);
    }
  },
  components: {
    Dropdown
  }
};
</script>

<style scoped></style>
