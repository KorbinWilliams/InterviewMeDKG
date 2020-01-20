<template>
  <div class="container quiz_form">
    <div class="row">
      <div class="col-6 status">
        <p>Lets Create a Quiz!</p>
        <form>
          <label for="category">Category</label>
          <input type="text" id="category" v-model="quiz.category" />
          <label for="description">Quiz Question</label>
          <input type="text" id="description" v-model="question.description" required />
          <label for="answer">Quiz Answer</label>
          <input type="text" id="answer" v-model="question.answer" />
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button @submit="saveProfile">Save Profile Settings</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "View_Form_Quiz",
  data: {}
};
</script>

<style scoped></style>
