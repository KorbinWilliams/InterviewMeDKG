<template>
  <div class="container quiz_form">
    <div class="row">
      <div class="col-12 status">
        <h2 class="text-center">Lets Create a Quiz!</h2>
        <form @submit.prevent="submitQuestion">
          <label for="category">Category</label>
          <Dropdown />
          <label for="description">Quiz Question</label>
          <input
            type="text"
            id="description"
            v-model="question.description"
            required
          />
          <label for="answer">Question Answer</label>
          <input type="text" id="answer" v-model="question.answer" />
          <button type="submit">
            Submit Question
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
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
    submitQuestion() {
      debugger;
      this.quiz.questions.push(this.question);
      this.question = {
        description: "",
        answer: ""
      };
    }
  },
  components: {
    Dropdown
  }
};
</script>

<style scoped></style>
