<template>
  <div class="container categories">
    <div class="row">
      <div class="col">
        <h2 class="text-center">Quiz Categories</h2>
      </div>
    </div>

    <div class="card-deck">
      <categories
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "quiz_categories",
  props: [],
  data() {
    return {
      name: ""
    };
  }
};
</script>

<style scoped>
#categories {
  min-height: 100vh;
  background: rgb(159, 159, 248);
}
</style>
