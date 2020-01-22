<template>
  <div class="quizzes">
    <div class="row">
      <div class="col">
        <Widget_User />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3 class="text-center">Quizzes</h3>
      </div>
    </div>
    <div class="row row-cols-1 row-cols-md-3">
      <div class="card-deck">
        <div
          v-for="quiz in quizes"
          :key="quiz.id"
          :style="{ backgroundColor: randomColor() }"
          class="card"
        >
          <div class="card-body">
            <h5>{{ quiz.name }}</h5>
            <p v-for="category in quiz.categories">
              {{ category }}
            </p>

            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Widget_User from "../components/Widget_User";
export default {
  name: "Quizzes",
  props: [],
  data() {
    return {
      quizInfo: {
        name: "",
        categories: [],
        questions: []
      }
    };
  },
  methods: {
    randomColor() {
      const colorsList = [
        "grey",
        "deep-orange",
        "brown",
        "blue-grey",
        "orange",
        "green",
        "cyan",
        "teal",
        "blue",
        "indigo",
        "pink",
        "red",
        "purple"
      ];
      const rand = Math.floor(Math.random() * colorsList.length);
      return colorsList[rand];
    }
  },

  computed: {
    quizes() {
      return this.$store.state.quizes;
    }
  },
  mounted() {
    this.$store.dispatch("get", {
      address: "quizes",
      commit: "setItem",
      commitAddress: "quizes"
    });
  },
  components: {
    Widget_User
  }
};
</script>

<style>
.quizzes {
  background-color: aquamarine;
  min-height: 100vh;
}
</style>
