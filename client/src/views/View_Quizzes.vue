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
    <div class="row" id="quizCards">
      <!-- <div class="card-deck"> -->
      <div
        v-for="quiz in quizes"
        @click="setActiveQuiz(quiz)"
        :key="quiz.id"
        :style="{ backgroundColor: randomColor() }"
        class="card col-3 m-3"
      >
        <div class="card-body">
          <h5>{{ quiz.name }}</h5>
          <p v-for="category in quiz.categories">{{ category }}</p>
        </div>
      </div>
    </div>
    <Quiz :quizData="activeQuiz" />
  </div>
</template>

<script>
import Widget_User from "../components/Widget_User";
import Quiz from "../components/Quiz";

export default {
  name: "Quizzes",
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
    },
    setActiveQuiz(quiz) {
      this.$store.dispatch("setActive", {
        commit: "setItem",
        data: quiz,
        commitAddress: "quiz"
      });
    }
  },

  computed: {
    quizes() {
      return this.$store.state.quizes;
    },
    activeQuiz() {
      return this.$store.state.quiz;
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
    Widget_User,
    Quiz
  }
};
</script>

<style scoped>
.quizzes {
  background: linear-gradient(-45deg, #6dbcdd, #67a4c1, #405f61, #172c31);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

#quizCards {
  justify-content: center;
}
.card {
  padding: 10px 10px 10px 10px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  transition: transform 0.2s;
}
.card:hover {
  -ms-transform: scale(1.1); /* IE 9 */
  -webkit-transform: scale(1.1); /* Safari 3-8 */
  transform: scale(1.1);
}
</style>
