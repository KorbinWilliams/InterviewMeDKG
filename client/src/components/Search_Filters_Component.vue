<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label for="movies">Movies</label>
        <md-select v-model="selectedMovies" name="movies" id="movies" multiple>
          <md-option value="fight-club">Fight Club</md-option>
        </md-select>
      </md-field>

      <div>
        <strong>Selected movies:</strong>
        {{ selectedMovies }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleSelect",
  data() {
    return {
      selectedMovies: []
    };
  },
  computed: {
    categories() {
      return this.$store.state.quizCategories;
    }
  },
  methods: {
    getQuizCategories() {
      let quizazz = this.$store.state.quizzes.categories;
      let quizCategories = this.$store.state.quizCategories;
      for (let i = 0; i < quizazz.length; i++) {
        let quizCat = array[i];
        if (quizCategories.find(category => category == quizCat)) {
          quizCategories.push(quizCat);
        }
      }
      // loop over quizzes if quizCategories !contain category add category to quizCategories
    }
  }
};
</script>

<style lang="scss" scoped>
.md-field {
  max-width: 300px;
}
</style>