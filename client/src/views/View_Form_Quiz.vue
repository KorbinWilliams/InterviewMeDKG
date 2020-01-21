<template>
  <div class="container quiz_form">
    <div class="row">
      <div class="col-12 status">
        <h2 class="text-center">Lets Create a Quiz!</h2>
        <form @submit.prevent="addQuestion">
          <label for="category">Category</label>
          <label for="description">Quiz Question</label>
          <input
            type="text"
            id="description"
            v-model="question.description"
            required
          />
          <label for="answer">Question Answer</label>
          <input type="text" id="answer" v-model="question.answer" />
          <button type="submit">Add Question</button>
        </form>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 status">
          <h2 class="text-center">Lets Create a Quiz!</h2>
          <form @submit.prevent="addQuestion">
            <!-- <label for="quiz_name">Quiz Name</label> -->
            <!-- <label for="category">Category</label>
          <input type="text" id="quiz_category" /> -->

            <label for="description">Quiz Question</label>
            <input
              type="text"
              id="description"
              v-model="question.description"
              required
            />
            <label for="answer">Question Answer</label>
            <input type="text" id="answer" v-model="question.answer" />
            <button type="submit">Add Question</button>
          </form>
        </div>
        <div class="col-12">
          <ul>
            <li>{{ question.description }}{{ question.answer }}</li>
          </ul>
        </div>
        <div class="row">
          <div class="col">
            <form>
              <label for="quizName">Quiz Name</label>
              <input type="text" id="quizName" v-model="quiz.name" />
              <button @click="submitQuiz">Submit Quiz</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Widget_User from "../components/Widget_User";

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
      this.quiz.questions.push(this.question);
      this.question = {
        description: "",
        answer: ""
      };
    },
    submitQuiz() {
      debugger;
      this.$store.dispatch("create", {
        data: this.quiz,
        address: "quizes"
      });
      console.log(this.quiz);
    }
  },
  components: {
    Widget_User
  }
};
</script>

<style scoped></style>
