<template>
  <div class="container-fluid quiz_form">
    <div class="row">
      <div class="col-12">
        <Widget_User />
      </div>
    </div>
    <div class="container-fluid center">
      <div class="row">
        <div class="col-12 status center">
          <h2 class="text-center m-3">Lets Create a Quiz!</h2>
        </div>
      </div>
      <div class="formData">
        <form @submit.prevent="">
          <div class="">
            <input
              type="text"
              id="quizName"
              v-model="quiz.name"
              placeholder="Quiz Name..."
            />
            <input
              type="text"
              id="quizCategory"
              v-model="quiz.categories"
              placeholder="Quiz Category..."
            />
          </div>
          <table class="table">
            <thead>
              <tr>
                <td><strong>Question</strong></td>
                <td><strong>Answer</strong></td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in rows">
                <td>
                  <input type="text" v-model="row.description" />
                </td>
                <td><input type="text" v-model="row.answer" /></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button class="button btn-primary" @click="addRow">
            Add row</button
          ><button
            class="button btn-primary"
            @click="addQuestion(), submitQuiz()"
          >
            Submit Quiz
          </button>
          <!-- <label for="quiz_name">Quiz Name</label> -->
          <!-- <label for="category">Category</label>
          <input type="text" id="quiz_category" /> -->
        </form>
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
      questions: 0,
      quiz: {
        name: "",
        categories: [],
        questions: []
      },
      question: {
        description: "",
        answer: ""
      },
      rows: []
    };
  },
  methods: {
    addRow() {
      var elem = document.createElement("tr");
      this.rows.push({
        description: "",
        answer: ""
      });
    },
    addQuestion() {
      // debugger;
      this.rows.forEach(item => {
        this.quiz.questions.push(item);
        console.log(this.quiz.questions);
      });

      // this.question = {
      //   description: "",
      //   answer: ""
    },
    submitQuiz() {
      // debugger;
      this.$store.dispatch("create", {
        data: this.quiz,
        address: "quizes",
        commit: "setItem",
        commitAddress: "quizes"
      });
      this.rows = "";
      this.quiz = "";
    }
  },
  components: {
    Widget_User
  }
};
</script>

<style scoped>
.formData {
  text-align-last: center;
  text-align: center;
}
.quiz_form {
  background-color: rgb(181, 196, 223);
  min-height: 100vh;
}
</style>
